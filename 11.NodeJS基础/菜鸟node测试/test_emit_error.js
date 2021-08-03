var events = require('events');
var emitter = new events.EventEmitter();
// 为emitter绑定错误的监听器
console.log("打印错误信息");
emitter.emit('error');