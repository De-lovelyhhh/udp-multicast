export default {
  state: {
    messageList: []
  },
  mutations: {
    setMessage (state, objInfo) {
      state.message.messageList.splice(objInfo.insertIndex, 0, objInfo.obj)
    }
  }
}
