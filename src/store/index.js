import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../api/auth_api/auth_api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isLoggedIn: false,
      apiURL : 'http://127.0.0.1:8000/api',
      serverPATH : 'http://127.0.0.1:8000',
      profile: {}
  },
  mutations: {
      authenticate(state, payload) {
          state.isLoggedIn = auth.isLoggedIn();
          if(state.isLoggedIn) {
            state.profile = payload
          }
          else {
            state.profile = {}
          }
      } 
  },
  actions: {
      authenticate(context, payload) {
          context.commit('authenticate', payload)
      }
  },
  modules: {
  }
})
