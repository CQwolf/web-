// 1.引入创建网站服务器的模块
const http = require("http");
// 引入url解决转换，处理对象的URL
const url = require("url");

// 处理字符串的url地址
const querystring = require("querystring");

// 2.创建一个网站服务器的对象
const app = http.createServer();

// 3.监听客户端的请求消息
app.on("request", (req, res) => {
    // 4.完成路由

    // 指定响应内容
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8",
    });

    // 1.获取客服端请求方式
    const method = req.method.toLowerCase();
    // 2.获取请求地址和查询参数
    let { pathname, query } = url.parse(req.url);

    if (method == "get") {
        if (pathname == "/" || pathname == "/index") {
            res.end("欢迎来到get首页");
        } else if (pathname == "/list") {
            res.end("list get页面");
        } else {
            res.end("请求地址错误");
        }
    } else if (method == "post") {
        if (pathname == "/" || pathname == "/index") {
            res.end("欢迎来到post首页");
        } else if (pathname == "/list") {
            res.end("list post页面");
        } else {
            res.end("请求地址错误");
        }
    }
});
// 监听3000为端口号
app.listen(3000);
console.log("网站服务器创建成功")