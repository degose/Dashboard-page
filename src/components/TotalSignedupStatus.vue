<template>
  <div class="container">
    <h2 class="section-title">총 가입자 지표</h2>
    <total-signedup-chart :chart-data="this.isChartData"></total-signedup-chart>
    <total-signedup-table :table-data="this.isTableData"></total-signedup-table>
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
