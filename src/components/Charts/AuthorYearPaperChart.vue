<template>
  <div
    id="author-year-paper-chart-container"
    style="width: 600px; height: 500px"
  ></div>
</template>

<script>
/**
 * Response Data Structure
 *
 * success: *response status <boolean>*,
 * data:
 * [
 *    {
 *      year: *year <int/str>*  // note: 都能处理
 *      published: *number of papers published in that year <int>*
 *      citation: *number of citations in that year <int>*
 *    }
 * ]
 */
import * as echarts from "echarts";
export default {
  name: "AuthorYearPaperChart",
  props: ["numOfYearCitation", "numOfYearPaper"],
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
    getMinYear(a, b) {
      if (a.from < b.from) return a.from;
      return b.from;
    },
    getMaxYear(a, b) {
      if (a.to > b.to) return a.to;
      return b.to;
    },
    getData() {
      var numOfYearCitation = this.$props.numOfYearCitation;
      var numOfYearPaper = this.$props.numOfYearPaper;
      var min_year = this.getMinYear(numOfYearCitation, numOfYearPaper);
      var max_year = this.getMaxYear(numOfYearCitation, numOfYearPaper);
      for (let i = min_year; i <= max_year; i++) {
        // console.log("citation of " + i.toString() + ": " + numOfYearCitation.list[i])
        this.option.xAxis[0].data.push(i.toString());
        if (numOfYearCitation.list[i - numOfYearCitation.from])
          this.option.series[0].data.push(numOfYearCitation.list[i - numOfYearCitation.from]);
        else this.option.series[0].data.push(0);
        if (numOfYearPaper.list[i - numOfYearPaper.from])
          this.option.series[1].data.push(numOfYearPaper.list[i - numOfYearPaper.from]);
        else this.option.series[1].data.push(0);
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
