<template>
  <div class="container" v-if="isNotiMessage">
    <div class="bg-noti">
      <p>{{ isNotiMessage }}</p>
      <button class="button" @click="() => {this.$store.dispatch('a_NotiMessage', '')}">확인</button>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Notification',
  components: {
  },
  computed: {
    ...mapGetters(['isNotiMessage'])
  },
  methods: {
    ...mapActions(['a_NotiMessage'])
  }
}
</script>

<style scoped>
.bg-noti {
  position: fixed;
  background: #eee;
  width: 500px;
  height: 110px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  top: 10%;
  padding: 20px;
  border-radius: 5px;
}

.button {
  margin-top: 10px;
}
</style>
