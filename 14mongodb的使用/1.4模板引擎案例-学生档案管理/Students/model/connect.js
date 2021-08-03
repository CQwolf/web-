// 引入mongodb数据库连接模块
const mongoose = require("mongoose");

// 连接数据库

mongoose.connect("mongodb://pd:pd@localhost:27017/playground", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("数据库连接成功") })
    .catch((error) => { console.log("数据库连接失败") });