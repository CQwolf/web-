// 访问静态资源网站数据
// 1.引入创建网站服务器的模块
const http = require("http");
// 引入url解决转换，处理对象的URL
const url = require("url");
// 获取文件物理路径的拼接
const path = require("path");
// 处理字符串的url地址
const querystring = require("querystring");
// 文件操作引用
const fs = require("fs");

// 引入不同请求类型的返回类型的自处理
const mime = require("mime");

// 2.创建一个网站服务器的对象
const app = http.createServer();

// 3.监听客户端的请求消息
app.on("request", (req, res) => {

    // 获取用户请求的路径名
    let pathname = url.parse(req.url).pathname;

    // 处理初始化网址
    pathname = pathname == "/" ? "/default.html" : pathname;
    // 得到当前需要读取文档的绝对路径
    let realPath = path.join(__dirname, "public", pathname);

    // 根据路径返回不同的响应
    let mimeType = mime.getType(realPath);

    // 读取文档显示到我们的请求页面
    fs.readFile(realPath, (error, data) => {
        if (error != null) {
            res.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8",
            });
            res.end("文件读取错误");
            return;
        }
        // 设置依据不同请求响应的返回类型
        res.writeHead(200, {
            "Content-Type": mimeType,
        });
        res.end(data);
    })

});
// 监听3000为端口号
app.listen(3000);
console.log("网站服务器创建成功")