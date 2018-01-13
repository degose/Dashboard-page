<template>
  <div class="home">
    <header>
      <nav class="level navbar is-dark nav-control">
        <div class="level-left">
          <div class="level-item">
            <a href="/">
              <h1 class="header-title">
                Dashboard
              </h1>
            </a>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="tabs is-toggle">
              <ul>
                <li ref="tab_total" autofocus active-class="is-active" exact>
                  <a class="tab-list" @click="(event) => {tabToggle(event)}">총 가입자 지표</a>
                </li>
                <li ref="tab_active">
                  <a class="tab-list" @click="(event) => {tabToggle(event)}">활성 사용자 지표</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <section class="main-container">
      <router-view></router-view>
    </section>
    <notification></notification>

  </div>
</template>

<script>
import TotalSignedupStatus from './TotalSignedupStatus'
import Notification from './Notification'

export default {
  name: 'Home',
  components: {
    TotalSignedupStatus,
    Notification
  },
  mounted () {
    if (this.$route.path === '/' || this.$route.path === '') {
      this.$refs.tab_total.classList.add('is-active')
    } else {
      this.$refs.tab_active.classList.add('is-active')
    }
  },
  methods: {
    tabToggle (e) {
      if (e.target.text === '총 가입자 지표') {
        this.$refs.tab_total.classList.add('is-active')
        this.$router.push({path: '/'})
        if (this.$refs.tab_active.classList.contains('is-active')) {
          this.$refs.tab_active.classList.remove('is-active')
        }
      } else {
        this.$refs.tab_active.classList.add('is-active')
        this.$router.push({path: '/ActiveUserStatus'})
        if (this.$refs.tab_total.classList.contains('is-active')) {
          this.$refs.tab_total.classList.remove('is-active')
        }
      }
    }
  }
}
</script>

<style scoped>
.nav-control {
  padding: 10px 10%;
}

.header-title {
  font-size: 1.2rem;
  color: #fff;
}
.header-title:hover {
  opacity: 0.7;
}

.tab-list {
  color: #fff;
}

.main-container {
  padding: 10px 10%;
}
</style>
