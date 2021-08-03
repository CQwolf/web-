// 引入
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => { console.log("数据库连接成功") })
    .catch(err => { console.log(err) })

// 创建规则
const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String],
    email: String,
    password: String
});

// 应用规则
const User = mongoose.model("User", userSchema);

// 其他条件查询
// 查找年龄大于20且小于40的数据
User.find({ age: { $gt: 20, $lt: 40 } }).then(result => {
    console.log("大于小于条件");
    console.log(result)
});

// 查找包含字段
User.find({ hobbies: { $in: ["足球"] } }).then(result => {
    console.log("包含条件");
    console.log(result)
});

// 查找需要被查找的字段值，若不想查找某个值，在它之前加一个-，例如-_id
User.find().select("name age -_id").then(result => {
    console.log("指定字段查询条件");
    console.log(result)
});

// 根据字段值升序排序，例如年龄
User.find().sort("age").then(result => {
    console.log("升序条件");
    console.log(result)
});

// 降序加-,例如-age
User.find().sort("-age").then(result => {
    console.log("降序条件");
    console.log(result)
});

// 最后数量跳过和限制显示个数，主要用于分页功能
User.find().skip(2).limit(3).then((result) => {
    console.log("跳过和限制显示条件");
    console.log(result)
});