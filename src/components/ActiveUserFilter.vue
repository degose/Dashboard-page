<template>
  <div class="box">
    <div class="level">
      <div class="level-item">
        <div class="field is-horizontal">
          <!-- <div class="field-label is-normal">
            <label class="label">From</label>
          </div> -->
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08">
              </p>
            </div>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08">
            </p>
          </div>
        </div>
        <!-- <div class="">
          <form action="">
            <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08">
            <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08">
          </form>
        </div> -->
        <!-- <div class="select">
          <select>
            <option selected>Date</option>
            <option v-for="labels in filterData.labels">{{ labels }}</option>
          </select>
        </div> -->
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
  props: ['filterData'],
  data () {
    return {
      selected: ''
    }
  },
  created () {
    // console.log('select', this.selected)
  }
}
</script>

<style scoped>

</style>