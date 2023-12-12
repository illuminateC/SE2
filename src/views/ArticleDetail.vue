<template>
  <div id="result_detail_page" >
    <div class="result_detail_page_container">
      <div class="result_detail_title_area">
        <div class="result_detail_title">
          {{ this.article.title }}
        </div>
        <!-- <div class="result_detail_author_container">
          <router-link
            tag="a"
            target="_blank"
            :to="'/author/' + $route.params.type + '/' + 1"
            class="result_detail_author"
            
            :key="1"
          >
            114
            114 ,
            <div
              style="display: inline"
              
            >
              ,
            </div>
          </router-link>
        </div> -->
      </div>
      <div class="result_detail_main_area">
        <div class="result_detail_article_area">
          <br/>
          <div>
            <h3 class="detail_abstract">摘要</h3>
            <p>{{ this.article.abstract }}</p> <br/>
          </div>
          <div >
            <h3 class="detail_abstract">年份</h3>
            <p>{{ this.article.year }}</p><br/>
          </div>
          <div>
            <h3 class="detail_abstract">引用次数</h3>
            <p>{{ this.article.citationNum }}</p><br/>
          </div>
          <div
            class="detail_keywords"
          >
            <h3 class="detail_abstract">关键字</h3>
            <span >
             {{this.article.keywords}}
            </span><br/><br/>
          </div>
          <div
            
            class="detail_page_start"
          >
            <h3 class="detail_abstract">页面数</h3>
            <p>{{ this.article.pageNum }}</p><br/>
          </div>
          <div
          >
            <h3 class="detail_abstract">语言</h3>
            <p>{{ this.article.language }}</p>
            <br/>
          </div>
          <div>
            <h3 class="detail_abstract">期刊/会议</h3>
            <p>{{this.article.venue}}</p><br/>
          </div>
          <div>
            <h3 class="detail_abstract">刊号</h3>
            <p>{{this.article.issn}}</p><br/>
          </div>
          
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
            <h3>Year Citation</h3>
            <paper-citation>
              <div id="yearCitation" style="width: 600px;height:300px;"></div>
            </paper-citation>
          </div>
          <div>
            <h3>Reference Graph</h3>
            <reference-chart >
              <div id="reference" style="width: 600px;height:300px;"></div>
            </reference-chart>
          </div>
        </div>
        <div class="result_detail_comment_area">
          <el-tabs class="tabs_area" type="border-card">
            <el-tab-pane class="pane_area" label="评论">
              <CommentSection :id="this.$route.params.docid" :paper="this.article" ref="comment_child"/>
            </el-tab-pane>
            <el-tab-pane label="专家推荐"
            >
              <RecommendSection :recommends="this.$data.recommends" ref="child"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="result_detail_side_area">
        <div class="result_detail_side_container">
          <br/>
          <h3>引用</h3>
          <br/>
          <el-button @click="copyCitationToClipboard"
          ><el-icon style="margin-right: 10%;"><DocumentCopy /></el-icon>复制引用信息
          </el-button
          >
          <br/>
          <br/>
          <h3>操作</h3>
          <br/>
          <div class="button-group">
            <el-button
              type="primary"
              plain
            ><el-icon style="margin-right: 10%;"><View /></el-icon>查看原文
            </el-button
            >
            
            <el-button
              type="warning"
              plain
            ><el-icon style="margin-right: 10px;"><Star /></el-icon>收藏
            </el-button>
            <el-button
              type="warning"
            ><el-icon style="margin-right: 10px;"><StarFilled /></el-icon>已收藏
            </el-button
            >
            <el-button
              type="success"         
              plain
            ><el-icon style="margin-right: 10px;"><DocumentAdd /></el-icon>加入清单
            </el-button
            >
            <el-button
              type="success"
            ><el-icon style="margin-right: 10px;"><DocumentRemove /></el-icon>移出清单
            </el-button
            >
          </div>
          <br/>
          <el-button-group style="padding-top:10px">
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
          </el-button-group>
          <br/><br/>
          <div class="statistics_citation">
            <h3>相关文章</h3>
            <br/>
            <related-paper-chart>
              <div id="relatedArticle" style="width: 400px;height:300px;"></div>
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
// import RecommendSection from "../components/recommendation/RecommendSection";
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
        title: "114",
        authors: [],
        abstract: "在大规模数据中心中，硬盘使用规模已经达到百万级别。盘类故障问题频发，会导致服务器甚至整个IT基础设施稳定性、可靠性的下降，最终对业务SLA带来负面影响。能否提前准确预测硬盘故障已经成为大规模数据中心和云计算时代工业界需要研究和解决的重要问题之一。本课题聚焦解决大规模生产系统中的硬盘故障预测问题，解决数据噪声、正负样本不均衡等技术问题，并通过构建机器学习模型，在一定时间范围内（30天）对将要故障的磁盘作出预警；对于已发生故障的磁盘，也应将其检测出来",
        year: "2023",
        keywords: "这是关键字",
        citationNum: 0,
        pageNum: 0,
        language:"中文",
        venue: "无",
        issn: "0",
        doi: "",
        citationMessage:"test",
      },
      recommendForm: {
        username: "",
        name: "",
        author_id: "",
        reason: "",
      },
      columnForm: {
        name: "",
      },
      data1:[
              {
                value: 335,
                name: 'A'
              },
              {
                value: 234,
                name: 'B'
              },
              {
                value: 1548,
                name: 'C'
              },
              {
                value: 514,
                name: 'D'
              },
              {
                value: 114,
                name: 'E'
              }
            ],
      docid: "",
      type: "",
      option: "",
      related_papers: [],
      referencedata: [],
      columnList: [],
      searchState: {},
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
  mounted() {
    this.drawRelatedArticleChart();
    this.drawYearCitationChart();
    this.drawReferenceChart();
    // this.getData();
  },
  methods: {
    copyCitationToClipboard() {
      // clipboard.writeText(this.article.citationMessage);
      const citation = this.article.citationMessage;
  
      // 创建一个临时的 textarea 元素
      const textarea = document.createElement('textarea');
      textarea.value = citation;
      
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
    getData(){
      // this.article.abstract="114";
      let articleId = this.$route.params.articleId;
      let formData = new FormData();
      formData.append("articleId", articleId);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "https://go-service-296709.df.r.appspot.com/api/v1/user/favorite/isfav",
          formData,
          config
        )
        .then((response) => {
          if (response) {
            if (response.data.message == "true") {
              this.article.abstract = response.data.abstract;
            } else {
              
            }
          }
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
    drawRelatedArticleChart() {
      var myChart = echarts.init(document.getElementById('relatedArticle'));
      myChart.setOption({
        title: {
          left: 'center',
          top: 'center'
        },
        series:[
          {
            type: 'pie',
            data: this.data1,
            radius: ['40%', '70%']
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
            data: [2016, 2017, 2018, 2019, 2020, 2021,2022],
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
            data: [10, 52, 200, 334, 390, 330, 220]
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
  padding: 0px 20px 20px;
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
</style>
