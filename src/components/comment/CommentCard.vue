<template>
  <div class = "comment_card">
    <el-card shadow="hover">
      <template v-slot:header>
          <div  class="comment_header_area">
              <div class="comment_head">
              <div class="comment_avatar"><i class="el-icon-success" v-if=this.comment.on_top>置顶 </i>
                  <i class="el-icon-user"/></div>
                  <div class="comment_username" v-if="judgeSettle">  {{ this.comment.author_name }} </div>
                  <div class="comment_username" v-else>  {{ this.comment.user_name }}</div>
                  <br/>
              <div class="comment_create_time">{{ this.comment.created_time.split('T')[0] }}</div></div>
              <!-- <div class="comment_create_time">{{ this.comment.created_time }}</div></div> -->
              <div class="comment_actions">
              <el-button-group>
                  <el-button  :type="getLikeType()" @click="likeComment()"><el-icon style="margin-right: 10px;" ><Top /></el-icon>赞同 {{this.getLikeCount()}}</el-button>
                  <!-- <el-button  :type="getDislikeType()" @click="dislikeOrLikeComment(2)"><el-icon style="margin-right: 10px;"><Bottom /></el-icon>踩 {{this.getDislikeCount()}}</el-button>
                  <el-button  @click="operateComment(1)" v-if="this.commentOperate">置顶</el-button> -->
                  <el-button  @click="deleteComment()" v-if="this.canDelete===true">删除</el-button>
              </el-button-group>
              
          </div></div>
      </template>
      <div class="card_info">
        <span>
          {{ this.comment.content }}
        </span>
      </div>
    </el-card>
  </div>
</template>
  <script>
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  import { Article } from '@/api/article';
  const testurl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/give_a_like_or_dislike"
  const opeurl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/operate"
  export default {
    name: "Drawer",
    props: {
      comment: Object,
    },
    data() {
      return{
        isAdmin:false,
        user_id:-1,
        canDelete:false,
        short_abstract: "",
        commentOperate:false,
        vote:0,
        is_like:0,
      }
    },
    created() {
      const user_info=this.$Cookies.get('user_info');
      if(user_info!=null){
        const info=JSON.parse(user_info);
        this.isAdmin=info.isAdmin;
        this.user_id=info.id;
        // console.log(this.user_id);
        if(this.isAdmin||this.user_id==this.comment.user_id){
          this.canDelete=true;
        }
        console.log(this.canDelete);
      }
      this.vote=this.comment.is_like;
      this.is_like=this.comment.is_like;
      console.log(this.comment);
      let list = JSON.parse(localStorage.getItem("paper_info"));
      if(list === null) return
      for(let i = 0; list&&i < list.length; i++) {
        let tmpt = JSON.parse(list[i]);
        if(tmpt.id == this.comment.paper_id)
          this.commentOperate = true;
      }
      this.judgeSettle = this.comment.author_name.length > 0;
    },
    methods: {
      likeComment(){
        var data = {
          "comment_id": this.comment.id,
        }
        if(this.is_like==0){
          Article.likeComment(data)
          .then((res) => {
            if (this.user_id!=-1) {
              console.log(res.data);
              this.is_like=1;
            }else{
              ElMessage.warning("未登录用户不能点赞哦");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }else if(this.is_like==1){
          Article.dislikeComment(data)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              this.is_like=0;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
        
        
      },
      deleteComment() {
        var data = {
          "comment_id": this.comment.id,
        }
        Article.deleteComment(data)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        setTimeout(() => {
          this.$parent.getCommentList();
        }, 100);
        ElMessage.success("删除成功！");
       
      },
      getLikeCount(){
        if(this.vote==1){
          if(this.is_like==0){
            return this.comment.like_count-1;
          }else{
            return this.comment.like_count;
          }
        }if(this.vote==0){
          if(this.is_like==0){
            return this.comment.like_count;
          }else{
            return this.comment.like_count+1;
          }
        }
        return this.comment.like_count;
      },
     
      getLikeType(){
        if(this.is_like==1)return "success";
        else return "plain";
      },
      
      handleClick2(method) {
        console.log(method);
      },
      
      operateComment(method) {
        let that = this;
        let formData = new FormData();
        formData.append("comment_id", this.comment.comment_id);
        //formData.append("user_id", localStorage.getItem("userid"));
        formData.append("method", method);
        let config= { headers: { "Content-Type": "multipart/form-data", }, };
        axios.post(opeurl, formData, config).then((response) => {
          if (response) {
            if (response.data.success) {
              this.$parent.getCommentList();
            } else {
              console.log(response)
            }
          }
        });
      },
    },
    
   
  };
  </script>
  
  <style scoped>
  .comment_card{
    margin-bottom: 10px;
  }
  .comment_header_area{
    display: flex; justify-content: "space-between"
  }
  .comment_avatar{
    display: inline;
  }
  .comment_username{
    display:inline;
    font-weight: bold;
  }
  .comment_create_time{
    display: inline-block;
    font-size: small;
  }
  .comment_head{
    /* float: left; */
    display: inline-block;
  }
  .comment_actions{
    display: inline-block;
    position: relative;
    right:0;
    margin-left:auto; margin-right:0;
    vertical-align: middle;
  
  }
  
  </style>
  