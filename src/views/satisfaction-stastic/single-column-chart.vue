<template>
  <div class="chart">
    <div
      id="charts"
      ref="charts"
    />
  </div>
</template>
<script>
// 引入echarts 插件
import echarts from 'echarts'
export default {
  mounted() {
    this.drawChart()
    this.init()
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    init() {
      // 图表自适应
      window.onresize = () => {
        echarts.init(this.$refs.charts).resize()
      }
    },
    drawChart() {
      let myChart = echarts.init(this.$refs.charts)
      console.log(myChart)
      let option = {
        xAxis: {
          type: 'category',
          data: ['2016', '2017', '2018', '2019', '2020']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1, 5, 2, 4, 3, 5, 5],
          type: 'bar'
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  position: fixed;
  width: 80%;
  height: 100%;
  background: #f3f3f3;
}
#charts {
  position: fixed;
  width: 80%;
  height: 90%;
  // top: 10%;
}
</style>

