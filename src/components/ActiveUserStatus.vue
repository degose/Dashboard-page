<template>
  <div class="container">
    <h2 class="section-title">활성화 사용자 지표</h2>
    <data-chart :chart-data="isChartData"></data-chart>
    <data-filter 
      :startMonth="isDAU[0].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')" :endMonth="isDAU[this.isDAU.length - 1].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')" 
      :isFilterData="isFilterData" 
      :AchangeData="a_changeData" 
      :AFilterData="a_FilterData"
      :AgetData="a_getActiveData"
      :select="true"
    ></data-filter>
    <data-table :table-data="isActiveTableData"></data-table>
    <data-table :table-data="isTableData"></data-table>
  </div>
</template>

<script>
import DataChart from './Chart'
import DataTable from './Table'
import DataFilter from './Filter'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActiveUserStatus',
  components: {
    DataChart,
    DataTable,
    DataFilter
  },
  created () {
    this.a_getActiveData()
  },
  computed: {
    ...mapGetters(['isActiveTableData', 'isChartData', 'isTableData', 'isDAU', 'isFilterData'])
  },
  methods: {
    ...mapActions(['a_getActiveData', 'a_changeData', 'a_FilterData'])
  }

}
</script>

<style scoped>

</style>
