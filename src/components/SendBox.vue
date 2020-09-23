<template>
    <div class="sendbox">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="文字" name="first">
          <el-input
            type="textarea"
            :rows="5"
            class="sendbox-input"
            v-model="inputMessage">
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="对话" name="second">
          <el-button @click="holdToTalk">按住说话</el-button>
        </el-tab-pane>
      </el-tabs>
      <el-button type="send" @click="sendMessage" plain>发送</el-button>
      <el-button>+</el-button>
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
    },
    holdToTalk () {}
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
