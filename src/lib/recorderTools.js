let leftDataList = [];
let rightDataList = [];
let mediaNode = null;
let jsNode = null;

function mergeArray (list) {
    let length = list.length * list[0].length;
    let data = new Float32Array(length),
        offset = 0;
    for (let i = 0; i < list.length; i++) {
        data.set(list[i], offset);
        offset += list[i].length;
    }
    return data;
}

function beginRecord (mediaStream) {
    let audioContext = new (window.AudioContext || window.webkitAudioContext);
    mediaNode = audioContext.createMediaStreamSource(mediaStream);
    jsNode = createJSNode(audioContext);
    jsNode.connect(audioContext.destination);
    jsNode.onaudioprocess = onAudioProcess;
     // 把mediaNode连接到jsNode
    mediaNode.connect(jsNode);
}

function onAudioProcess (event) {
    let audioBuffer = event.inputBuffer;
    let leftChannelData = audioBuffer.getChannelData(0),
    rightChannelData = audioBuffer.getChannelData(1);
    leftDataList.push(leftChannelData.slice(0));
    rightDataList.push(rightChannelData.slice(0));
}

function createJSNode (audioContext) {
  const BUFFER_SIZE = 4096; // 缓冲大小
  const INPUT_CHANNEL_COUNT = 2; // 输入频道数
  const OUTPUT_CHANNEL_COUNT = 2; // 输出频道数
  let creator = audioContext.createScriptProcessor || audioContext.createJavaScriptNode;
  creator = creator.bind(audioContext);
  return creator(BUFFER_SIZE, INPUT_CHANNEL_COUNT, OUTPUT_CHANNEL_COUNT);
}

// 交叉合并左右声道的数据
function interleaveLeftAndRight (left, right) {
    let totalLength = left.length + right.length;
    let data = new Float32Array(totalLength);
    for (let i = 0; i < left.length; i++) {
        let k = i * 2;
        data[k] = left[i];
        data[k + 1] = right[i];
    }
    return data;
}
function createWavFile (audioData) {
    const WAV_HEAD_SIZE = 44;
    let buffer = new ArrayBuffer(audioData.length * 2 + WAV_HEAD_SIZE),
        // 需要用一个view来操控buffer
        view = new DataView(buffer);
    // 写入wav头部信息
    // RIFF chunk descriptor/identifier
    writeUTFBytes(view, 0, 'RIFF');
    // RIFF chunk length
    view.setUint32(4, 44 + audioData.length * 2, true);
    // RIFF type
    writeUTFBytes(view, 8, 'WAVE');
    // format chunk identifier
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ');
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    // sample rate
    view.setUint32(24, 44100, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, 44100 * 2, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, 2 * 2, true);
    // bits per sample
    view.setUint16(34, 16, true);
    // data sub-chunk
    // data chunk identifier
    writeUTFBytes(view, 36, 'data');
    // data chunk length
    view.setUint32(40, audioData.length * 2, true);
    let length = audioData.length;
    let index = 44;
    let volume = 1;
    for (let i = 0; i < length; i++) {
        view.setInt16(index, audioData[i] * (0x7FFF * volume), true);
        index += 2;
    }
    return buffer;
}
function writeUTFBytes (view, offset, string) {
    var lng = string.length;
    for (var i = 0; i < lng; i++) { 
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}
function playRecord (arrayBuffer) {
    let blob = new Blob([new Uint8Array(arrayBuffer)]);
    let blobUrl = URL.createObjectURL(blob);
    document.getElementById('record').src = blobUrl;
}
function stopRecord () {
    // 停止录音
    console.log(leftDataList,rightDataList)
    let leftData = mergeArray(leftDataList),
        rightData = mergeArray(rightDataList);
    let allData = interleaveLeftAndRight(leftData, rightData);
    let wavBuffer = createWavFile(allData);
    // mediaStream.getAudioTracks()[0].stop();
    mediaNode.disconnect();
    jsNode.disconnect();
    playRecord(wavBuffer);
}

export { beginRecord, stopRecord}