<template>
    <div class="sendbox">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        class="sendbox-input"
        v-model="inputMessage">
      </el-input>
    </div>
</template>

<script>
export default {
  name: 'SendBox',
  data () {
    return {
      inputMessage: ''
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
