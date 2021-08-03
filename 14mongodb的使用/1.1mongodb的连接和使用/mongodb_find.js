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

// 使用find方法查询，第一参数是查询匹配规则，返回值为一个数组，数组每一项是一个数据条
// User.find({ name: "李四" })
//     .then((result) => { console.log(result) })


// findOne方法只返回一条数据，以对象形式
User.findOne({ name: "李四" })
    .then((result) => { console.log(result) })