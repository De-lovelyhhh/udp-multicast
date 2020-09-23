import Vue from 'vue'
import Vuex from 'vuex'
import message from './data/message'
import user from './data/user'

Vue.use(Vuex)
const state = {
  user: user.state,
  message: message.state
}

const mutations = {
  ...message.mutations,
  ...user.mutations
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
