<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.section-title {
  font-size: 1.2rem;
  padding: 20px 0;
}

.section-sub-title {
  /* text-align: center; */
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
