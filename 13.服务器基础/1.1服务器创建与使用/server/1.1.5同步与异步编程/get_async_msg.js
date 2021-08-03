// 获取异步任务的返回值
// 使用回调函数传参实现
function getMsg(callback) {
    setTimeout(() => {
        // 此调用的参数会被传送到调用函数里面的形参中
        callback({
            msg: "getMsg函数已经调用",
        });
    }, 2000);
}

// 此处data接收的值为callback中传递的对象这个参数
getMsg((data) => {
    console.log(data);
})