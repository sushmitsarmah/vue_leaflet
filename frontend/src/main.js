// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import BootstrapVue from 'bootstrap-vue'
import VueLocalStorage from 'vue-localstorage'

import * as VueWindow from '@hscmap/vue-window'

import * as CONFIG from './config.json'

import App from './App'
import router from './router'

Vue.router = router

Vue.use(VueWindow)

Vue.use(VueLocalStorage, {
  name: 'localStorage',
  bind: true,
  namespace: CONFIG.localstorageNamespace
})

Vue.use(BootstrapVue)

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = CONFIG.url
Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.localStorage.get('token')

let authOptions = {
  authRedirect: '/',
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  token: [{request: 'token', response: 'token', authType: 'bearer', foundIn: 'header'}],
  tokenName: 'token',
  loginData: {url: 'auth/login', method: 'POST', redirect: 'home'},
  logoutData: {url: 'logout', method: 'POST', redirect: 'login', makeRequest: false},
  fetchData: {url: 'secret', method: 'GET', authType: 'bearer'},
  refreshData: {enabled: false},
  rolesVar: 'role_id'
}

Vue.use(VueAuth, authOptions)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
