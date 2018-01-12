<template>
  <div class="container">
    <h2 class="section-title">활성화 사용자 지표</h2>
    <total-signedup-chart :chart-data="this.isChartData"></total-signedup-chart>
    <active-user-filter :filter-data="this.isChartData"></active-user-filter>
    <active-user-table :table-data="isActiveTableData"></active-user-table>
    <total-signedup-table :table-data="this.isTableData"></total-signedup-table>
  </div>
</template>

<script>
import TotalSignedupChart from './TotalSignedupChart'
import TotalSignedupTable from './TotalSignedupTable'
import ActiveUserFilter from './ActiveUserFilter'
import ActiveUserTable from './ActiveUserTable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActiveUserStatus',
  components: {
    TotalSignedupChart,
    TotalSignedupTable,
    ActiveUserFilter,
    ActiveUserTable
  },
  data () {
    return {
      chartData: null
    }
  },
  created () {
    this.a_getActiveData()
    // this.fetchChartData()
    // console.log(this.isChartData)
  },
  computed: {
    ...mapGetters(['isActiveChartData', 'isActiveTableData', 'isChartData', 'isTableData'])
  },
  methods: {
    ...mapActions(['a_getActiveData'])
    // fetchChartData () {
    //   this.chartData = {
    //     labels: [...this.isActiveChartData.date],
    //     datasets: [
    //       {
    //         label: 'DAU',
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //         borderColor: 'rgba(255,99,132,1)',
    //         borderWidth: 1,
    //         data: [...this.isActiveChartData.DAU]
    //       },
    //       {
    //         label: 'WAU',
    //         backgroundColor: 'rgba(255, 206, 86, 0.2',
    //         borderColor: 'rgba(255, 206, 86,1)',
    //         borderWidth: 1,
    //         data: [...this.isActiveChartData.WAU]
    //       },
    //       {
    //         label: 'MAU',
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //         borderColor: 'rgba(54, 162, 235,1)',
    //         borderWidth: 1,
    //         data: [...this.isActiveChartData.MAU]
    //       }
    //     ]
    //   }
    // }
  }

}
</script>

<style scoped>

</style>
