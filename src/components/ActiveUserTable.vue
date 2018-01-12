<template>
  <div class="container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>기준</th>
          <th>최대</th>
          <th>최소</th>
          <th>평균</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableData">
          <td>{{ data.name }}</td>
          <td>{{ data.max }}</td>
          <td>{{ data.min }}</td>
          <td>{{ data.avg }}</td>
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