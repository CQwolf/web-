// 引入创建网站服务器的模块
const http = require("http");
// 引入url解决转换
const url = require("url");

// 创建一个网站服务器的对象
const app = http.createServer();

// 监听客户端的请求消息
app.on("request", (req, res) => {

    // 设置响应头的格式
    // res.setHeader("Content-Type", "text/html;charset=utf-8");
    // res.end(`<h2>欢迎访问我的服务器</h2>`);

    // 设置头部内容
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    })

    // 打印请求方法
    console.log(req.method);
    // 根据提交数据的方式实现不同的响应
    // if (req.method == "POST") {
    //     res.end(`<h3>你好，POST请求</h3>`);
    // } else if (req.method == "GET") {
    //     res.end(`<h3>你好，GET请求</h3>`);
    // }

    // 打印请求的地址
    console.log(req.url);

    // 解析提交的参数
    // url.parse函数，第一个参数是，url请求，第二个Query这个参数是否转换为对象
    console.log(url.parse(req.url));
    console.log(url.parse(req.url, true));
    // 对象解构方式声明
    let { query, pathname } = url.parse(req.url, true);
    console.log(query.name);
    console.log(query.age);

    // 根据请求路径不同返回页面
    if (pathname == "/index" || req.url == "/") {
        res.end(`<h3>首页</h3>`);
    } else if (pathname == "/list") {
        res.end(`<h3>list页</h3>`);
    } else {
        res.end(`<h3>404 NOT FOUND</h3>`);
    }

    // 请求报文信息获取
    console.log(req.headers);




});
// 监听3000为端口号
app.listen(3000);
console.log("网站服务器创建成功")