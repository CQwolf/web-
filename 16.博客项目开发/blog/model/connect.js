// 引入mongoose第三方模块
const mongoose = require("mongoose");
// 引入config获取配置的数据库信息
const config = require("config");
// 数据库连接
// 第一个cq是用户名 第二个cq是密码
// 然后使用mongodb: //user:pass@localhost:port/dbName
// 通过config.get("对象.属性名")获取配置的值
mongoose.connect(`mongodb://${config.get("db.user")}:${config.get("db.pwd")}@${config.get("db.host")}:${config.get("db.port")}/${config.get("db.name")}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("数据库连接成功") })
    .catch(err => { console.log(err, "数据库连接失败") });