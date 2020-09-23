<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button @click="record"> 开始录音</el-button>
    </div>
  </div>
</template>

<script>
import CheckBox from './components/CheckBox.vue'

export default {
  name: 'app',
  components: {
    CheckBox
  },
  methods:{
    record(){
      window.navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(mediaStream => {
        console.log(mediaStream)
        this.beginRecord(mediaStream)
      }).catch(err => {
        // 如果用户电脑没有麦克风设备或者用户拒绝了，或者连接出问题了等
        // 这里都会抛异常，并且通过err.name可以知道是哪种类型的错误 
        console.error(err)
      })
    },
    beginRecord (mediaStream) {
      let audioContext = new (window.AudioContext || window.webkitAudioContext);
      let mediaNode = audioContext.createMediaStreamSource(mediaStream);
      // 这里connect之后就会自动播放了
      mediaNode.connect(audioContext.destination);
    },
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://127.0.0.1:8080";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let actions = {"test":"12345"};
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){ //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      const redata = JSON.parse(e.data);
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
