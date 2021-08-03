// 引入express框架
const express = require("express");

// 三大应用
// 1.登录拦截
// 2.网站维护
// 3.404页面实现

// 创建网站服务器
const app = express();

// 网站维护实现路由
// 写在所有路由前面
// app.use((req, res, next) => {
//     res.send("当前网站正在维护");
// });

// 实现登录拦截
app.use("/admin", (req, res, next) => {
    let isLogin = false;
    // 登录了就继续访问后续页面
    if (isLogin) {
        next();
    } else {
        res.send("您还没有登录，请重新登录")
    }
})

// 路由404页面实现
// 写在所有路由的后面
app.use((req, res) => {
    res.status(404).send("网站未找到");
})

// 监听端口号
app.listen(3000);
// 输出提示信息
console.log("网站服务器已经创建成功！！");