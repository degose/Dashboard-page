<template>
  <div class="box">
    <div class="level">
      <div class="level-item">
        <div class="field is-horizontal">
          <div class="field-body">
            <p class="control">
              <span class="filter-title">시작 날짜</span>
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" ref="input_start_date" :value="this.isFilterData.input_start_date" @change="() => {filterValue()}">
            </p>
            <p class="control">
              <span class="filter-title">종료 날짜</span>
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" ref="input_end_date" :value="this.isFilterData.input_end_date" @change="() => {filterValue()}">
            </p>
          </div>
        </div>
      </div>
      <div class="level-item" v-if="this.select">
        <div class="select">
          <select ref="select_user" :value="this.isFilterData.select_user" @change="(e) => {filterValue('user')}">
            <option disabled value="">User</option>
            <option>Parent</option>
            <option>Student</option>
            <option>Teacher</option>
          </select>
        </div>
      </div>
      <div class="level-item" v-if="this.select">
        <div class="select">
          <select ref="select_country" :value="this.isFilterData.select_country" @change="() => {filterValue('country')}">
            <option disabled value="">Country</option>
            <option>Korea</option>
            <option>Japan</option>
          </select>
        </div>
      </div>
      <div class="level-item">
        <button class="button" @click="() => {this.AgetData()}">초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataFilter',
  props: ['startMonth', 'endMonth', 'isFilterData', 'AchangeData', 'AFilterData', 'select', 'AgetData'],
  methods: {
    filterValue (payload) {
      if (this.select) {
        this.AFilterData({
          input_start_date: this.$refs.input_start_date.value,
          input_end_date: this.$refs.input_end_date.value,
          select_user: this.$refs.select_user.value,
          select_country: this.$refs.select_country.value
        })
      } else {
        this.AFilterData({
          input_start_date: this.$refs.input_start_date.value,
          input_end_date: this.$refs.input_end_date.value
        })
      }
      this.AchangeData(payload)
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