<template>
    <div :class="[mySend ? 'message-item__owner' : 'message-item__others', 'message-item']">
      <div class="message-item__title">
        <span>{{userId}}</span>
        <span>{{time}}</span>
      </div>
      <div :class="['message-item__box', mySend ? 'my-box' : '']">
        {{message}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'messageItem',
  props: {
    userId: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    mySend: false
  }
}
</script>

<style lang="scss">
.message-item{
  max-width: 400px;
  position: relative;
  &.message-item__owner {
    text-align: right;
  }
  .message-item__title {
    font-size: 12px;
    color: #83b6d1;
  }
  .message-item__box {
    padding: 5px 10px;
    background-color: #f2f2f2;
    margin-left: 5px;
    position: relative;
    &:after {
      content: "\00a0";
      width: 0;
      height: 0;
      display: inline;
      border-style: solid;
      border-width: 5px;
      border-color: transparent #f2f2f2 transparent transparent;
      position: absolute;
      z-index:-1;
      left: -10px;
      top: 5px;
    }
  }
}
</style>
