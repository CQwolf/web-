// 引入express框架
const express = require("express");
// 引入路径拼接模块
const path = require("path");
// 引入body-parser处理post参数
const bodyParser = require("body-parser");
// 创建网站服务器
const app = express();

// 托管静态资源
app.use(express.static(path.join(__dirname, "public")));

// 配置post参数的获取
// extended值为false是利用querystring对post参数进行处理
app.use(bodyParser.urlencoded({ extended: false }));
// 对json数据格式的解析
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(req.query);
})

app.post("/post", (req, res) => {
    console.log(req.body);
    console.log(req)
    res.send(req.body)
});

// 监听端口
app.listen(3000);
// 服务器创建成功提示
console.log("服务器创建成功")