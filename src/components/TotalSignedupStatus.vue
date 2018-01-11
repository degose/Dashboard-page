<template>
  <div class="container">
    <h2 class="section-title">총 가입자 지표</h2>
    <total-signedup-chart :chart-data="this.chartData"></total-signedup-chart>
    <total-signedup-table :table-data="this.isTotalTableData"></total-signedup-table>
  </div>
</template>

<script>
import TotalSignedupChart from './TotalSignedupChart'
import TotalSignedupTable from './TotalSignedupTable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TotalSignedupStatus',
  components: {
    TotalSignedupChart,
    TotalSignedupTable
  },
  data () {
    return {
      chartData: null
    }
  },
  created () {
    this.a_getTotalChartData()
    this.fetchChartData()
  },
  computed: {
    ...mapGetters(['isTotalChartData', 'isTotalTableData'])
  },
  methods: {
    ...mapActions(['a_getTotalChartData']),
    fetchChartData () {
      this.chartData = {
        labels: [...this.isTotalChartData.date],
        datasets: [
          {
            label: '탈퇴자',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            data: [...this.isTotalChartData.UserDeletedCount]
          },
          {
            label: '가입자',
            backgroundColor: 'rgba(255, 206, 86, 0.2',
            borderColor: 'rgba(255, 206, 86,1)',
            borderWidth: 1,
            data: [...this.isTotalChartData.UserSignedupCount]
          },
          {
            label: '총 가입자',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235,1)',
            borderWidth: 1,
            data: [...this.isTotalChartData.TotalUserCount]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
