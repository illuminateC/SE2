
<template>
    <div style="width:100%;">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      <el-button style="margin-top:10px" type="primary" @click="this.submitComment()">提交评论</el-button>
      <el-divider v-if="commentList!=null&&commentList.length<1" content-position="left">暂无评论</el-divider>
      <el-divider v-else content-position="left">评论列表</el-divider>
      <div v-if="commentList.length > 0">
        <CommentCard v-for="(comment, index) in commentList" :key="index" :comment="comment" :index="index"></CommentCard>
      </div>
      <!-- <CommentCard></CommentCard> -->
    </div>
  </template>
  
  <script>
  import { Article } from '@/api/article';
  import clipboard from 'clipboard';
  import * as echarts from 'echarts';
  import { ElMessage } from 'element-plus'
  import axios from "axios";
  import CommentCard from '@/components/comment/CommentCard';
  
  import moment from 'moment';
  const testurl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/list_all_comments"
  const commenturl = "https://go-service-296709.df.r.appspot.com/api/v1/branch/comment/create"
  export default {
    name: "CommentCards",
    props: {
      id: String,
      paper: Object,
    },
    components: {
      CommentCard
    },
    data() {
      return{
        commentList: [],
        textarea: "",
      }
    },
    mounted () {
      this.getCommentList()
      
    },
    methods: {
      getCommentList() {
        this.$Cookies.set('token', "8z2tki!hqm(fqk_(1)kle2i+j92!8wslzbs%h3(-xavat5b%_v");
        this.commentList = [];
        // let that = this;
        var data = {
          "work_id": "W2741809807",
        }
        Article.articleComment(data)
        .then((res) => {
          if (res.data) {
            this.commentList=res.data.all_comments;
            console.log(this.commentList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      },
      submitComment() {
        var data = {
          "work_id": "W2741809807",
          "content":this.textarea,
        }
        Article.createComment(data)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        this.getCommentList();
      },
    },
  
  }
  
  </script>
  
  <style scoped>
  
  </style>
  