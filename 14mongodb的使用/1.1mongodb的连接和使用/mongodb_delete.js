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

// 删除一条匹配的数据
// 返回值为当前删除的文档对象
// 若匹配多条数据。则删除匹配的第一条数据
User.findOneAndDelete({ _id: "5c09f267aeb04b22f8460968" }).then(result => { console.log(result) });

// 删除多条数据
// 若匹配规则为空的话会导致，删除数据库所有数据，谨慎操作
// 返回值为删除了多少条数据，以及这条操作是否成功
User.deleteMany({}).then(result => { console.log(result) });