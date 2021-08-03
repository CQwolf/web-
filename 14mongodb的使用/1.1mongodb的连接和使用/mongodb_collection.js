// 引入
const mongoose = require("mongoose");

// 实现数据库连接
// mongoose.connect返回的对象是一个promise类型的，
// 所以可以使用。then和。catch来获取正确和错误的信息
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("数据库连接成功") })
    .catch(err => { console.log(err, "数据库连接失败") });

// 创建作者集合规则
const authorSchema = new mongoose.Schema({
    name: String,
});

// 创建文章集合规则
const postSchema = new mongoose.Schema({
    title: String,
    author: {
        // 通过此代码将此属性和author集合相关联
        type: mongoose.Schema.Types.ObjectId,
        // 此处关联的是数据库中集合的名字
        ref: "Author"
    }
});

// 创建作者集合
const Author = mongoose.model("Author", authorSchema);
// 创建文章集合
const Post = mongoose.model("Post", postSchema);

// 插入数据
// Author.create({ name: "韩寒" });
// Post.create({ title: "朝花夕拾", author: "60e14ee1308cd030807f4f5a" })

// 查询数据宁企鹅将关联集合的数据一并查出来
// populate函数的参数为关联数据库的字段名
// 如果find函数后面不加此populate函数的话，关联的信息有且只有一个_id标识号
Post.find().populate("author").then(result => { console.log(result) });