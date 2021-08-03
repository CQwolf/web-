// 引入express框架
const express = require("express");
// 引入路径拼接
const path = require("path");
// 引入body-parser处理post参数
const bodyParser = require("body-parser");
// 引入cookie和session的使用
const session = require("express-session");
// 引入日期处理函数
const dateformat = require("dateformat");
// 引入art-template模板引擎
const template = require("art-template");
// 引入morgan模块打印开发环境下的客户端向服务器端发送的请求信息
const morgan = require("morgan");
// 创建网站服务器
const app = express();

// 数据库的连接
require("./model/connect");

// tips:配置文件一般放在app.js这种入口文件里面

/*
    原因是因为JSON在序列化的时候，
    默认将日期类型转换为了UTC格式的时间，
    UTC格式是不带时区的，或者说是0时区。
    客户端根据本地的时区自动再转换。
*/
// function dateFormat(date, fmt) {
//     if (null == date || undefined == date) return '';
//     var o = {
//         "M+": date.getMonth() + 1, //月份
//         "d+": date.getDate(), //日
//         "h+": date.getHours(), //小时
//         "m+": date.getMinutes(), //分
//         "s+": date.getSeconds(), //秒
//         "S": date.getMilliseconds() //毫秒
//     };
//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// }

// Date.prototype.toJSON = function() { return dateFormat(this, 'yyyy-MM-dd hh:mm:ss') }

// 配置模板引擎art-template
// 配置渲染哪种模板使用哪种模块渲染
app.engine("art", require("express-art-template"));
// 配置模板目录
app.set("views", path.join(__dirname, "views"));
// 配置模板后缀
app.set("view engine", "art");
// 添加日期处理模块到模板中
template.defaults.imports.dateformat = dateformat;

// 托管静态资源
app.use(express.static(path.join(__dirname, "public")));

// 配置post参数的获取
// extended值为false是利用querystring对post参数进行处理
app.use(bodyParser.urlencoded({ extended: false }));

// use方法的全路径匹配为originalUrl
// app.use("/admin", (req, res, next) => {
//     console.log(req.originalUrl);
//     next();
// });

// 配置session
// 这个是secret是用于加密的
// app.use(session({ secret: "secret key" }));
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: true, //初始状态不存储cookie
    secret: "secret key", // 建议使用 128 个字符的随机字符串
    // 使cookie值在一天后失效 即一天内未登录，则登录状态失效
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

// 实现登录拦截的功能
app.use("/admin", require("./middleware/loginGuard"));

// 生产环境和开发环境
// 获取当前本机系统的所有系统变量
// console.log(process.env);

// 区别生产还是开发环境使用
// 系统变量中储存的NODE_ENV变量
// development 代表开发环境
// production 代表的是生产环境
if (process.env.NODE_ENV == "development") {
    // 开发环境
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    console.log("客户端请求信息打印");
    app.use(morgan("dev"));
} else {
    // 生产环境
}

// 引入路由模块
// 博客主页路由
const home = require("./route/home");
// 博客后台管理系统路由
const admin = require("./route/admin");

// 构建路由模块
// 博客主页路由处理
app.use("/home", home);
// 博客后台管理系统路由处理
app.use("/admin", admin);

// 实现错误处理中间件
// 第一个error即为触发错误处理中间件时候的传递给next的参数
app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        // 将错误信息从字符串转换为对象
        const myError = JSON.parse(error);
        let myQuery = [];
        // 循环得到参数部分
        for (let arr in myError) {
            // 去除路径，只将参数合并起来
            if (arr != "path") {
                // 将属性名和属性值合并存入数组
                myQuery.push(arr + "=" + myError[arr]);
            }
        }
        // 然后跳转到对应的页面
        res.redirect(`${myError.path}?${myQuery.join("&")}`);
    } else {
        next();
    }
})


// 监听端口
// http协议的默认端口
app.listen(80);
console.log("服务器创建成功！！！");