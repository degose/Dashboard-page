<template>
  <div class="container">
    <h2 class="section-title">활성화 사용자 지표</h2>
    <total-signedup-chart :chart-data="this.isChartData"></total-signedup-chart>
    <active-user-filter :filter-data="this.isChartData" :filter-action="this.a_getActiveData"></active-user-filter>
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
  mounted () {
    this.$store.watch(
      (state) => {
        return this.$store.getters.isChartData
      },
      (val) => {
      },
      {
        deep: true
      }
    )
  },
  computed: {
    ...mapGetters(['isActiveTableData', 'isChartData', 'isTableData'])
  },
  methods: {
    ...mapActions(['a_getActiveData'])

  }

}
</script>

<style scoped>

</style>
