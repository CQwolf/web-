const express = require("express");

// 创建登录路由
// 通过Router方法返回一个路由对象
const admin = express.Router();

// 此处使用的是二级路由
// 访问地址为 /admin/index
admin.get("/index", (req, res) => {
    res.send("你好，欢迎来到登录的首页")
});

// 导出模块供别人使用
module.exports = admin;