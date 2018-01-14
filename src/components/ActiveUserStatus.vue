<template>
  <div class="container">
    <h2 class="section-title">활성화 사용자 지표</h2>
    <data-chart :chart-data="isChartData"></data-chart>
    <active-user-filter></active-user-filter>
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
  created () {
    this.a_getActiveData()
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
