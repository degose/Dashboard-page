<template>
  <div class="container">
    <h2 class="section-title">활성화 사용자 지표</h2>
    <data-chart :chart-data="isChartData"></data-chart>
    <active-user-filter :filter-data="isDAU" :filter-action="a_getActiveData"></active-user-filter>
    <data-table :table-data="isActiveTableData"></data-table>
    <data-table :table-data="isTableData"></data-table>
  </div>
</template>

<script>
import DataChart from './Chart'
import DataTable from './Table'
import ActiveUserFilter from './ActiveUserFilter'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActiveUserStatus',
  components: {
    DataChart,
    DataTable,
    ActiveUserFilter
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
    // this.$store.watch(
    //   (state) => {
    //     return this.$store.getters.isChartData
    //   },
    //   (val) => {
    //   },
    //   {
    //     deep: true
    //   }
    // )
  },
  computed: {
    ...mapGetters(['isActiveTableData', 'isChartData', 'isTableData', 'isDAU'])
  },
  methods: {
    ...mapActions(['a_getActiveData'])

  }

}
</script>

<style scoped>

</style>
