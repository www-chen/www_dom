import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import './http'
Vue.prototype.$axios=axios;

// let bus = new Vue()
// Vue.prototype.$bus=bus;

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
