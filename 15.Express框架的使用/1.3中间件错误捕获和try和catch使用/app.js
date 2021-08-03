// 引入express框架
const express = require("express");
const fs = require("fs");
const promisify = require("util").promisify;
// 转换为异步promise对象返回结果
const readFile = promisify(fs.readFile);
// 错误中间件的应用和使用


// 创建网站服务器
const app = express();


// 中间件处理函数
// app.get("/index", (req, res, next) => {
//     // throw new Error("服务器报错了");
//     // 读取文件错误显示调用错误中间件
//     readFile("D:/重庆理工大学（需备份）/课外学习爱好/web学习/web学习个人/练习实例/15.Express框架的使用/1.2中间件应用/app.js", "utf8", (err, data) => {
//         if (err) {
//             // 如果读取文件报错
//             // 将错误给调用错误中间件
//             // next函数若没有参数则是将路由控制权往下转交
//             // 有参数则为调用错误中间件
//             next(err);
//         } else {
//             res.send(data);
//         }
//     })
// })


// try catch函数实现的是异步函数的捕获
// 只支持promise对象的异步错误和其他代码的同步错误，不支持其他api类型的异步错误

// try catch函数处理
app.get("/index", async(req, res, next) => {
    // 使用try catch 函数实现对支持promise函数的异步错误捕获的处理
    try {
        let data = await readFile("1.txt", "utf-8");
    } catch (ex) {
        res.send(ex.message);
    }
})

// 错误处理中间件的定义
// 第一个参数是错误的对象
// 只能捕获同步代码的出错
// 异步任务出错需要手动调用错误中间件
// 方法就是next(err)这样的显示调用
app.use("/index", (err, req, res, next) => {
    console.log(typeof err)
    res.status(500).send(err.message);
})

// 监听端口号
app.listen(3000);
// 输出提示信息
console.log("网站服务器已经创建成功！！");