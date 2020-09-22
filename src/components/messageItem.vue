<template>
    <div>
      <div>
        <span>{{userId}}</span>
        <span>{{time}}</span>
      </div>
      <div>{{message}}</div>
    </div>
</template>

<script>
export default {
  name: 'messageItem',
  props: {
    userId: '',
    time: '',
    message: ''
  }
}
</script>

<style scoped>

</style>
