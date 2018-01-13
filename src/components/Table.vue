<template>
  <div class="container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th v-for="header in tableData.header" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody v-for="(data, index) in tableData.data" :key="data[index]">
        <tr>
          <td v-for="list in data" :key="list">{{ list }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Table',
  props: ['tableData']
}
</script>

<style scoped>
table,th,td {
  text-align: center;
}
</style>