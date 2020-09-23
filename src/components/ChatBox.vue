<template>
<div class="chatbox">
  <div class="chatbox-chatting">
    <message-item
      v-for="(item, index) in messageList"
      :key="index"
      :message="item.message"
      :time="item.time"
      :user-id="item.userId"
      :my-send="userId === item.userid"
    />
  </div>

  <send-box
    @sendMessage="sendMessage"
  />
  <el-dialog
    :visible.sync="setUserName"
    width="30%">
    <el-input
      placeholder="请输入昵称"
      v-model="userName"
      clearable>
    </el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setUserName = false">取 消</el-button>
    <el-button type="primary" @click="submitName">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import messageItem from './messageItem'
import SendBox from './SendBox'
export default {
  name: 'ChatBox',
  data () {
    return {
      setUserName: false,
      userName: ''
    }
  },
  computed: {
    messageList () {
      return this.$store.state.message.messageList
    },
    userId () {
      return this.$store.state.user.name
    }
  },
  mounted () {
    if (!this.userId) {
      this.setUserName = true
    }
  },
  methods: {
    sendMessage (text) {
      this.$store.commit('setMessage', { obj: {
        userId: this.userId,
        message: text,
        time: new Date().toLocaleTimeString()
      },
      insertIndex: this.messageList.length })
    },
    submitName () {
      this.$store.commit('setUserName', this.userName)
      this.userName = ''
      this.setUserName = false
    }
  },
  components: {
    messageItem,
    SendBox
  }
}
</script>

<style lang="scss">
.chatbox {
  padding: 0 5%;
  .chatbox-chatting {
    overflow: auto;
  }
}
</style>
