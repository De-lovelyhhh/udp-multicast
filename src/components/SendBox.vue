<template>
    <div class="sendbox">
      <el-input
        type="textarea"
        :rows="5"
        class="sendbox-input"
        v-model="inputMessage">
      </el-input>
      <el-button type="send" @click="sendMessage" plain>发送</el-button>
    </div>
</template>

<script>
export default {
  name: 'SendBox',
  data () {
    return {
      inputMessage: ''
    }
  },
  methods: {
    sendMessage () {
      this.$emit('sendMessage', this.inputMessage)
      this.inputMessage = ''
    }
  }
}
</script>

<style lang="scss">
.sendbox {
  .sendbox-input {
    .el-textarea__inner {
      resize: none;
    }
  }
}
</style>
