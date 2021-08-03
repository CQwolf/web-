const mongoose = require("mongoose");
// 创建集合规则
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "用户名长度必须大于2"],
        maxlength: [20, "用户名长度必须小于20"],
        trim: true
    },
    age: {
        type: Number,
        min: [18, "年龄必须大于18岁"],
        max: [60, "年龄必须小于60岁"]
    },
    password: String,
    email: String,
    hobbies: [String]
});

// 创建集合并应用规则
const User = mongoose.model("User", userSchema);

module.exports = User;