<template>
  <div id="root">
    <div id="trigger"></div>
    <div style="position: fixed; top: 70px; z-index: 2">
      <div id="authorHeader">
        <svg
          id="authorsvg"
          class="icon"
          width="35px"
          height="35px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M272.128 538.752l207.36 409.472H204.736c-31.488-1.152-57.728-12.224-78.72-33.28s-32.064-47.232-33.28-78.72v-185.472c1.152-31.488 12.224-57.728 33.28-78.72s47.232-32.064 78.72-33.28h67.392z m88.768-414.784c38.784-39.104 87.616-59.52 146.56-61.248 58.944 1.728 107.776 22.144 146.56 61.248 38.784 39.104 59.072 87.808 60.8 146.112-0.576 37.952-9.92 72.64-28.032 104.128s-43.456 56.576-76.096 75.264c-32.704 18.688-67.072 28.032-103.232 28.032-36.16 0-70.592-9.344-103.232-28.032-32.704-18.688-58.048-43.776-76.096-75.264-18.112-31.488-27.456-66.176-28.032-104.128 1.728-58.304 22.016-107.008 60.8-146.112z m241.984 532.928l-95.36 201.28-95.36-201.28 95.36-83.968 95.36 83.968z m286.976-84.928c21.568 20.992 34.112 47.232 37.632 78.72v185.472c-0.576 31.488-11.52 57.728-32.832 78.72-21.312 20.992-47.68 32.064-79.168 33.28H540.736l202.112-409.472h67.392c31.488 1.216 58.048 12.288 79.616 33.28z"
            fill="#666666"
          />
        </svg>

        <div id="authorName">
          <!-- "this.author.userId !== 0 ? '/user/' + this.author.userId : null" -->
          <!-- :to="'/user/' + this.author.userId"
          target="_blank"
          class="clean-router-link" -->
          <a
            style="cursor: pointer;"
            @click="handleToUser"
          >
            <div v-if="authorLoaded">{{ this.author.name }}</div>
          </a>
          <el-button id="authentication" text bg @click="this.dialogVisible = true" v-if="authenticationAccessible">认领</el-button>
        </div>

        <div id="authorNameFake">
          <div v-if="authorLoaded">{{ this.author.name }}</div>
        </div>

        <div id="authorInfo">
          <div style="display: flex">
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z"
                fill="#666666"
              />
            </svg>
            <div style="margin-left: 5px; white-space: nowrap" v-if="authorLoaded">
              {{ this.author.numOfPaper }}篇
            </div>
          </div>

          <div style="display: flex">
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M321.40024 143.1c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7s-98.1 210.7-219.1 210.7S0.00024 801 0.00024 684.6c-0.2-222 123.6-427.1 321.4-541.5z m584.3 0.7c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7S924.50024 896 803.50024 896s-219.1-94.3-219.1-210.7c0-221.7 123.8-427.2 321.3-541.5z"
                fill="#666666"
              />
            </svg>
            <div style="margin-left: 5px; white-space: nowrap">
              {{ this.author.numOfCitation }}次
            </div>
          </div>

          <div style="display: flex">
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M509.748215 70.300113c-242.847957 0-439.695231 196.885136-439.695231 439.695231 0 242.846934 196.847274 439.695231 439.695231 439.695231 242.827491 0 439.695231-196.847274 439.695231-439.695231C949.442422 267.185248 752.575706 70.300113 509.748215 70.300113zM554.516838 441.519786l0 355.308285-89.536222 0L464.980615 441.519786 337.693604 441.519786l172.054611-218.205721L681.801802 441.519786 554.516838 441.519786z"
                fill="#666666"
              />
            </svg>
            <div style="margin-left: 5px; white-space: nowrap">
              {{ this.author.hIndex }}
            </div>
          </div>
        </div>

        <div id="authorAff">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <span style="color: #666666; font-weight: bold; margin-right: 10px">隶属机构</span>
            <svg
              class="icon"
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M969.176313 950.856281l3.364561-580.715848a88.100288 88.100288 0 0 0-89.745997-86.19858h-126.756164v-197.485079a84.552871 84.552871 0 0 0-26.258201-61.403232A91.391706 91.391706 0 0 0 666.292716 0.002194H141.274975a91.391706 91.391706 0 0 0-63.268368 25.051348 84.845442 84.845442 0 0 0-24.978206 61.147232V952.319133h-14.482239A37.778164 37.778164 0 0 0 0.036571 988.159018c0.365713 9.508541 4.388557 18.505083 11.263964 25.051348 7.314262 6.98512 17.115374 10.861679 27.245627 10.788537h948.001524C1007.210477 1023.998903 1024.03328 1007.1761 1024.03328 986.403595c0-20.772505-16.822803-37.595308-37.485594-37.595308L969.176313 950.856281zM311.039 421.523125h196.753654c20.699362 0 37.485594 16.822803 37.485593 37.595308 0 20.772505-16.786232 37.595308-37.485593 37.595308H311.258428a38.76559 38.76559 0 0 1-33.75532-20.553077 35.657028 35.657028 0 0 1 0-36.351883c7.204548-11.556534 19.894793-18.505083 33.499321-18.285656z m196.753654 345.086891H311.258428c-20.735933 0-37.522165-16.822803-37.522165-37.595308 0-20.735933 16.822803-37.558736 37.522165-37.558736h196.753654c13.67767-0.329142 26.5142 6.619407 33.718748 18.285655 7.423976 11.812533 7.314262 26.879914-0.219428 38.582733a38.729018 38.729018 0 0 1-33.75532 18.285656z"
                fill="#666666"
              />
            </svg>
          </div>

          <div class="affname" v-if="authorLoaded">
            <span v-for="(org, index) in this.author.organizations" :key="index">
              {{ org.institution.display_name }}<br>
            </span>
          </div>

        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="认领学者门户"
      width="30%"
      :before-close="handleDialogClose"
    >
      <el-input style="margin-bottom: 10px;" v-model="this.inputMessage" placeholder="请输入相关的验证信息" />
      <div style="margin-bottom: 10px;">
        <span> 请上传能证明个人身份的图片（证件、文书） </span>
      </div>
      <el-upload 
        action="#" 
        list-type="picture-card" 
        :auto-upload="false" 
        v-model:file-list="this.fileList" 
        :on-change="this.handleFileSelect"
        :limit="2"
        accept=".png, .jpg, .jpeg"
      >
        <el-icon><Plus /></el-icon>
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-delete"
                @click="handlePictureRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDialogClose">取消</el-button>
          <el-button type="primary" @click="sendAuthenticationApply">
            <!-- sendAuthenticationApply  console.log(this.fileList) -->
            发送
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div style="height: 390px"></div>

    <div id="charts">
      <div class="datatitle" style="width: 1250px">
        <h2>数据统计</h2>
        <svg
          class="icon"
          width="27px"
          height="27px"
          style="right: 10px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1024.25175 0l-209.92 23.04L883.45175 92.16 655.61175 370.688 419.06775 152.064c-15.872-14.848-40.96-14.848-57.344-0.512L14.07575 465.408C-3.33225 481.28-4.86825 508.416 11.00375 525.824c8.192 9.216 19.968 13.824 31.744 13.824 10.24 0 20.48-3.584 28.672-10.752l318.464-287.744 241.152 222.72c8.704 8.192 20.48 11.776 31.744 11.264 11.776-1.024 22.528-6.656 30.208-15.36l250.88-306.688 57.344 57.344L1024.25175 0z m0 0M133.37175 1024H30.97175c-16.896 0-30.72-13.824-30.72-30.72v-348.16c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v348.16c0 16.896-13.824 30.72-30.72 30.72z"
            fill="#666666"
          />
          <path
            d="M420.09175 1024H317.69175c-16.896 0-30.72-13.824-30.72-30.72V440.32c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v552.96c0 16.896-13.824 30.72-30.72 30.72zM706.81175 1024h-102.4c-16.896 0-30.72-13.824-30.72-30.72v-399.36c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v399.36c0 16.896-13.824 30.72-30.72 30.72zM993.53175 1024h-102.4c-16.896 0-30.72-13.824-30.72-30.72V337.92c0-16.896 13.824-30.72 30.72-30.72h102.4c16.896 0 30.72 13.824 30.72 30.72v655.36c0 16.896-13.824 30.72-30.72 30.72z"
            fill="#666666"
          />
        </svg>
      </div>

      <el-divider></el-divider>

      <author-compare-chart
        class="chart"
        :hIndex="this.author.hIndex"
        :numOfPaper="this.author.numOfPaper"
        :numOfCitation="this.author.numOfCitation"
        v-if="authorLoaded"
      ></author-compare-chart>
      <author-year-paper-chart
        class="chart"
        :InformationByYear="getReverseList(this.author.InformationByYear)"
        v-if="authorLoaded"
      ></author-year-paper-chart>
      <author-relation-map
        class="chart"
        :nodes="this.relationMapNodes"
        :links="this.relationMapLinks"
        v-if="relationLoaded"
      ></author-relation-map>
      <related-author-chart
        class="chart"
        :list="this.cooperationAuthorList"
        v-if="relationLoaded"
      ></related-author-chart>
    </div>

    <div id="authorData">
      <div id="authorPapers" class="dataWrapper" v-if="paperLoaded">
        <div class="datatitle">
          <h2>论文列表</h2>
          <svg
            class="icon"
            width="27px"
            height="27px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M734.634667 72.448C717.824 55.978667 685.226667 42.666667 661.674667 42.666667H204.8C162.389333 42.666667 128 79.189333 128 124.330667v775.338666C128 944.768 162.474667 981.333333 204.8 981.333333h614.4c42.410667 0 76.8-36.693333 76.8-81.578666V273.493333c0-23.68-13.781333-56.405333-30.378667-72.661333l-130.986666-128.426667zM341.333333 298.666667h341.333334a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 1 1 0-85.333333z m0 170.666666h170.666667a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334z"
              fill="#666666"
            />
          </svg>
        </div>

        <el-divider></el-divider>

        <div>
          <router-link
            class="link"
            v-for="(paper, index) in this.papers"
            :key="paper.id"
            :to="'/article/' + paper.id"
            tag="a"
            target="_blank"
          >
            <div class="paperindex">
              {{ index + 1 + (currentPage - 1) * this.pageSize }}
            </div>
            <div style="width: 700px">{{ paper.title }}</div>
            <div class="citation2">第{{ getAuthorPosition(paper.authorships) }}作者</div>
            <div class="citation">被引{{ paper.cited_by_count }}次</div>
          </router-link>
          <div>  
            <el-pagination 
              background
              layout="prev, pager, next"
              :total="this.author.numOfPaper"
              :page-size="25"
              v-model:current-page="this.currentPage"
              @current-change="this.handleCurrentChange"
              :pager-count="5"
              :hide-on-single-page="true"
              style="margin-left: 30%;"
            />
          </div>
          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="this.papers.length"
            :page-size="25"
            v-model:current-page="this.currentPage"
            @current-change="this.handleCurrentChange"
            :pager-count="5"
            :hide-on-single-page="true"
          >
          </el-pagination> -->
        </div>

        <!-- <center style="margin-top: 30px; margin-bottom: 30px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="this.papers.length"
            :page-size="25"
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
          >
          </el-pagination>
        </center> -->

      </div>
      <!-- <div v-if="type == 100" id="authorLabel" class="dataWrapper">
        <div>
          <div class="datatitle">
            <h2>学者标签</h2>
            <svg
              class="icon"
              width="27px"
              height="27px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M814 122.8l-264.6 12.7c-35.1 1.7-68.3 16.4-93.1 41.2L107.7 525.3c-31.1 31.1-31.1 81.6 0 112.7l277.2 277.2c31.1 31.1 81.6 31.1 112.7 0l14.3-14.3 92.1-92.1 242.2-242.2c24.8-24.8 39.5-58 41.2-93.1l12.7-264.6c2.3-48.5-37.6-88.4-86.1-86.1zM689.6 470c-37.8 37.8-99 37.8-136.8 0s-37.8-99 0-136.8c37.8-37.8 99-37.8 136.8 0 37.8 37.8 37.8 99.1 0 136.8z"
                fill="#666666"
              />
            </svg>
          </div>

          <el-divider></el-divider>

          <div
            style="
              width: 330px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            "
          >
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import AuthorCompareChart from "@/components/Charts/AuthorCompareChart.vue";
import AuthorYearPaperChart from "@/components/Charts/AuthorYearPaperChart.vue";
import AuthorRelationMap from "@/components/Charts/AuthorRelationMap.vue";
import RelatedAuthorChart from "@/components/Charts/RelatedAuthorChart.vue";
import gsap from "gsap";
import { AuthorAPI } from '@/api/author';
import axios from 'axios';
import { ElMessage } from "element-plus";
export default {
  name: "Author",
  components: {
    AuthorCompareChart,
    AuthorYearPaperChart,
    AuthorRelationMap,
    RelatedAuthorChart,
  },
  data(){
    return {
      testFlag: false,
      type: 2,
      currentPage: 1,
      pageSize: 25,
      authenticationAccessible: false,
      inputMessage: "",
      fileList: [],
      base64FileList:[],
      dialogVisible: false,
      authorLoaded: false,
      paperLoaded: false,
      relationLoaded: false,
      author: {
        id: 1,
        userId: 0,
        name: "Nishikigi Chisato",
        numOfPaper: 5,
        numOfCitation: 10086,
        hIndex: 20,
        worksApiUrl: "",
        InformationByYear: [
          { year: 2023, works_count: 0, cited_by_count: 179 },
          { year: 2022, works_count: 2, cited_by_count: 217 },
          { year: 2021, works_count: 1, cited_by_count: 230 },
          { year: 2020, works_count: 5, cited_by_count: 283 },
          { year: 2019, works_count: 2, cited_by_count: 236 },
          { year: 2018, works_count: 3, cited_by_count: 193 },
          { year: 2017, works_count: 3, cited_by_count: 167 },
          { year: 2016, works_count: 2, cited_by_count: 181 },
          { year: 2015, works_count: 3, cited_by_count: 214 },
          { year: 2014, works_count: 4, cited_by_count: 202 },
          { year: 2013, works_count: 11, cited_by_count: 155 },
          { year: 2012, works_count: 11, cited_by_count: 68 }
        ],
        organizations: [{
          institution: {
            id: "https://openalex.org/I4200000001",
            ror: "https://ror.org/02nr0ka47",
            display_name: "Tsinghua University",
            country_code: "CA",
            type: "nonprofit",
            lineage: ["https://openalex.org/I4200000001"]
          },
          years: [2022, 2021, 2020, 2019]
        }, {
          institution: {
            id: "https://openalex.org/I4200000001",
            ror: "https://ror.org/02nr0ka47",
            display_name: "Beihang University",
            country_code: "CA",
            type: "nonprofit",
            lineage: ["https://openalex.org/I4200000001"]
          },
          years: [2022, 2021, 2020, 2019]
        }, {
          institution: {
            id: "https://openalex.org/I4200000001",
            ror: "https://ror.org/02nr0ka47",
            display_name: "Massachusetts Institute of Technology",
            country_code: "CA",
            type: "nonprofit",
            lineage: ["https://openalex.org/I4200000001"]
          },
          years: [2022, 2021, 2020, 2019]
        }]
      },
      papers: [
        {
          id: 0,
          title: "Make BUAA Great Again!",
          cited_by_count: 102,
          authorIndex: 1
        }, {
          id: 1,
          title: "Great, needless to say",
          cited_by_count: 369,
          authorIndex: 3
        }, {
          id: 2,
          title: "Uzi, The eternal god",
          cited_by_count: 1020,
          authorIndex: 2
        }, 
      ],
      relationMapLinks: [],
      relationMapNodes: [],
      cooperationAuthorList: [{
        author_name: "Shuntai Zhou",
        author_id: "A5081889727",
        cooperation_author_count: 33,
        work_list: []
      }, {
        author_name: "Myron S. Cohen",
        author_id: "A5024262342",
        cooperation_author_count: 19,
        work_list: []
      }, {
        author_name: "Sarah Joseph",
        author_id: "A5056145693",
        cooperation_author_count: 18,
        work_list: []
      }]
    }
  },
  mounted() {
    this.author.id = this.$route.params.authorId;
    this.initAnimation();
    this.getAuthorAuthentication();
    this.initAuthorInformation();
  },
  methods: {
    handleCurrentChange(curPage) {
      this.currentPage = curPage;
      this.getAuthorPapers(this.author.worksApiUrl, this.currentPage);
    },
    getAuthorAuthentication() {
      const userInfoString = this.$Cookies.get('user_info');
      if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          console.log("用户已登录，获取到Cookie，用户名为：" + userInfo.username);
          var data = {
            "user_id": userInfo.id,
            "author_id": this.author.id
          };
          AuthorAPI.getIfAuthenticated(data)
            .then((res) => {
              if (res.data.status === "true") {
                this.authenticationAccessible = true; 
              }
              this.author.userId = res.data.userid;
              console.log("author's user_id: " + this.author.userId);
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
          console.log("Cookie不存在");
      }
    },
    getReverseList(list){
      var len = list.length;
      var reverseList = [];
      for (let i = len-1; i >= 0; i--) {
        reverseList.push(list[i]);
      }
      return reverseList;
    },
    getAuthorPosition(list) {
      var len = list.length;
      for (let i = 0; i < len; i++) {
        if (list[i].author.id.split("org/")[1] === this.author.id) {
          if (list[i].author_position === "first") return "一";
          if (list[i].author_position === "middle") return "二";
          if (list[i].author_position === "last") return "三";
        }
      }
      console.log("作者等级获取错误");
    },
    initAnimation() {
      gsap.to("#authorHeader", {
        duration: 1,
        height: "80px",
        borderRadius: "50px",
        scrollTrigger: {
          trigger: "#authorName",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      gsap.to("#authorInfo", {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      gsap.to("#authorAff", {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      gsap.to("#authorName", {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
      gsap.to("#authorNameFake", {
        duration: 1,
        top: "22px",
        color: "#7f7f7f",
        fontSize: "23px",
        opacity: 1,
        scrollTrigger: {
          trigger: "#authorHeader",
          start: "top top",
          end: "+=200px",
          scrub: 0.7,
        },
      });
    },
    getAuthorPapers(papersUrl, page) {
      // console.log("getAuthorPapers from " + papersUrl);
      papersUrl = papersUrl + "&page=" + page;
      // console.log("getAuthorPapers from " + papersUrl);
      axios.get(papersUrl)
        .then((res) => {
          this.papers = res.data.results;
          if (res.data.meta.count !== this.author.numOfPaper) {
            this.author.numOfPaper = res.data.meta.count;
          }
          for (let i = 0; i < this.papers.length; i++) {
            this.papers[i].id = this.papers[i].id.split("org/")[1];
          }
          // console.log(papersUrl + " return :" + res.data.results);
          // console.log("papers :" + res.data.results.length);
          this.paperLoaded = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getAuthorRelations() {
      var data = {
        "author_id": this.author.id
      };
      console.log("请求获取学者关系");
      AuthorAPI.getAuthorRelation(data)
        .then((res) => {
          if (res.data.result === 1) {
            this.cooperationAuthorList = res.data.cooperation_author_list;
            var len = this.cooperationAuthorList.length;
            this.relationMapNodes.push({
              name: this.author.name,
              id: this.author.id,
              symbolSize: this.cooperationAuthorList[0].cooperation_author_count,
              value: this.cooperationAuthorList[0].cooperation_author_count,
              fixed: true,
              x: 300,
              y: 250,
            });
            for (let i = 0; i < len; i++) {
              this.relationMapNodes.push({
                name: this.cooperationAuthorList[i].author_name,
                id: this.cooperationAuthorList[i].author_id,
                symbolSize: this.cooperationAuthorList[i].cooperation_author_count,
                value: this.cooperationAuthorList[i].cooperation_author_count,
                // fixed: true,
              });
              this.relationMapLinks.push({
                source: this.author.id,
                sourceName: this.author.name,
                target: this.cooperationAuthorList[i].author_id,
                targetName: this.cooperationAuthorList[i].author_name,
                cooperationNum: this.cooperationAuthorList[i].cooperation_author_count,
                value: this.cooperationAuthorList[i].cooperation_author_count,
              });
            }
            this.relationLoaded = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initAuthorInformation() {
      var data = {
        "entity_type": "authors",
        "params": {
          id: this.author.id
        }
      };
      console.log("请求获取学者门户，openAlex的id为" + this.author.id);
      AuthorAPI.getAuthorInformation(data)
        .then((res) => {
          if (res.data.msgno === 1) {
            this.author.name = res.data.specific_entity_data.display_name;
            this.author.numOfPaper = res.data.specific_entity_data.works_count;
            this.author.numOfCitation = res.data.specific_entity_data.cited_by_count;
            this.author.hIndex = res.data.specific_entity_data.summary_stats.h_index;
            this.author.organizations = res.data.specific_entity_data.affiliations;
            this.author.InformationByYear = res.data.specific_entity_data.counts_by_year;
            this.author.worksApiUrl = res.data.specific_entity_data.works_api_url;
            this.authorLoaded = true;
            this.getAuthorPapers(res.data.specific_entity_data.works_api_url, 1);
            this.getAuthorRelations();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleFileSelect(uploadFile, uploadFiles) {
      let reader = new FileReader();
      reader.readAsDataURL(uploadFile.raw);
      reader.onload = e => {
        const code = e.target.result;
        this.base64FileList.push(code);
      }
      console.log(this.base64FileList);
    },
    handlePictureRemove(file){
      console.log("remove File:" + file);
      this.fileList.forEach(function(item, index, arr) {
          if(item == file) {
              arr.splice(index, 1);
          }
      });
    },
    sendAuthenticationApply() {
      var jsonData = {
        "author_id": this.author.id,
        "name": this.author.name,
        "content": this.inputMessage,
      }
      console.log("fileList (JSON):" + JSON.stringify(this.fileList));
      for (let i = 0; i < this.base64FileList.length; i++) {
        // data.append("images", this.base64FileList[i]);
        console.log("base64[" + i + "] = " + this.base64FileList[i]);
      }
      var jsonData = {
        "author_id": this.author.id,
        "name": this.author.name,
        "content": this.inputMessage,
        "images": this.base64FileList
      }
      AuthorAPI.uploadAuthentication(jsonData)
        .then((res) => {
          console.log(res.data.result);
          if (res.data.result === 0) {
            ElMessage({
              message: res.data.message,
              type: 'success',
            })
          } else {
            ElMessage({
              message: res.data.message,
              type: 'warning',
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.inputMessage = "";
      this.fileList = [];
      this.base64FileList = [],
      this.dialogVisible = false;
    }, 
    handleDialogClose() {
      this.inputMessage = "";
      this.fileList = [];
      this.base64FileList = [],
      this.dialogVisible = false;
    },
    handleToUser() {
      if (this.author.userId !== 0) {
        // console.log(this.author.userId);
        this.$router.push({name:"user",params:{"id":this.author.userId}});
      } else {
        ElMessage({
          message: '该学者尚未入驻平台',
          type: 'warning',
        });
      }
    }
  }
}
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#authorHeader {
  /* outline: #21ff06 dotted thick; */
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* position: relative; */
}

#authorsvg {
  position: absolute;
  top: 20px;
  left: 20px;
  opacity: 20%;
}

#authorName {
  font-size: 30px;
  font-weight: bolder;

  /*  position: absolute;
  top: 50px; */
  position: relative;

  width: 360px;
  text-align: center;
}

#authentication {
  position: absolute;
  top: 7px;
  right: -20px;
}

#authorNameFake {
  opacity: 0;

  font-size: 30px;
  font-weight: bolder;

  position: absolute;
  top: 50px;

  width: 360px;
  text-align: center;
}

#authorInfo {
  display: flex;
  justify-content: space-between;
  color: #666666;
  font-weight: 500;
  width: 260px;
  margin-top: 20px;
}

#authorAff {
  margin-top: 20px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  overflow: hidden; 
}

.affname {
  border-radius: 10px;
  background-color: #26beb8;
  color: white;

  font-size: 16px;
  font-weight: 500;

  padding: 2px 8px 2px 8px;
  margin-top: 10px;
  margin-right: 3px;
  margin-left: 3px;

  /* max-width: 300px; */
  max-width: 400px;

  overflow-y: scroll;
}

#authorData {
  display: flex;
  justify-content: center;
  width: 1200px;
}

#authorRecommend {
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  width: 1200px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

#authorColumn {
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  width: 1200px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.dataWrapper {
  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  padding: 20px;
  margin: 40px;
}

.datatitle {
  /* outline: #21ff06 dotted thick; */
  height: 40px;
  margin-top: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.paperindex {
  /* outline: #21ff06 dotted thick; */
  border-radius: 50px;
  background-color: #26beb8;
  color: white;
  width: 30px;
  height: 30px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  margin-right: 10px;
}

.citation {
  white-space: nowrap;

  position: relative;
  right: 5px;

  text-align: center;

  font-size: 13px;

  background-color: #808080;
  color: white;

  border-radius: 10px;

  padding: 2px 8px 2px 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-top: 3px;
}

.citation2 {
  white-space: nowrap;

  position: relative;
  right: 5px;

  text-align: center;

  font-size: 13px;

  background-color: #dace0a;
  color: white;

  border-radius: 10px;

  padding: 2px 8px 2px 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-top: 3px;
}

.tagName {
  text-align: left;

  font-size: 15px;
  font-weight: bold;

  background-color: #dace0a;
  color: white;

  border-radius: 25px;

  padding: 3px 10px 3px 10px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.link {
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
}

a:link {
  color: #000000;
}

a:visited {
  color: #666666;
}

a:hover {
  color: #1292fd;
  font-weight: bold;
}

#charts {
  /* outline: #21ff06 dotted thick; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 1290px;

  border: #e6e6e6 solid thin;
  border-radius: 30px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.2);
  padding: 20px;
  margin: 20px;

  position: relative;

  overflow: hidden;
}

.chart {
  /* outline: #21ff06 dotted thick; */

  box-shadow: inset 0px 0px 10px 6px rgba(50, 50, 50, 0.1);
  border-radius: 30px;

  width: 600px;
  height: 500px;
  display: flex;
  align-items: center;

  margin: 10px;
}

.map {
  /* outline: #21ff06 dotted thick; */

  box-shadow: inset 0px 0px 10px 6px rgba(50, 50, 50, 0.1);
  border-radius: 30px;

  width: 600px;
  height: 500px;
  display: flex;
  align-items: center;

  margin: 10px;
}

.clean-router-link {
  color: inherit;
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 8px !important ;
  height: 8px !important ;
}

::-webkit-scrollbar-track {
  background-color:transparent !important ;
  -webkit-border-radius: 2em !important ;
  -moz-border-radius: 2em !important ;
  border-radius:2em !important ;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(147,147,153,0.5) !important ;
  -webkit-border-radius: 2em !important ;
  -moz-border-radius: 2em !important ;
  border-radius:2em !important ;
}
</style>