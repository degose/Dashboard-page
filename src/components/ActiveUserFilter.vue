<template>
  <div class="box">
    <div class="level">
      <div class="level-item">
        <div class="field is-horizontal">
          <div class="field-body">
            <p class="control">
              <span class="filter-title">시작 날짜</span>
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" ref="input_start_date" :value="isFilterData.input_start_date" @change="() => {filterValue()}">
            </p>
            <p class="control">
              <span class="filter-title">종료 날짜</span>
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" ref="input_end_date" :value="isFilterData.input_end_date" @change="() => {filterValue()}">
            </p>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select ref="select_user" :value="isFilterData.select_user" @change="(e) => {filterValue('user')}">
            <option disabled value="">User</option>
            <option>Parent</option>
            <option>Student</option>
            <option>Teacher</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <div class="select">
          <select ref="select_country" :value="isFilterData.select_country" @change="() => {filterValue('country')}">
            <option disabled value="">Country</option>
            <option>Korea</option>
            <option>Japan</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <button class="button" @click="() => {this.$store.dispatch('a_getActiveData')}">초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActiveUserFilter',
  created () {
    this.startMonth = this.isDAU[0].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
    this.endMonth = this.isDAU[this.isDAU.length - 1].key.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
  },
  computed: {
    ...mapGetters(['isDAU', 'isFilterData'])
  },
  methods: {
    ...mapActions(['a_changeData', 'a_FilterData', 'a_getActiveData']),
    filterValue (payload) {
      this.a_FilterData({
        input_start_date: this.$refs.input_start_date.value,
        input_end_date: this.$refs.input_end_date.value,
        select_user: this.$refs.select_user.value,
        select_country: this.$refs.select_country.value
      })
      this.a_changeData(payload)
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