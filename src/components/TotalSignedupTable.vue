<template>
  <div class="container">
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>날짜</th>
          <th>가입자</th>
          <th>탈퇴자</th>
          <th>총 가입자</th>
        </tr>
      </thead>
      <tbody v-for="data in tableData">
        <tr>
          <td>{{ data.date }}</td>
          <td>{{ data.UserSignedupCount }}</td>
          <td>{{ data.UserDeletedCount }}</td>
          <td>{{ data.TotalUserCount }}</td>
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