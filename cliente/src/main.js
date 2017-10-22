// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    token: undefined
  },
  getters: {
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
