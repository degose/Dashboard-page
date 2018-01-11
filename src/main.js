import Vue from 'vue'
import App from './App'
// import router from './router'

import VueRouter from 'vue-router'
import {routes} from './routes'
import { store } from './store'
// import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
