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
              <input class="input" type="date" name="bday" :min="startMonth" :max="endMonth" 
              ref="input_end_date" :value="isFilterData.input_end_date" @change="() => {filterValue()}">
            </p>
          </div>
        </div>
      </div>
      <div class="level-item">
        <button class="button" @click="() => {this.$store.dispatch('a_getTotalData')}">초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TotalSignedupFilter',
  created () {
    this.startMonth = this.isUserSignedup[0].key_as_string
    this.endMonth = this.isUserSignedup[this.isUserSignedup.length - 1].key_as_string
  },
  computed: {
    ...mapGetters(['isUserSignedup', 'isFilterData'])
  },
  methods: {
    ...mapActions(['a_changeTotalData', 'a_getTotalData', 'a_FilterData']),
    filterValue () {
      this.a_FilterData({
        input_start_date: this.$refs.input_start_date.value,
        input_end_date: this.$refs.input_end_date.value
      })
      this.a_changeTotalData()
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