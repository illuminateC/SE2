<template>
  <div
    id="author-year-paper-chart-container"
    style="width: 600px; height: 500px"
  ></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "AuthorYearPaperChart",
  props: ["InformationByYear"],
  data() {
    const colors = ["#5793f3", "#d14a61"];

    return {
      chartData: [],
      option: {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["Published", "Citations"],
        },
        xAxis: [
          {
            type: "category",
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Published",
            min: 0,
            position: "right",
            axisLine: {
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} 篇",
            },
          },
          {
            type: "value",
            name: "Citations",
            min: 0,
            position: "left",
            offset: 0,
            axisLine: {
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value} 篇次",
            },
          },
        ],
        series: [
          {
            name: "Published",
            type: "bar",
            data: [],
          },
          {
            name: "Citations",
            type: "bar",
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.getData();
    let myChart = echarts.init(
      document.getElementById("author-year-paper-chart-container")
    );
    myChart.setOption(this.option);
  },
  methods: {
    getData() {
      var InformationByYear = this.$props.InformationByYear;
      var len = InformationByYear.length;
      for (let i = 0; i < len; i++) {
        this.option.xAxis[0].data.push(InformationByYear[i].year.toString());
        this.option.series[0].data.push(InformationByYear[i].works_count.toString());
        this.option.series[1].data.push(InformationByYear[i].cited_by_count.toString());
      }
      this.option.yAxis[0].max =
        Math.ceil(Math.max(...this.option.series[0].data) / 10) * 10;
      this.option.yAxis[1].max =
        Math.ceil(Math.max(...this.option.series[1].data) / 100) * 100;
    },
    displayChart() {
      this.getData();
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },
  },
};
</script>
