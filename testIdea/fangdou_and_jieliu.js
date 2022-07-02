// 防抖函数
// 防抖是限制时间出发函数
// 每次点击都会判断是否到时间，并且重新开始
var timer;

function debounce(eventHandle, delay) {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        eventHandle();
    }, delay);
}

// 节流函数
// 节流规定一段时间内至少触发一次， 不能多也不能少
var timer2;

function throttle(fn, delay) {
    if (timer2) {
        return;
    }
    timer = setTimeout(() => {
        fn();
        timer2 = null;
    }, delay);
}

// 时间戳实现节流函数
let previous = 0;

function throttle1(fn, delay) {
    let now = new Date();
    if (now - previous > delay) {
        fn();
        previous = now;
    }
}