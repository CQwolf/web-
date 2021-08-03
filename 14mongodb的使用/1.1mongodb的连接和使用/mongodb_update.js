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

// 修改一条匹配的数据
// 返回当前修改的行数，影响
// 若匹配多条数据。则删除匹配的第一条数据
// 第一参数为被修改的数据，第二个参数为需要修改为这样的的数据
User.updateOne({ name: "李四" }, { name: "李狗蛋" }).then(result => { console.log(result) });

// 修改多条数据
// 若匹配规则为空的话会导致，修改数据库所有数据，谨慎操作
// 返回值为修改了多少条数据，以及这条操作是否成功
User.updateMany({}, { age: 56 }).then(result => { console.log(result) });