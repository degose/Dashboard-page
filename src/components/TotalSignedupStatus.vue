<template>
  <div class="container">
    <h2 class="section-title">총 가입자 지표</h2>
    <data-chart :chart-data="this.isChartData"></data-chart>
    <data-filter 
      :startMonth="this.isUserSignedup[0].key_as_string" 
      :endMonth="this.isUserSignedup[this.isUserSignedup.length - 1].key_as_string" 
      :isFilterData="isFilterData" 
      :AchangeData="a_changeTotalData" 
      :AFilterData="a_FilterData"
      :AgetData="a_getTotalData"
    ></data-filter>
    <data-table :table-data="this.isTableData"></data-table>
  </div>
</template>

<script>
import DataChart from './Chart'
import DataTable from './Table'
import DataFilter from './Filter'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TotalSignedupStatus',
  components: {
    DataChart,
    DataTable,
    DataFilter
  },
  created () {
    this.a_getTotalData()
  },
  computed: {
    ...mapGetters(['isChartData', 'isTableData', 'isUserSignedup', 'isFilterData'])
  },
  methods: {
    ...mapActions(['a_getTotalData', 'a_changeTotalData', 'a_FilterData'])

  }
}
</script>

<style scoped>
</style>
