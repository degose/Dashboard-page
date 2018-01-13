import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.$store.watch(
      (state) => {
        return this.$store.getters.isChartData
      },
      (val) => {
        this.renderChart(this.data, this.options)
      }
      // {
      //   deep: true
      // }
    )
    this.renderChart(this.data, this.options)
  }
}
