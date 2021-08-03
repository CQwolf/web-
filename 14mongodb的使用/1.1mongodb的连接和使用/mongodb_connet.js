// 数据库连接导入
const mongoose = require("mongoose");

// 实现数据库连接
// mongoose.connect返回的对象是一个promise类型的，
// 所以可以使用。then和。catch来获取正确和错误的信息
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("数据库连接成功") })
    .catch(err => { console.log(err, "数据库连接失败") });

// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

// 然后将集合规则应用到文档
// 第一个参数为数据库中表的名字，如写Course，则数据库中的名字为courses
// 第二个参数为数据库中这个表应该用什么规则
// 第三，返回值为一个Course的构造函数
const Course = mongoose.model("Course", courseSchema);

// 然后是插入数据，使的成功创建并显示数据
const course = new Course({
    name: "大哥大",
    author: "黑凤梨",
    isPublished: true
});

// 保存数据到数据库中
course.save();