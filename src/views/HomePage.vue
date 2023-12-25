<template>
  <div id='root'>
    <div id="backpic">
      <StartPageInfo :type="'main'" />
      <div id='title'>
        <span style="font-weight: bold; font-size: 40px; margin-right: 10px;">Xpertise</span>
        <span style="font-size: 20px;">Scholar</span>
      </div>
      <input id="searchinput" v-model='input' v-on:keyup.enter="submit" @mouseover="mouseOver()"
        @mouseleave="mouseLeave()">
      <el-icon class="el-icon-search" @click="submit()">
        <Search />
      </el-icon>
    </div>
    <div id='rankinglist'>
      <RankingList class='list' title="Recommend" type="citations" rout="1" />
      <RankingList class='list' title='Top Paper' type='citations' rout="2" />
      <RankingList class='list' title='Top Author' type='citations' rout="3" />
      <RankingList class='list' title='Top Affiliation' type='citations' rout="4" />
    </div>
    <div>
      <TotalPaperChart id='paper-chart'></TotalPaperChart>
    </div>
    <el-dialog v-model="dialogFormVisible" title="请选择您感兴趣的领域" destroy-on-close style="width: 80%; opacity: 0.85;">
      <div class="imgList">
        <div class="img-item" v-for="(item, index) in allimgData" :class="{ active: item.bOn }" :key="index"
          @click="checkImg(index)">
          <img :src="item.imgsrc" alt="">
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="changeDialog">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
  
<script>
import StartPageInfo from "../components/HomePage/StartPageInfo.vue";
import RankingList from "../components/HomePage/RankingList.vue";
import TotalPaperChart from "../components/HomePage/TotalPaperChart";
import gsap from "gsap";
export default {
  name: 'HomePage',
  props: [],
  components: {
    StartPageInfo,
    RankingList,
    TotalPaperChart
  },
  data() {
    return {
      input: '',
      dialogFormVisible: (this.$Cookies.get('commandId') == "[]" || this.$Cookies.get('commandId') == null) && this.$Cookies.get('user_info') != null,
      arr: [],
      allimgData: [
        {
          id: "https://openalex.org/C86803240",
          imgsrc: require("../assets/HomePage/Biology.jpg")
        },
        {
          id: "https://openalex.org/C71924100",
          imgsrc: require("../assets/HomePage/Medicine.jpg")
        },
        {
          id: "https://openalex.org/C185592680",
          imgsrc: require("../assets/HomePage/Chemistry.jpg")
        },
        {
          id: "https://openalex.org/C41008148",
          imgsrc: require("../assets/HomePage/Computer science.jpg")
        },
        {
          id: "https://openalex.org/C121332964",
          imgsrc: require("../assets/HomePage/Physics.jpg")
        },
        {
          id: "https://openalex.org/C126322002",
          imgsrc: require("../assets/HomePage/Internal medicine.jpg")
        },
        {
          id: "https://openalex.org/C55493867",
          imgsrc: require("../assets/HomePage/Biochemistry.jpg")
        },
        {
          id: "https://openalex.org/C33923547",
          imgsrc: require("../assets/HomePage/Mathematics.jpg")
        },
        {
          id: "https://openalex.org/C192562407",
          imgsrc: require("../assets/HomePage/Materials science.jpg")
        },
        {
          id: "https://openalex.org/C127413603",
          imgsrc: require("../assets/HomePage/Engineering.jpg")
        },
        {
          id: "https://openalex.org/C178790620",
          imgsrc: require("../assets/HomePage/Organic chemistry.jpg")
        },
        {
          id: "https://openalex.org/C104317684",
          imgsrc: require("../assets/HomePage/Gene.jpg")
        },
        {
          id: "https://openalex.org/C15744967",
          imgsrc: require("../assets/HomePage/Psychology.jpg")
        },
        {
          id: "https://openalex.org/C62520636",
          imgsrc: require("../assets/HomePage/Quantum mechanics.jpg")
        },
        {
          id: "https://openalex.org/C162324750",
          imgsrc: require("../assets/HomePage/Economics.jpg")
        },
        {
          id: "https://openalex.org/C142724271",
          imgsrc: require("../assets/HomePage/Pathology.jpg")
        },
        {
          id: "https://openalex.org/C154945302",
          imgsrc: require("../assets/HomePage/Artificial intelligence.jpg")
        },
      ],
    }
  },
  mounted() {
    this.allimgData.map(function (value) {
      value.bOn = false
    })
  },
  methods: {
    mouseOver() {
      gsap.to("#searchinput", { duration: 0.1, boxShadow: '0px 0px 20px 10px rgb(127,127,127,0.3)' })
    },
    mouseLeave() {
      gsap.to("#searchinput", { duration: 0.1, boxShadow: '0px 0px 8px 2px rgb(50,50,50,0.1)' })
    },
    submit() {
      if (this.input != '') {
        this.$router.push({ path: '/search-detail', query: { countrySearch: this.input } })
      }
    },
    checkImg(index) {
      this.allimgData[index].bOn = !this.allimgData[index].bOn
      if (this.allimgData[index].bOn) {
        let commandId = [{
          id: this.allimgData[index].id
        }]
        const commandIdString = this.$Cookies.get('commandId');
        if (commandIdString) {
          commandId = commandId.concat(JSON.parse(commandIdString))
        }
        let command = JSON.stringify(commandId);
        this.$Cookies.set('commandId', command);
      } else {
        const commandIdString = this.$Cookies.get('commandId');
        let commandId = JSON.parse(commandIdString)
        commandId = commandId.filter(item => item.id != this.allimgData[index].id)
        let command = JSON.stringify(commandId);
        this.$Cookies.set('commandId', command);
        console.log(this.$Cookies.get('commandIdNum'))
      }
    },
    changeDialog() {
      this.dialogFormVisible = false;
      window.location.reload();
      this.$Cookies.set('commandIdNum', 0);
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.$Cookies.set('commandId', "[]");
      this.$Cookies.set('commandIdNum', 0);
    }
  }
}
</script>
  
<style scoped>
#root {
  /* outline: #21ff06 dotted thick; */

  display: flex;
  flex-direction: column;
  align-items: center;
}


#title {
  margin-top: 100px;
}

#searchinput {
  /* outline: #21ff06 dotted thick; */

  border-radius: 30px;
  /* border: #cccccc solid thin; */
  border: 1px solid #f0f0f0;
  outline: none;
  width: 500px;
  height: 36px;
  box-shadow: 0px 0px 8px 2px rgba(50, 50, 50, 0.1);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  margin-top: 60px;
  text-indent: 10px;
}

.el-icon-search {
  color: rgba(127, 127, 127, 0.6);
  position: relative;
  top: -27px;
  left: 230px;

  cursor: pointer;
}

#backpic {
  /* outline: #21ff06 dotted thick; */

  border: #cccccc solid thin;
  border-radius: 300px;
  box-shadow: 0px 0px 50px 10px rgba(127, 127, 127, 0.3);

  background-image: url(../assets/startBack.png);
  background-size: 100% 100%;

  height: 500px;
  width: 1300px;
  margin-top: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
}

#rankinglist {
  /* outline: #21ff06 dotted thick; */

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  position: relative;
  top: -150px;
}

.list {
  margin: 25px;
}

#paper-chart {
  position: relative;
  top: -115px;
  /* border: #cccccc solid thin; */
  border-radius: 30px;
  box-shadow: inset 0px 0px 10px 6px rgb(50, 50, 50, 0.1);
  padding: 20px 40px 20px 40px;
}

.imgList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .active {
    display: block;
    width: 17%;
    height: 96px;
    line-height: 0;
    font-size: 0;
    vertical-align: middle;
    border: 3px solid #2b89fd;
    -webkit-transform: rotate(0deg);

  }

  .active::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    border: 12px solid #2b89fd;
    border-top-color: transparent;
    border-left-color: transparent;
  }

  .active::after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    position: absolute;
    right: 4px;
    bottom: 5px;
    border: 1px solid #fff;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg);
    cursor: pointer;
  }

  .img-item {
    width: 17%;
    height: 96px;
    overflow: hidden;
    background-color: #FFFFFF;
    margin: 15px;
    cursor: pointer;
    border-radius: 2.5%;

    img {
      width: 100%;
      height: 96px;
    }

  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
  