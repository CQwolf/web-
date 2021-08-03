// 引入路由管理的模块
const getRouter = require("router");
// 引入模板引擎
const template = require("art-template");
// 引入处理post参数模块
const querystring = require("querystring");

// 得到路由对象
const router = getRouter();

// 返回Student的集合操作
const Student = require("../model/student");


// 处理路由请求
// 学生信息显示页路由
router.get("/list", async(req, res) => {
    // 查询所有学生信息
    const studentData = await Student.find();
    // 响应学生信息页
    let list = template("list.art", { student: studentData });
    res.end(list);
});

// 添加学生信息页路由
router.get("/add", (req, res) => {
    // 响应学生添加信息页 
    // 第二个参数可以为空，但是必须要写，不然会出现一些未知错误
    let add = template("index.art", {});
    res.end(add);
});

// 添加学生的数据处理路由
router.post("/add", (req, res) => {
    // 储存提交的参数
    let formData = "";

    // 获取post提交的数据
    req.on("data", param => {
        formData += param;
    });

    // 获取post数据提交完成后的数据处理
    req.on("end", async() => {
        let queryData = querystring.parse(formData);
        // 然后添加到数据库
        await Student.create(queryData);
        // 跳转到显示页面
        res.writeHead(301, {
            location: "/list"
        });
        // 响应结束
        res.end();
    })
});

// 将此函数开放给别的函数使用
module.exports = router;