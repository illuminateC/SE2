<template>
  <div>
    <div id="chartContainer" style="width: 600px; height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "RelatedPaperChart",
  props: ["data", "authorId"],
  data() {
    return {
      option: {
        title: {
          text: "合作作者",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>合作篇数 : {c} ({d}%)",
        },
        legend: {
          left: "right",
          top: "bottom",
          data: [],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "合作伙伴",
            type: "pie",
            radius: [20, 110],
            center: ["40%", "50%"],
            roseType: "radius",
            label: {
              show: false,
            },
            roam: true,
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.loadoption();
    let myChart = echarts.init(document.getElementById("chartContainer"));
    myChart.setOption(this.option);
    myChart.on("click", function (e) {
      if (e.data.url) {
        window.open(e.data.url);
      }
    });
  },
  methods: {
    loadoption() {
      var data = this.$props.data;
      var id = this.$props.authorId;
      var len = data.length < 10 ? data.length : 10;
      var i;
      for (i = 0; i < len; i++) {
        if (id == data[i].author2Id) {
          this.option.legend.data.push(data[i].author1Name);
          this.option.series[0].data.push({
            value: data[i].cooperationNum,
            name: data[i].author1Name,
            url: "/author/" + data[i].author1Id,
          });
        } else {
          this.option.legend.data.push(data[i].author2Name);
          this.option.series[0].data.push({
            value: data[i].cooperationNum,
            name: data[i].author2Name,
            url: "/author/" + data[i].author2Id,
          });
        }
      }
    },
  },
};
</script>
