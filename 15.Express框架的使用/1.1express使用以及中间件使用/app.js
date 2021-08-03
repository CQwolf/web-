// 引入express框架
const express = require("express");

// 创建网站服务器
const app = express();

// 实现路由方法
// use方法接收请求不区别请求方式
// use方法第一个参数是请求地址，但不区别请求的方式
// 第一个参数若是省略，则为接收所有的请求地址
app.use((req, res, next) => {
    console.log("请求经过use方法");
    next();
});

app.use("/list", (req, res, next) => {
    console.log("请求经过 use中的 /List");
    // next方法是用于将匹配的路由的控制权传到下一个匹配的路由
    // 因为这些路由方法的基本标准都是
    // 匹配由上到下第一个路由就默认不在进行匹配
    // 简而言之就是对同一个地址多次匹配实现多种处理操作
    next();
})

// get 方法实现get请求的响应
// 使用req.query实现参数获取
app.get("/", (req, res) => {
    // send方法自动设置了http状态码
    // send方法自动设置了响应内容和编码方式
    // send方法可以实现json数据格式的转换
    // send方法内部自动实现了响应内容的检测
    res.send("欢迎来到首页");
})

app.get("/list", (req, res) => {
    res.send({ name: "sb", description: "一个sb" });
})

// post 方法实现post请求的响应
// 使用req.body实现参数获取
app.post("/list", (req, res) => {
    res.send("hello post请求的list页面");
})


// 监听端口号
app.listen(3000);
// 输出提示信息
console.log("网站服务器已经创建成功！！");