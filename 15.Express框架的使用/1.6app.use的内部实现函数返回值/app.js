const express = require("express");
// 创建服务器
const app = express();

// 实现函数调用返回函数实现路由
// 这样可以实现其他参数的传递，实现其他的更多的功能
app.use(fn({ a: 0 }));

function fn(obj) {
    return function(req, res, next) {
        if (obj.a == 1) {
            res.send("a的值为1")
        } else {
            res.send("a的值不为1")
        }
    }
}


// 监听端口号
app.listen(3000);
console.log("服务器创建成功");