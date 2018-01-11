import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
  // mounted () {
  //   this.renderChart({
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  //     datasets: [
  //       {
  //         label: 'a',
  //         backgroundColor: 'rgba(255, 0, 0, 0.3)',
  //         // backgroundColor: '#f87979',
  //         data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
  //       },
  //       {
  //         label: 'b',
  //         backgroundColor: 'rgba(0, 0, 0, 0.3)',
  //         data: [1, 2, 12, 60, 10, 60, 39, 80, 40, 20, 12, 11]
  //       }
  //     ]
  //   })
  // }
}
