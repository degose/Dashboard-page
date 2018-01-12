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
                <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08" v-model="input_start_date" @change="(event) => {filterValue(event)}">
              </p>
            </div>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08" v-model="input_end_date" @change="(event) => {filterValue(event)}">
            </p>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select v-model="select_user" @change="(event) => {filterValue(event)}">
            <option disabled value="">User</option>
            <option>Parent</option>
            <option>Student</option>
            <option>Teacher</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select v-model="select_country" @change="(event) => {filterValue(event)}">
            <option disabled value="">Country</option>
            <option>Korea</option>
            <option>Japan</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <button class="button" @click="() => {this.a_getActiveData}">초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ActiveUserFilter',
  components: {
  },
  props: ['filterData', 'a_getActiveData'],
  data () {
    return {
      selected: '',
      input_start_date: '',
      input_end_date: '',
      select_user: '',
      select_country: ''
    }
  },
  created () {
    // console.log('select', this.input_end_date)
  },
  methods: {
    ...mapActions(['a_changeData']),
    filterValue (e) {
      // console.log(this.input_start_date)
      // console.log(this.input_end_date)
      // console.log(this.select_user)
      // console.log(this.select_country)

      this.a_changeData({
        input_start_date: this.input_start_date,
        input_end_date: this.input_end_date,
        select_user: this.select_user,
        select_country: this.select_country
      })
    }
  }
}
</script>

<style scoped>
/* input {
  padding: 0 10px;
} */
</style>