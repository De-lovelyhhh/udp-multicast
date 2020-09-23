<template>
    <div class="sendbox">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="文字" name="text">
          <el-input
            type="textarea"
            :rows="5"
            class="sendbox-input"
            v-model="inputMessage">
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="对话" name="talk">
          <el-button @click="holdToTalk">按住说话</el-button>
        </el-tab-pane>
      </el-tabs>
      <el-button type="send" @click="sendMessage" plain>发送</el-button>
    </div>
</template>

<script>
export default {
  name: 'SendBox',
  data () {
    return {
      inputMessage: '',
      activeName: 'text'
    }
  },
  methods: {
    sendMessage () {
      this.$emit('sendMessage', this.inputMessage)
      this.inputMessage = ''
    },
    holdToTalk () {}
  }
}
</script>

<style lang="scss">
.sendbox {
  position: absolute;
  bottom: 0;
  width: 90%;
  .sendbox-input {
    .el-textarea__inner {
      resize: none;
    }
  }
}
</style>
