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
      <RankingList class='list' title="Recommend" type="main"/>
      <RankingList class='list' title='Top Paper' type='main'/>
      <RankingList class='list' title='Top Author' type='main'/>
      <RankingList class='list' title='Top Affiliation' type='main'/>
    </div>
    <div>
      <TotalPaperChart id = 'paper-chart'></TotalPaperChart>
      <StaticRelationMap id = 'paper-chart'></StaticRelationMap>
    </div>
  </div>
</template>
  
<script>
import StartPageInfo from "../components/HomePage/StartPageInfo.vue";
import RankingList from "../components/HomePage/RankingList.vue";
import TotalPaperChart from "../components/HomePage/TotalPaperChart";
import StaticRelationMap from "../components/HomePage/StaticRelationMap";
import gsap from "gsap";
export default {
  name: 'HomePage',
  props: [],
  components: {
    StartPageInfo,
    RankingList,
    TotalPaperChart,
    StaticRelationMap
  },
  data() {
    return {
      input: '',
    }
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
}</style>
  