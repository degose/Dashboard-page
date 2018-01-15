<template>
  <div class="box">
    <div class="level">
      <div class="level-item">
        <div class="field is-horizontal">
          <div class="field-body">
            <p class="control">
              <span class="filter-title">시작 날짜</span>
              <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08" v-model="filterData.input_start_date" @change="() => {filterValue()}">
            </p>
            <p class="control">
              <span class="filter-title">종료 날짜</span>
              <input class="input" type="date" name="bday" min="2017-05-09" max="2017-06-08" v-model="filterData.input_end_date" @change="() => {filterValue()}">
            </p>
          </div>
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
  name: 'TotalSignedupFilter',
  data () {
    return {
      filterData: {
        input_start_date: '',
        input_end_date: '',
        startMonth: '2017-05-09',
        endMonth: '2017-06-08'
      }
    }
  },
  created () {
  },
  computed: {
    ...mapGetters(['isUserSignedup'])
  },
  methods: {
    ...mapActions(['a_changeTotalData', 'a_NotiMessage', 'a_getTotalData']),
    filterValue (payload) {
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
        if (this.filterData.input_start_date < this.isUserSignedup[0].key_as_string || this.filterData.input_start_date > this.isUserSignedup[this.isUserSignedup.length - 1].key_as_string) {
          this.$store.dispatch('a_NotiMessage', '해당 날짜는 데이터가 없습니다.')
          this.filterData.input_start_date = ''
        }
      }
      if (this.filterData.input_end_date !== '') {
        if (this.filterData.input_end_date < this.isUserSignedup[0].key_as_string || this.filterData.input_end_date > this.isUserSignedup[this.isUserSignedup.length - 1].key_as_string) {
          this.$store.dispatch('a_NotiMessage', '해당 날짜는 데이터가 없습니다.')
          this.filterData.input_end_date = ''
        }
      }
      this.a_changeTotalData(this.filterData)
    },
    reStart () {
      // filter 값 초기화
      this.filterData.input_start_date = ''
      this.filterData.input_end_date = ''
      this.a_getTotalData()
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