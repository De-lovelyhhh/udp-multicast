import Vue from 'vue'
import Vuex from 'vuex'
import message from './data/message'
import user from './data/user'

Vue.use(Vuex)
const state = {
  user,
  message
}

const mutations = {
  user,
  message
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
