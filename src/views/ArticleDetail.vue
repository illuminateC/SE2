<template>
  <div id="result_detail_page" >
    <div class="result_detail_page_container">
      <div class="result_detail_title_area">
        <div class="result_detail_title">
          {{ this.article.title }}
        </div>
      </div>
      <div class="result_detail_main_area">
        <div class="result_detail_article_area">
          <div>
            <h3 class="detail_abstract">作者</h3>
            <!-- <p>{{ this.authors }}</p> <br/> -->
            <span v-for="(author, index) in this.authors" :key="index" @click="this.$router.push('/author/'+ author.id.match(/\/([^/]+)$/)[1])" class="author-link">
             {{ author.display_name}}&nbsp;&nbsp;&nbsp;&nbsp;
             
            </span><br/><br/>
            <!-- {{ author.id.match(/\/([^/]+)$/)[1]}} -->
          </div>
          <div>
            <h3 class="detail_abstract">摘要</h3>
            <p>{{ this.article.abstract }}</p> <br/>
          </div>
          <div >
            <h3 class="detail_abstract">发表时间</h3>
            <p>{{ this.article.date }}</p><br/>
          </div>
          <div>
            <h3 class="detail_abstract">引用次数</h3>
            <p>{{ this.article.citationNum }}</p><br/>
          </div>
          <div
            class="detail_keywords"
          >
            <h3 class="detail_abstract">关键字</h3>
            <span v-for="(keyword, index) in this.article.keywords" :key="index">
             {{ keyword.keyword}}&nbsp;&nbsp;
            </span>
            <br/><br/>
          </div>
          <!-- <div class="detail_page_start">
            <h3 class="detail_abstract">页面数</h3>
            <p>{{ this.article.pageNum }}</p><br/>
          </div> -->
          <div
          >
            <h3 class="detail_abstract">语言</h3>
            <p>{{ this.article.language }}</p>
            <br/>
          </div>
          <div>
            <h3 class="detail_abstract">期刊/会议</h3>
            <span v-for="(keyword, index) in this.article.venue" :key="index">
             [{{ index+1 }}]{{ keyword}}<br/>
            </span><br/>
          </div>
          <!-- <div>
            <h3 class="detail_abstract">刊号</h3>
            <p>{{this.article.issn}}</p><br/>
          </div> -->
          
          <!-- <div>
            <h3 class="detail_abstract">ISSN</h3>
            <p>ISSN</p><br/>
          </div>
          <div>
            <h3 class="detail_abstract">DOI</h3>
            <p>DOI</p><br/>
          </div> -->
        </div>
        <div class="result_detail_statistics_area" >
          <div class="citation_stat" >
            <!-- <h3>Year Citation</h3> -->
            <h3>年引用量</h3>
            <paper-citation>
              <div id="yearCitation" style="width: 600px;height:300px;"></div>
            </paper-citation>
          </div>
          <!-- <div>
            
            <h3>关系图</h3>
            <reference-chart >
              <div id="reference" style="width: 600px;height:300px;"></div>
            </reference-chart>
          </div> -->
        </div>
        <div class="result_detail_statistics_area" >
            <h3 class="detail_abstract">评论</h3>
            <CommentSection :id="this.work_id" :paper="this.article" ref="comment_child"/>  
        </div>
    
      </div>
      <div class="result_detail_side_area">
        <div class="result_detail_side_container">
          <!-- <br/>
          <h3>引用</h3>
          <br/>
          <el-button @click="copyCitationToClipboard"
          ><el-icon style="margin-right: 10%;"><DocumentCopy /></el-icon>复制引用信息
          </el-button
          >
          <br/> -->
          <br/>
          <h3>操作</h3>
          <br/>
          <div class="button-group">
            <el-button
              type="primary"
              plain
              @click="seeArticle()"
              v-if="this.hasArticle==1"
            ><el-icon style="margin-right: 10%;"><Download /></el-icon>下载原文
            </el-button
            >
            <el-button
              type="primary"
              plain
              @click="seeArticle()"
              v-else
            ><el-icon style="margin-right: 10%;"><View /></el-icon>查看原文
            </el-button
            >
            <el-dropdown v-if="this.isfav == 0">
              <el-button
                type="warning"
                plain  
              ><el-icon style="margin-right: 10px;" ><Star /></el-icon>收藏
              </el-button>
              <template #dropdown>
                <el-dropdown-menu v-for="(collection, index) in collections" :key="index" :collection="collection" :index="index">
                  <el-dropdown-item @click="addToFav(collection.id)">{{collection.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button
              type="warning" v-else @click="removeFromFav"
            ><el-icon style="margin-right: 10px;" ><StarFilled /></el-icon>已收藏
            </el-button
            >
            <el-button @click="copyCitationToClipboard"
            ><el-icon style="margin-right: 10%;"><DocumentCopy /></el-icon>复制引用信息
            </el-button
            >
            <!-- <el-button
              type="success"         
              plain
            ><el-icon style="margin-right: 10px;"><DocumentAdd /></el-icon>加入清单
            </el-button
            >
            <el-button
              type="success"
            ><el-icon style="margin-right: 10px;"><DocumentRemove /></el-icon>移出清单
            </el-button
            > -->
          </div>
          <br/>
          <!-- <el-button-group style="padding-top:10px">
            <el-button
              type="primary"
            >
              推荐
            </el-button>
            <el-button
              type="primary"
            >
              放入专栏
            </el-button>
          </el-button-group> -->
          <!-- <br/><br/> -->
          <div class="statistics_citation">
            <h3>相关文章</h3>
            <br/>
            <related-paper-chart>
              <div id="relatedArticle" style="width: 400px;height:400px;"></div>
            </related-paper-chart>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-dialog
      title="复制引用信息"
      width="60%"
      @click="copyCitationToClipboard"
    >
      <li
        v-for="(documentcopyinfo, index) in this.documentcopylist"
        :key="index"
        style="display: flex; align-items: center; margin: 5px"
      >
        <div style="width: 10%">
          11
        </div>
        <div style="margin: 50px; width: 70%">
          22
        </div>
        <el-button
          v-clipboard:copy="documentcopyinfo.info"
          style="
            height: 10px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          "
        >复制
        </el-button
        >
      </li>
    </el-dialog> -->

    <el-dialog title="推荐表单" >
      <el-form >
        <el-form-item label="推荐人ID" >
          <el-input
            
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="推荐人姓名" >
          <el-input
            
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="推荐理由" >
          <el-input  :disabled="false"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button > 取 消</el-button>
        <el-button type="primary" > 确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="放入专栏" >
      <el-table  style="width: 120%;align:center">
        <!-- <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.column_id }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="专栏名" width="350" align='center'>
          <template >
            <el-popover trigger="hover" placement="top">
              <p>专栏ID: 114</p>
              <p>专栏名称: 514</p>
              <div  class="name-wrapper">
                <el-tag size="medium">1919</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="450" align='center'>
          <template >
            <el-button
              size="mini"
              type="primary"
              
            >加入专栏
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-input
          
          :disabled="false"
          style="width: 200px; margin-left: 80px; margin-right:200px;margin-top:15px"
        ></el-input>
        <el-button type="success" 
        >创建新的专栏并加入专栏中
        </el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommentSection from "../components/comment/CommentSection";
import { Article } from '@/api/article';
import clipboard from 'clipboard';
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus'
import axios from "axios";
export default {
  components:{
    CommentSection,
  },
  data() {
    return {
      article: {
        paper_id: "",
        title: "",
        abstract: "",
        date:"",
        keywords: [],
        citationNum: "",
        pageNum: "",
        language:"",
        venue: [],
        issn: [],
        doi: "",
        citationMessage:"test",
        starred:false,
        listed:false,
        link:"",
      },
      hasArticle:0,
      user_id:"",
      authors: [],
      fav:"",
      isfav:0,
      collections:[],
      work_id:"",
      citationGraph:{},
      searchState: {},
      years: [],
      citedByCounts: [],
      recommendForm: {
        username: "",
        name: "",
        author_id: "",
        reason: "",
      },
      columnForm: {
        name: "",
      },
      // data1:[
      //         {
      //           value: 335,
      //           name: 'A'
      //         },
      //         {
      //           value: 234,
      //           name: 'B'
      //         },
      //         {
      //           value: 1548,
      //           name: 'C'
      //         },
      //         {
      //           value: 514,
      //           name: 'D'
      //         },
      //         {
      //           value: 114,
      //           name: 'E'
      //         }
      //       ],
      data1:[],

      docid: "",
      type: "",
      option: "",
      related_papers: [],
      referencedata: [],
      columnList: [],
      driverlink: "", // 控制es结果赋值
      referenceloaded: false, // 控制引用图谱显示
      articleloaded: false, // 控制整个页面显示
      relatedloaded: false, // 控制相关文章显示
      yearcitationloaded: false,
      documentcopyvisible: false,
      recommendVisible: false,
      columnsVisible: false,
      formLabelWidth: "120px",
      documentcopylist: [],
    };
  },
  created(){
    const user_info=this.$Cookies.get('user_info');
    if(user_info!=null){
      const info=JSON.parse(user_info);
      this.user_id=info.id; 
    }
    this.isFav();
  },
  mounted() {
    this.getData();
    // this.getComments();
    this.getCollection();
    
  },
  methods: {
    isFav(){
      var data = {
        "work_id": this.$route.params.articleId,
      }
      Article.isFav(data)
      .then((res) => {
        if(res.data){
          console.log(res.data);
          if (res.data.isin==1) {
            this.isfav=1;
          }else{
            this.isfav=0;
          }
        }else{
          console.log("114");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getCollection(){
      // this.$Cookies.set('token', "8z2tki!hqm(fqk_(1)kle2i+j92!8wslzbs%h3(-xavat5b%_v");
      var data = {
        "user_id": this.user_id,
      }
      Article.getCollection(data)
      .then((res) => {
        if (res.data) {
          this.collections=res.data.package_list;
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getComments(){
      this.work_id="8z2tki!hqm(fqk_(1)kle2i+j92!8wslzbs%h3(-xavat5b%_v";
      // this.$Cookies.set('token', "8z2tki!hqm(fqk_(1)kle2i+j92!8wslzbs%h3(-xavat5b%_v");
      var data = {
        "work_id": "this.$route.params.articleId",
      }
      Article.articleComment(data)
      .then((res) => {
        if (res.data) {
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getData(){
      var data = {
        "entity_type": "works",
        "params": {
          "id":this.$route.params.articleId,
        }
      };
      Article.articleMess(data)
      .then((res) => {
        if (res.data.msgno === 1) {
          console.log(res.data);
          this.article.keywords=res.data.specific_entity_data.keywords;
          this.article.date=res.data.specific_entity_data.publication_date;
          this.article.citationNum=res.data.specific_entity_data.cited_by_count;
          this.article.abstract=res.data.specific_entity_data.abstract;
          this.article.title=res.data.specific_entity_data.title;
          this.article.pageNum=res.data.specific_entity_data.biblio.volume;
          this.citationGraph=res.data.specific_entity_data.counts_by_year;
          this.citationGraph.sort((a, b) => a.year - b.year);
          this.years = this.citationGraph.map(item => item.year);
          this.citedByCounts = this.citationGraph.map(item => item.cited_by_count);
          this.data1=res.data.specific_entity_data.sustainable_development_goals.map((goal) => {
            return {
              value: goal.score,
              name: goal.display_name,
            };
          });
          this.article.venue=res.data.specific_entity_data.locations.map(location => location.source.display_name);
          this.article.issn=res.data.specific_entity_data.locations.map(location => location.source.id);
          if(res.data.specific_entity_data.locations[0].pdf_url){
            this.article.link=res.data.specific_entity_data.locations[0].pdf_url;
            this.hasArticle=1;
          }else{
            this.article.link=res.data.specific_entity_data.locations[0].landing_page_url;
          }
          
          this.authors=res.data.specific_entity_data.authorships.map(item => item.author);
          if(res.data.specific_entity_data.language=="en"){
            this.article.language="English";
          }else if(res.data.specific_entity_data.language=="zh"){
            this.article.language="中文";
          }else{
            this.article.language="其它";
          }
          // searchDataList.value = res.data.list_of_entity_data[0].results;
          // totalSearchResNum.value = res.data.list_of_entity_data[0].meta.count;
          
          // ElNotification({
          //   title: "恭喜您",
          //   message: `搜索成功，用时 ${res.data.list_of_entity_data[0].meta.db_response_time_ms / 1000} s`,
          //   type: "success",
          //   duration: 3000
          // });
          this.drawRelatedArticleChart();
          this.drawYearCitationChart();
          // this.drawReferenceChart();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    copyCitationToClipboard() {
      // clipboard.writeText(this.article.citationMessage);
      var info = "";
      for (let i = 0; this.article.authors&&i < this.article.authors.length; i++) {
        info += this.article.authors[i].name + ",";
      }
      info  +=
        "(" +
        this.article.date.slice(0, 4) +
        ")." +
        this.article.title +
        "." +
        this.article.venue[0] +
        "," +
        this.article.pageNum +
        ".";
      // 创建一个临时的 textarea 元素
      const textarea = document.createElement('textarea');
      textarea.value = info;
      
      // 将 textarea 添加到 DOM 中
      document.body.appendChild(textarea);
      
      // 选中 textarea 内容
      textarea.select();
      
      // 复制选中的内容到剪贴板
      document.execCommand('copy');
      
      // 移除临时的 textarea 元素
      document.body.removeChild(textarea);
      ElMessage.success('已复制到剪贴板');
    },
    addToFav(a){
      // this.$Cookies.set('token', "8z2tki!hqm(fqk_(1)kle2i+j92!8wslzbs%h3(-xavat5b%_v");
      var data = {
        "work_id": this.$route.params.articleId,
        "package_id": a,
      }
      Article.addToFav(data)
      .then((res) => {
        if (res.data) {
          this.isfav=1;
          this.fav=a;
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
    },
    removeFromFav(){
      var myArray = [];
      myArray.push(this.$route.params.articleId);
      this.collections.forEach((element) => {
        this.fav=element.id; 
        var data = {
          "work_id_list": myArray,
          "package_id": this.fav,
        }
        Article.removeFromFav(data)
        .then((res) => {
          if (res.data) {
            this.isfav=0;
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      });
      
    },
    drawReferenceChart(){
      var myChart = echarts.init(document.getElementById('reference'));
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [{
              name: 'tree',
              children: [
                {
                  name: '比较',
                  value: 29,
                  children: [
                    {
                      name: '折线图',
                      value: 1
                    },
                    {
                      name: '面积图',
                      value: 2
                    },
                    {
                      name: '柱状图',
                      value: 3
                    }
                  ]
                },
                {
                  name: '趋势趋势趋势趋势趋势趋势趋势趋势趋势趋势',
                  value: 9,
                  children: [
                    {
                      name: '折线图',
                      value: 1
                    },
                    {
                      name: '阶梯图',
                      value: 2
                    },
                    {
                      name: '面积图',
                      value: 3
                    },
                    {
                      name: '堆叠面积图',
                      value: 4
                    }
                  ]
                },
                {
                  name: '组成'
                }
              ]
            }],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 7,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      });
    },
    seeArticle(){
      if(this.article.link){
        window.location.href = this.article.link;
      }else{
        ElMessage.error("暂无该文章原文");
      }
      
    },
    drawRelatedArticleChart() {
      var myChart = echarts.init(document.getElementById('relatedArticle'));
      myChart.setOption({
        // title: {
        //   left: 'center',
        //   top: 'center'
        // },
        // series:[
        //   {
        //     type: 'pie',
        //     data: this.data1,
        //     radius: ['40%', '70%']
        //   }
        // ]
        title: {
          top: 'center',
          left: 'center',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.data1,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    drawYearCitationChart(){
      var myChart = echarts.init(document.getElementById('yearCitation'));
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // data: [2016, 2017, 2018, 2019, 2020, 2021,2022],
            data:this.years,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            // data: [10, 52, 200, 334, 390, 330, 220],
            data: this.citedByCounts,
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.result_detail_category_part {
  display: inline;

  font-size: 13px;
}

.result_detail_author {
  display: inline;

  font-size: 13px;
  color: royalblue;
}

.result_detail_page_container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.result_detail_title_area {
  width: 85vw;
  padding: 0px 0px 0px;
}

.result_detail_main_area {
  width: 50vw;
}

.result_detail_comment_area {
  /* width: 100%; */
  margin-block-start: 30px;
}

.tabs_area {
  border-width: 1px;
  /* border-color: grey; */
  /* border-style: solid; */
  border-radius: 0 0 10px 10px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
  -2px -2px 20px rgba(255, 255, 255, 0.5);
}

.result_detail_article_area {
  /* width: 100%; */
  border-width: 1px;
  border-color: grey;
  /* border-style: solid; */
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px 20px;
  /* background-image: linear-gradient(to right bottom, #abb7b7 ,#dadfe1); */
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
  -2px -2px 20px rgba(255, 255, 255, 0.5);
}

.result_detail_side_area {
  width: 30vw;
  padding: 0px 20px 20px;
  margin-top: 20px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
  -2px -2px 20px rgba(255, 255, 255, 0.5);
}

.result_detail_side_container {
  width: 100%;
}

.result_detail_statistics_area {
  margin-block-start: 30px;
  border-width: 1px;
  padding: 20px;
  /* border-color: grey; */
  /* border-style: solid; */
  border-radius: 10px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1),
  -2px -2px 20px rgba(255, 255, 255, 0.5);
}

.citation_stat {
  margin: auto;
  vertical-align: middle;
}

.result_detail_title {
  font-weight: bold;
  font-size: 40px;
  margin-top: -5px;
  margin-bottom: -5px;
  color: black;
}

.bottom_area {
  padding: 0vw 10vw 10vw 10vw;
  width: 80vw;
  /* display: flex; */
  position: relative;
  /* flex-direction: row; */
  /* align-items: flex-start; */
  /* flex-wrap: nowrap; */
  justify-content: space-evenly;
}

.button-group .el-button {
  margin: 8px 8px;
}

.detail_abstract{
  margin-bottom: 10px;
}

.author-link {
  cursor: pointer;
}
</style>
