// 引入express框架
const express = require("express");

// 得到路由对象
const admin = express.Router();
// 配置二级路由

// 生成初始数据的函数
// async function createInfo() {
//     // 生成一个随机字符串
//     // 数字越大，越复杂
//     // 数字越小越简单
//     let slat = await bcrypt.genSalt(10);
//     // 第一个参数是需要加密的密码字符串
//     // 第二个参数是生成的随机加密字符串
//     // 返回一个加密好的字符串
//     let myPassword = await bcrypt.hash("123456", slat);
//     // 创建初始数据
//     let user1 = await User.create({
//         username: "itxiaohu",
//         email: "itxiaohu@itcast.com",
//         password: myPassword,
//         role: "normal",
//         state: 0
//     })
// }

// createInfo();

// 登录页面
admin.get("/login", require("./admin/loginPage"));

// 登录页面的判断
admin.post("/login", require("./admin/login"));

// 用户页面
admin.get("/user", require("./admin/userPage"));

// 退出登录状态
admin.get("/loginOut", require("./admin/loginOut"));

// 跳转到新增用户页面
admin.get("/user-edit", require("./admin/userEdit"));

// 修改用户信息的提交数据的处理
admin.post("/user-modify", require("./admin/userModify"));

// 删除用户信息的路由数据处理
admin.get("/delete", require("./admin/userDelete"));

// 添加用户的数据处理
admin.post("/user-edit", require("./admin/userEditDeal"));

// 文章列表路由
admin.get("/article", require("./admin/article"));

// 文章编辑的路由
admin.get("/article-edit", require("./admin/articleEdit"));

// 添加文章的路由
admin.post("/article-edit", require("./admin/articleAdd"));

// 修改文章的数据处理
admin.post("/article-modify", require("./admin/articleModify"));

// 删除文章的路由
admin.get("/article-delete", require("./admin/articleDelete"));

// 导出路由模块供主程序使用
module.exports = admin;