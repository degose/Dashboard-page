<template>
  <div class="container">
    <h2 class="section-title">총 가입자 지표</h2>
    <data-chart :chart-data="this.isChartData"></data-chart>
    <data-table :table-data="this.isTableData"></data-table>
  </div>
</template>

<script>
import DataChart from './Chart'
import DataTable from './Table'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TotalSignedupStatus',
  components: {
    DataChart,
    DataTable
  },
  created () {
    this.a_getTotalData()
  },
  computed: {
    ...mapGetters(['isChartData', 'isTableData'])
  },
  methods: {
    ...mapActions(['a_getTotalData'])

  }
}
</script>

<style scoped>
</style>
