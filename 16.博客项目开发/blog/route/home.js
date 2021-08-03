// 引入express框架
const express = require("express");
// 得到路由对象
const home = express.Router();
// 配置二级路由

// 首页的路由
home.get("/", require("./home/index"));

// 详情页面的路由
home.get("/article", require("./home/article"));

// 储存用户评论的路由
home.post("/comment", require("./home/comment"));

// 导出路由模块供主程序使用
module.exports = home;