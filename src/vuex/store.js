import Vue from 'vue'
import Vuex from 'vuex'
import message from './data/message'
import user from './data/user'

Vue.use(Vuex)
const state = {
  user,
  message
}

const store = new Vuex.Store({
  state
})

export default store
