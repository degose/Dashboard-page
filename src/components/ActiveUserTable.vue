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
          <td>{{ data.date }}</td>
          <td>{{ data.DAU }}</td>
          <td>{{ data.WAU }}</td>
          <td>{{ data.MAU }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'ActiveUserTable',
  props: ['tableData']
}
</script>

<style scoped>
table,th,td {
  text-align: center;
}
</style>