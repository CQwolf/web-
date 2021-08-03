// 1.建立项目文件夹并生成项目描述文件
// 2.创建网站服务器实现客户端和服务器端通信
// 3.连接数据库并根据需求设计学员信息表
// 4.创建路由并实现页面模板呈递
// 5.实现静态资源访问
// 6.实现学生信息添加功能
// 7.实现学生信息展示功能

// 引入http创建网站服务器
const http = require("http");
// 引入path拼接
const path = require("path");
// 引入模板引擎
const template = require("art-template");
// 引入静态资源处理模块
const serveStatic = require("serve-static");
// 引入时间处理模块
const dateformat = require("dateformat");
// 引入url格式模块化 
const url = require("url");

// 创建网站服务器
const app = http.createServer();

// 连接数据库
require("./model/connect");

// 配置默认的模板根目录
template.defaults.root = path.join(__dirname, "views");

// 配置日期处理函数
template.defaults.imports.dateformat = dateformat;

// 静态资源处理绑定静态资源的路径
const serve = serveStatic("./public");

// 引入路由模块实现路由
const router = require("./router/index");

// 监听客户端请求
app.on("request", (req, res) => {

    // 调用启动路由对象
    router(req, res, () => {
        console.log();
    });

    // 静态资源的访问和启用
    serve(req, res, () => {
        console.log();
    })

});

// 监听端口
app.listen(3000);

// 提示信息
console.log("服务器创建成功！！！");