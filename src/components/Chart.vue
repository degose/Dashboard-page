<template>
  <div class="box">
    <h3 class="section-sub-title">{{ chartData.title }}</h3>
    <line-chart :data="this.chartData"></line-chart>
    <!-- <bar-chart :data="this.chartData"></bar-chart> -->
    <!-- <line-chart :options="{responsive: false, maintainAspectRatio: false}"
  :width="400"
  :height="200"></line-chart> -->
  </div>
</template>

<script>
import LineChart from '../charts/Line.js'

export default {
  name: 'Chart',
  components: {
    LineChart
  },
  props: ['chartData']
  // mounted () {
  //   this.$store.watch(
  //     (state) => {
  //       return this.$store.getters.isChartData
  //     },
  //     (val) => {
  //     },
  //     {
  //       deep: true
  //     }
  //   )
  // }
}
</script>

<style scoped>
.section-sub-title {
  text-align: center;
  font-weight: 600;
}
</style>