<template>
  <div class="box">
    <div class="level">
      <div class="level-item">
        <div class="select">
          <select>
            <option selected>Date</option>
            <option v-for="date in filterData.date">{{ date }}</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select>
            <option selected>User</option>
            <option>Parent</option>
            <option>Student</option>
            <option>Teacher</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select>
            <option selected>Country</option>
            <option>Korea</option>
            <option>Japan</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ActiveUserFilter',
  components: {
  },
  props: ['filterData']
}
</script>

<style scoped>

</style>