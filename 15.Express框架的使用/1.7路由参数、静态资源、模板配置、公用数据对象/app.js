const express = require("express");
const path = require("path");
// 创建服务器
const app = express();

// 使用app.locals来实现一个所有模板均可使用的数据项目
app.locals.users = [{
    name: '张三',
    age: 20
}, {
    name: '李四',
    age: 20
}]


// 使用express.static来实现静态资源托管
app.use("/static", express.static(path.join(__dirname, "public")));

// 模板引擎使用的三步配置 先下载两个资源包
// 第一个参数渲染什么文件后缀的模板、第二个参数用哪个模板引擎去渲染
app.engine("art", require("express-art-template"));
// 第一个参数表示渲染的模板，固定名字、第二个参数是模板所在的绝对路径
// 这个主要是用于配置模板的路径
app.set("views", path.join(__dirname, "views"));
// 第一个参数固定，渲染为art-template的模板
// 第二个参数是模板默认的后缀名字
app.set("view engine", "art")

// 测试模板应用成功
app.get("/list", (req, res) => {
    // render自动拼接模板，并响应到客户端
    // 里面直接写模板的名字即可
    res.render("list", {
        data: [{
                name: "list",
                age: 34
            },
            {
                name: "yum",
                age: 12
            }
        ]
    });
});
// 测试本地相同变量使用成功
app.get("/index", (req, res) => {
    res.render("index")
})


// 路由参数传参格式为：
// index/id/name/age
// 设置了多少参数就必须传递多少参数
app.use("/index/:id/:name/:age", (req, res) => {
    // 通过req.params里面的对象来获取id、name、age的值
    res.send(req.params);
})


// 监听端口号
app.listen(3000);
console.log("服务器创建成功");