<template>
  <div class="box">
    <div class="level">
      <div class="level-item">
        <div class="field is-horizontal">
          <div class="field-body">
            <p class="control">
              <span class="filter-title">시작 날짜</span>
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" v-model="filterData.input_start_date" @change="() => {filterValue()}">
            </p>
            <p class="control">
              <span class="filter-title">종료 날짜</span>
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" v-model="filterData.input_end_date" @change="() => {filterValue()}">
            </p>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select v-model="filterData.select_user" @change="(e) => {filterValue('user')}">
            <option disabled value="">User</option>
            <option>Parent</option>
            <option>Student</option>
            <option>Teacher</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select v-model="filterData.select_country" @change="() => {filterValue('country')}">
            <option disabled value="">Country</option>
            <option>Korea</option>
            <option>Japan</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <button class="button" @click="() => {reStart()}">초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActiveUserFilter',
  data () {
    return {
      filterData: {
        input_start_date: '',
        input_end_date: '',
        select_user: '',
        select_country: '',
        startMonth: '',
        endMonth: ''
      }
    }
  },
  created () {
    this.startMonth = this.isDAU[0].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
    this.endMonth = this.isDAU[this.isDAU.length - 1].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
  },
  computed: {
    ...mapGetters(['isDAU'])
  },
  methods: {
    ...mapActions(['a_changeData', 'a_NotiMessage', 'a_getActiveData']),
    filterValue (payload) {
      // user, country 중 하나만 선택하게 설정
      if (payload === 'user') {
        this.filterData.select_country = ''
      } else if (payload === 'country') {
        this.filterData.select_user = ''
      }
      // 시작 날짜와 종료 날짜 안내 메세지
      if (this.filterData.input_end_date !== '' && this.filterData.input_start_date > this.filterData.input_end_date) {
        this.$store.dispatch('a_NotiMessage', '시작 날짜가 종료 날짜보다 큽니다.')
        this.filterData.input_end_date = ''
      } else if (this.filterData.input_end_date !== '' && this.filterData.input_start_date === this.filterData.input_end_date) {
        this.$store.dispatch('a_NotiMessage', '시작 날짜와 종료 날짜가 같습니다.')
        this.filterData.input_end_date = ''
      }
      // 날짜 직접 입력 시 data에 없는 날짜를 선택한 경우
      if (this.filterData.input_start_date !== '') {
        if (this.filterData.input_start_date.split('-').join('') < this.isDAU[0].key || this.filterData.input_start_date.split('-').join('') > this.isDAU[this.isDAU.length - 1].key) {
          this.$store.dispatch('a_NotiMessage', '해당 날짜는 데이터가 없습니다.')
          this.filterData.input_start_date = ''
        }
      }
      if (this.filterData.input_end_date !== '') {
        if (this.filterData.input_end_date.split('-').join('') < this.isDAU[0].key || this.filterData.input_end_date.split('-').join('') > this.isDAU[this.isDAU.length - 1].key) {
          this.$store.dispatch('a_NotiMessage', '해당 날짜는 데이터가 없습니다.')
          this.filterData.input_end_date = ''
        }
      }
      this.a_changeData(this.filterData)
    },
    reStart () {
      // filter 값 초기화
      this.filterData.input_start_date = ''
      this.filterData.input_end_date = ''
      this.filterData.select_user = ''
      this.filterData.select_country = ''
      this.a_getActiveData()
    }
  }
}
</script>

<style scoped>
.filter-title {
  font-size: 0.9rem;
}

.control {
  margin-right: 10px;
}
.select, button {
  margin-top: 21px;
}
</style>