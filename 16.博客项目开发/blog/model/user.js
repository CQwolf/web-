// 引入mongoose第三方模块
const mongoose = require("mongoose");
// 引入Joi规则进行验证
const Joi = require("joi");
// 创建集合规则
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

// 处理mongoose的错误
mongoose.set("useCreateIndex", true);

// 创建用户集合
const User = mongoose.model("User", userSchema);

// 验证数据函数
async function validateFormData(formData) {
    // 创建一个验证规则
    const schema = {
        username: Joi.string().min(2).max(30).required().error(new Error("用户名长度应在2-30位")),
        email: Joi.string().email().required().error(new Error("邮箱格式不正确")),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,16}$/).required().error(new Error("密码不能包含特殊字符且在3-16位")),
        role: Joi.string().valid("normal", "admin").required().error(new Error("管理员选择有误")),
        state: Joi.number().valid(0, 1).required().error(new Error("账号状态有误"))
    }

    // 然后使用validate方法实现验证
    // 第一个参数是需要被验证的对象
    // 第二个参数是验证的规则
    // 把验证结果返回
    // 因为validate是一个返回promise对象的函数
    return Joi.validate(formData, schema);
}

// 导出用户集合
module.exports = {
    // es6语法支持
    // 当导出对象的key和value一样是即可简写为key
    // 这个写法相当于 User: User
    User,
    validateFormData,
}