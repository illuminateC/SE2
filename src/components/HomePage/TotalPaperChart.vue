<template>
  <div>
    <div id="chartContainer" style="width: 900px;height: 600px"></div>
  </div>
</template>
  
<script>
import * as echarts from 'echarts'
import axios from "axios";
import 'echarts-gl'
export default {
  name: "TotalPaperChart",
  data() {
    let years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    let confs = ['French National Centre for Scientific Research', 'University of Michigan–Ann Arbor', 'Chinese Academy of Science',
      'Harvard University', 'International Commission on Missing Persons', 'University of Toronto',
      'University College London', 'University of Washington', 'The University of Tokyo',
      'Stanford University', 'Inserm', 'Johns Hopkins University',
      'Cornell University', 'University of Oxford', 'University of California, Berkeley']
    let data = [[0, 11, 48351], [0, 10, 55646], [0, 9, 57583], [0, 8, 53977], [0, 7, 49206], [0, 6, 46812], [0, 5, 44871], [0, 4, 44003], [0, 3, 40395], [0, 2, 38783], [0, 1, 37217], [0, 0, 35865], [1, 11, 17012], [1, 10, 45276], [1, 9, 19393], [1, 8, 20440], [1, 7, 18295], [1, 6, 17484], [1, 5, 16816], [1, 4, 15819], [1, 3, 14756], [1, 2, 14124], [1, 1, 13928], [1, 0, 12615], [2, 11, 62234], [2, 10, 62076], [2, 9, 55417], [2, 8, 49556], [2, 7, 45996], [2, 6, 41709], [2, 5, 37587], [2, 4, 36301], [2, 3, 34187], [2, 2, 31989], [2, 1, 29307], [2, 0, 26561], [3, 11, 29619], [3, 10, 31163], [3, 9, 33147], [3, 8, 32543], [3, 7, 28050], [3, 6, 26087], [3, 5, 25007], [3, 4, 23408], [3, 3, 21171], [3, 2, 20430], [3, 1, 19079], [3, 0, 17784], [4, 11, 610], [4, 10, 1753], [4, 9, 19410], [4, 8, 23165], [4, 7, 23518], [4, 6, 25299], [4, 5, 25969], [4, 4, 26689], [4, 3, 27874], [4, 2, 28070], [4, 1, 30524], [4, 0, 30685], [5, 11, 21733], [5, 10, 22424], [5, 9, 24170], [5, 8, 23188], [5, 7, 20715], [5, 6, 19387], [5, 5, 19106], [5, 4, 20775], [5, 3, 16241], [5, 2, 15520], [5, 1, 14853], [5, 0, 13660], [6, 11, 21527], [6, 10, 23082], [6, 9, 25043], [6, 8, 23311], [6, 7, 20723], [6, 6, 19398], [6, 5, 18257], [6, 4, 17604], [6, 3, 16036], [6, 2, 14739], [6, 1, 14133], [6, 0, 12321], [7, 11, 15859], [7, 10, 16854], [7, 9, 18405], [7, 8, 55047], [7, 7, 16271], [7, 6, 18138], [7, 5, 14250], [7, 4, 14123], [7, 3, 13108], [7, 2, 12546], [7, 1, 12550], [7, 0, 11067], [8, 11, 14360], [8, 10, 15077], [8, 9, 15694], [8, 8, 15655], [8, 7, 14475], [8, 6, 13818], [8, 5, 13365], [8, 4, 13060], [8, 3, 12791], [8, 2, 13319], [8, 1, 12354], [8, 0, 11830], [9, 11, 17416], [9, 10, 19208], [9, 9, 21068], [9, 8, 21236], [9, 7, 18448], [9, 6, 17195], [9, 5, 16381], [9, 4, 15405], [9, 3, 14163], [9, 2, 13530], [9, 1, 12703], [9, 0, 11321], [10, 11, 20941], [10, 10, 22672], [10, 9, 23776], [10, 8, 22024], [10, 7, 19531], [10, 6, 18347], [10, 5, 17397], [10, 4, 16653], [10, 3, 15275], [10, 2, 14204], [10, 1, 13400], [10, 0, 12156], [11, 11, 17586], [11, 10, 23285], [11, 9, 19840], [11, 8, 19925], [11, 7, 17696], [11, 6, 16541], [11, 5, 15560], [11, 4, 14332], [11, 3, 13906], [11, 2, 12796], [11, 1, 12012], [11, 0, 11002], [12, 11, 14652], [12, 10, 15364], [12, 9, 16381], [12, 8, 16156], [12, 7, 14157], [12, 6, 13481], [12, 5, 12555], [12, 4, 11761], [12, 3, 11091], [12, 2, 10586], [12, 1, 10025], [12, 0, 9364], [13, 11, 18425], [13, 10, 19767], [13, 9, 22306], [13, 8, 21108], [13, 7, 18350], [13, 6, 17074], [13, 5, 16164], [13, 4, 15175], [13, 3, 14027], [13, 2, 13024], [13, 1, 12216], [13, 0, 11066], [14, 11, 9809], [14, 10, 10409], [14, 9, 12498], [14, 8, 12211], [14, 7, 12219], [14, 6, 10833], [14, 5, 10393], [14, 4, 10169], [14, 3, 10150], [14, 2, 9762], [14, 1, 9026], [14, 0, 8982]]
    return {
      getresult: [],
      option: {
        title: {
          text: 'Top15 机构历年文献统计表',
          left: 'center',
          top: 20,
          padding: 10,
          color: '#000',
          borderRadius: 50,
          backgroundColor: '#ffffff',
          shadowBlur: 10,
          shadowColor: '#b3b3b3',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let seriesdata = [];
            if (params.value[1] == 0) seriesdata.push(confs[0]);
            else if (params.value[1] == 1) seriesdata.push(confs[1]);
            else if (params.value[1] == 2) seriesdata.push(confs[2]);
            else if (params.value[1] == 3) seriesdata.push(confs[3]);
            else if (params.value[1] == 4) seriesdata.push(confs[4]);
            else if (params.value[1] == 5) seriesdata.push(confs[5]);
            else if (params.value[1] == 6) seriesdata.push(confs[6]);
            else if (params.value[1] == 7) seriesdata.push(confs[7]);
            else if (params.value[1] == 8) seriesdata.push(confs[8]);
            else if (params.value[1] == 9) seriesdata.push(confs[9]);
            else if (params.value[1] == 10) seriesdata.push(confs[10]);
            else if (params.value[1] == 11) seriesdata.push(confs[11]);
            else if (params.value[1] == 12) seriesdata.push(confs[12]);
            else if (params.value[1] == 13) seriesdata.push(confs[13]);
            else if (params.value[1] == 14) seriesdata.push(confs[14]);
            seriesdata.push((params.value[0] + 2012) + "年");
            seriesdata.push(params.value[2] + " papers");
            var tooltipHtml = '<div class="tooltip">' + seriesdata[0] + '</div>';
            tooltipHtml += '<div class="tooltip-label">' + seriesdata[1] + '</div>';
            tooltipHtml += '<div class="tooltip-value">' + seriesdata[2] + '</div>';
            return tooltipHtml;
          }
        },
        visualMap: {
          max: 65000,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {
          type: 'category',
          name: 'Year',
          nameGap: 40,
          data: years,
          axisLabel: {
            margin: 15,
            interval: 0
          }
        },
        yAxis3D: {
          type: 'category',
          name: 'Affiliation',
          nameGap: 100,
          data: confs,
          axisLabel: {
            interval: 0
          }
        },
        zAxis3D: {
          type: 'value',
          name: 'Papers',
          nameGap: 30
        },
        grid3D: {
          boxWidth: 180,
          boxDepth: 350,
          boxHeight: 150,
          viewControl: {
            beta: 30,
            distance: 500
          }
        },
        series: [{
          type: 'bar3D',
          data: data.map(function (item) {
            return {
              value: [item[1], item[0], item[2]],
            }
          }),
          shading: 'color',
          barSize: 4,
          itemStyle: {
            opacity: 0.9
          },
          label: {
            textStyle: {
              fontSize: 16,
              borderWidth: 1
            }
          },
          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#900'
              }
            },
            itemStyle: {
              color: '#900'
            }
          }
        }]
      }
    }
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('chartContainer'));
    myChart.setOption(this.option)
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
  methods: {
  }
}
</script>
  
<style scoped>
.tooltip {
  background-color: #FFF;
  border: 1px solid #CCC;
  padding: 10px;
  font-size: 14px;
}

.tooltip-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.tooltip-value {
  color: #666;
}
</style>
  