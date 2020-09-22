<template>
<div>
  <message-item
    v-for="(item, index) in messageList"
    :key="index"
    :message="item.message"
    :time="item.time"
    :user-id="item.userId"
  />
  <send-box
    @sendMessage="sendMessage"
  />
</div>
</template>

<script>
import messageItem from './messageItem'
import SendBox from './SendBox'
export default {
  name: 'CheckBox',
  computed: {
    messageList () {
      return this.$store.state.message.messageList
    },
    userId () {
      return this.$store.state.user.name
    }
  },
  methods: {
    sendMessage (text) {
      this.$store.commit('setMessage', {
        userId: this.userId,
        message: text,
        time: new Date().toLocaleTimeString()
      })
    }
  },
  components: {
    messageItem,
    SendBox
  }
}
</script>

<style scoped>

</style>
