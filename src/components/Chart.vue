<template>
  <div class="box">
    <h3 class="section-sub-title">{{ chartData.title }}</h3>
    <line-chart :data="this.chartData" :height="150"></line-chart>
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
}
</script>

<style scoped>
.section-sub-title {
  text-align: center;
  font-weight: 600;
}
</style>