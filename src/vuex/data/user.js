import store from '../store'

export default {
  state: {
    name: ''
  },
  mutations: {
    setUserName (state, name) {
      store.state.user.name = name
    }
  }
}
