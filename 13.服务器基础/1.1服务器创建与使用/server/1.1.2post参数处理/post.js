// 引入创建网站服务器的模块
const http = require("http");
// 引入url解决转换，处理对象的URL
const url = require("url");

// 处理字符串的url地址
const querystring = require("querystring");

// 创建一个网站服务器的对象
const app = http.createServer();

// 监听客户端的请求消息
app.on("request", (req, res) => {

    // post 请求参数是通过事件方式接受的
    // data 是当请求参数传递的时候触发的data事件
    // end 当请求参数传递完成的时候触发end事件

    // 用 req 来监听事件函数
    // 请求参数传递时

    let postParams = "";
    req.on("data", params => {
        postParams += params;
    });

    // 请求参数完成时
    req.on("end", () => {
        querystring.parse(postParams);
        console.log("post请求参数" + postParams);
    })


    res.end("ok");
});
// 监听3000为端口号
app.listen(3000);
console.log("网站服务器创建成功")