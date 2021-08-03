const express = require("express");
// 引入post参数的处理模块
const bodyParser = require("body-parser");
// 创建服务器
const app = express();

// 首先进行配置此模块
// 为false内部使用querystring实现post参数转换
// 为true则内部使用qs进行相关的转换
app.use(bodyParser.urlencoded({ extends: false }));

// 获取get参数
// 使用req.query 这是一个对象
app.get("/getData", (req, res) => {
    // 直接输出对应的get提交参数
    res.send(req.query);
})


// 获取post参数
// 需要使用body-parser来对参数进行转换放到req.body里面
app.post("/postData", (req, res) => {
    // post的参数输出
    res.send(req.body);
});
// 监听端口号
app.listen(3000);
console.log("服务器创建成功");