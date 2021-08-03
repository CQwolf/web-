const express = require("express");

// 创建服务器
const app = express();

// 引入登录路由
const admin = require("./router/admin");
// 引入主页路由
const home = require("./router/home");

// 处理一级路由

// 路径为/admin/index
app.use("/admin", admin);
// 路径为/home/index
app.use("/home", home);

// 监听端口号
app.listen(3000);
console.log("服务器创建成功");