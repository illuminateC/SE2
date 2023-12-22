<template>
  <div>
    <div id="AuthorRelationMap" style="width: 600px; height: 500px"></div>
  </div>
</template>

<script>

// relationMapLinks: [{
//   source: "1",
//   sourceName: "Nishikigi Chisato",
//   target: "6",
//   targetName: "Dingzhen",
//   cooperationNum: 3,
//   value: 3
// },{
//   source: "1",
//   sourceName: "Nishikigi Chisato",
//   target: "4",
//   targetName: "Mocha",
//   cooperationNum: 1,
//   value: 1
// }],

// relationMapNodes: [{
//   name: "Nishikigi Chisato",
//   id: 1,
//   symbolSize: 30,
//   value: 4,
// },{
//   name: "Dingzhen",
//   id: 6,
//   symbolSize: 10,
//   value: 3,
// },{
//   name: "Mocha",
//   id: 4,
//   symbolSize: 5,
//   value: 1,
// }],

import * as echarts from "echarts";
export default {
  name: "AuthorRelationMap",
  props: ["nodes", "links"],
  data() {
    return {
      url: [],
      option: {
        title: {
          text: "作者合作关系图",
          top: "top",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (params.data.source || params.data.target) {
              return (
                params.data.sourceName +
                "与" +
                params.data.targetName +
                "</br>" +
                "合作文献数量: " +
                params.data.value
              );
            } else {
              return (
                params.data.name + "</br>" + "h-index: " + params.data.value
              );
            }
          },
        },
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "作者合作关系图",
            type: "graph",
            layout: "force",
            data: [],
            links: [],
            roam: true,
            focusNodeAdjacency: true,
            // symbolSize: (value, params) => {
            //   return value * 3 + 1;
            // },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
            label: {
              show: false,
              position: "right",
              formatter: "",
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
            emphasis: {
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.loadoption();
    let myChart = echarts.init(
      document.getElementById("AuthorRelationMap")
    );
    myChart.setOption(this.option);
    myChart.on("click", function (e) {
      if (e.data.id) {
        window.open("/author/" + e.data.id);
      }
    });
  },
  methods: {
    loadoption() {
      this.option.series[0].data = this.$props.nodes;
      this.option.series[0].links = this.$props.links;

      // Console.log
      // for (let i = 0 ; i < len ; i++){ console.log("relation map's nodes:" + this.option.series[0].data[i].name + ", " + this.option.series[0].data[i].id); }
      // len = this.option.series[0].links.length;
      // for (let i = 0 ; i < len ; i++){ console.log("relation map's links:" + this.option.series[0].links[i].source + " to " + this.option.series[0].links[i].target); }
    },
  },
};
</script>
