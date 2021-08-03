//event.js 文件
var EventEmitter = require('events').EventEmitter;
// 实例化event事件处理函数的对象
var event = new EventEmitter();
// 监听some_event事件
event.on('some_event', function() {
    console.log('some_event 事件触发');
});
// 每隔一秒触发一次some_event事件
setTimeout(function() {
    event.emit('some_event');
}, 1000);