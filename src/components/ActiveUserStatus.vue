<template>
  <div class="container">
    <h2 class="section-title">활성화 사용자 지표</h2>
    <!-- <bar-chart></bar-chart> -->
    <total-signedup-chart :chart-data="this.chartData"></total-signedup-chart>
    <active-user-filter :filter-data="this.isActiveChartData"></active-user-filter>
    <active-user-table :table-data="this.isActiveTableData"></active-user-table>
    <!-- <active-user-chart></active-user-chart> -->
  </div>
</template>

<script>
// import BarChart from './BarChart'
// import ActiveUserChart from './ActiveUserChart'
import TotalSignedupChart from './TotalSignedupChart'
import ActiveUserFilter from './ActiveUserFilter'
import ActiveUserTable from './ActiveUserTable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActiveUserStatus',
  components: {
    // BarChart,
    // ActiveUserChart,
    TotalSignedupChart,
    ActiveUserFilter,
    ActiveUserTable
  },
  data () {
    return {
      chartData: null
    }
  },
  created () {
    this.a_getActiveChartData()
    this.fetchChartData()
  },
  computed: {
    ...mapGetters(['isActiveChartData', 'isActiveTableData'])
  },
  methods: {
    ...mapActions(['a_getActiveChartData']),
    fetchChartData () {
      this.chartData = {
        labels: [...this.isActiveChartData.date],
        datasets: [
          {
            label: 'DAU',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            data: [...this.isActiveChartData.DAU]
          },
          {
            label: 'WAU',
            backgroundColor: 'rgba(255, 206, 86, 0.2',
            borderColor: 'rgba(255, 206, 86,1)',
            borderWidth: 1,
            data: [...this.isActiveChartData.WAU]
          },
          {
            label: 'MAU',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235,1)',
            borderWidth: 1,
            data: [...this.isActiveChartData.MAU]
          }
        ]
      }
    }
  }

}
</script>

<style scoped>

</style>
