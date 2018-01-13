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
                <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" v-model="input_start_date" @change="(event) => {filterValue(event)}">
              </p>
            </div>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" v-model="input_end_date" @change="(event) => {filterValue(event)}">
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
      input_start_date: '',
      input_end_date: '',
      select_user: '',
      select_country: '',
      startMonth: '',
      endMonth: ''
    }
  },
  mounted () {
    this.startMonth = this.filterData[0].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
    this.endMonth = this.filterData[this.filterData.length - 1].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
  },
  methods: {
    ...mapActions(['a_changeData']),
    filterValue (e) {
      if (this.input_end_date !== '' && this.input_start_date > this.input_end_date) {
        alert('시작 날짜가 종료 날짜보다 큽니다.')
        this.input_end_date = ''
      } else if (this.input_end_date !== '' && this.input_start_date === this.input_end_date) {
        alert('시작 날짜와 종료 날짜가 같습니다.')
        this.input_end_date = ''
      }
      if (this.input_start_date !== '') {
        if (this.input_start_date.split('-').join('') < this.filterData[0].key || this.input_start_date.split('-').join('') > this.filterData[this.filterData.length - 1].key) {
          alert('해당 날짜는 데이터가 없습니다.')
          this.input_start_date = ''
        }
      }
      if (this.input_end_date !== '') {
        if (this.input_end_date.split('-').join('') < this.filterData[0].key || this.input_end_date.split('-').join('') > this.filterData[this.filterData.length - 1].key) {
          alert('해당 날짜는 데이터가 없습니다.')
          this.input_end_date = ''
        }
      }
      if (this.select_user !== '') {
        this.select_country = ''
      } else if (this.select_country !== '') {
        this.select_user = ''
      }

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