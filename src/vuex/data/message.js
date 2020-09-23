export default {
  state: {
    messageList: []
  },
  mutations: {
    setMessage (obj, insertIndex) {
      this.state.messageList.splice(insertIndex, 0, obj)
    }
  }
}
