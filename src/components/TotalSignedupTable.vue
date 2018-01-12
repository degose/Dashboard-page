<template>
  <div class="container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th v-for="header in tableData.header">{{ header }}</th>
        </tr>
      </thead>
      <tbody v-for="data in tableData.data">
        <tr>
          <td v-for="list in data">{{ list }}</td>
          <!-- <td>{{ data.date }}</td>
          <td>{{ data.data1 }}</td>
          <td>{{ data.data2 }}</td>
          <td>{{ data.data3 }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'TotalSignedupTable',
  props: ['tableData']
}
</script>

<style scoped>
table,th,td {
  text-align: center;
}
</style>