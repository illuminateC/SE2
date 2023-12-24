<template>
    <div id='wrapper4'>
  
      <div id="wrapper3">
  
      <div class="wrapper1">
        <el-icon><User /></el-icon>
  
         <div class="wrapper2">
           <div class="num">
             {{authors}}
           </div>
           <div class="title">
             authors
           </div>
         </div>
      </div>
  
      <div class="wrapper1">
        <el-icon><Document /></el-icon>
  
        <div class="wrapper2">
          <div class="num">
            {{papers}}
          </div>
          <div class="title">
            papers
          </div>
        </div>
      </div>
  
      <div class="wrapper1">
        <el-icon><OfficeBuilding /></el-icon>
  
        <div class="wrapper2">
          <div class="num">
            {{affiliation}}
          </div>
          <div class="title">
            affiliation
          </div>
        </div>
      </div>
  
      <div class="wrapper1">
        <el-icon><DataLine /></el-icon>
  
        <div class="wrapper2">
          <div class="num">
            {{venue}}
          </div>
          <div class="title">
            venue
          </div>
        </div>
      </div>
  
      <!-- <div class="wrapper1">
        <i class="el-icon-discover"></i>
  
        <div class="wrapper2">
          <div class="num">
            {{field}}
          </div>
          <div class="title">
            field
          </div>
        </div>
      </div> -->
  
      </div>
  
    </div>
  </template>
  
  <script>
  import axios from "axios";
    export default {
      props:['type'],
      name: 'StartPageInfo',
      data () {
        return {
            authors: 0,
            papers: 0,
            affiliation:0,
            venue: 0,
        }
      },
      mounted(){
        let that = this;
        axios({
                method: 'post',
                url: 'http://123.249.124.181/api/search/entity/num',
            })
                .then(function (res) {
                    that.authors = res.data.author_count;
                    that.papers = res.data.work_count;
                    that.affiliation = res.data.institutions_count;
                    that.venue = res.data.venues_count;
                })
                .catch(function (error) {
                    console.log(error);
                });
      }
    }
  </script>
  
  <style scoped>
  #wrapper4 {
    /* outline: #21ff06 dotted thick; */
    width: 1200px;
    height: 50px;
  
    display: flex;
    justify-content: center;
  
    background-color: rgba(255, 255, 255, 0.3);
  
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 30px 3px rgba(128, 128, 128, 0.2);
  }
  #root {
    /* height: 40px; */
    /* outline: #21ff06 dotted thick; */
    /* width: 1200px; */
  
  
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
  }
  #wrapper3 {
    /* outline: #21ff06 dotted thick; */
    width: 750px;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wrapper1 {
    display: flex;
    align-items: center;
  }
  .wrapper2 {
    display: flex;
    flex-direction: column;
    margin-left: 6px;
  }
  .title {
    font-size: 10px;
    position: relative;
    top: -1px;
  }
  .num {
    font-size: 17px;
    font-weight: 500;
  }
  i {
    font-size: 25px;
  }
  </style>
  