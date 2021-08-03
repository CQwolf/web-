// 添加的数据处理
// 引入用户集合
const { User, validateFormData } = require("../../model/user");

// 引入密码加密的模块
const bcrypt = require("bcrypt");
const userAdd = async(req, res, next) => {
    // 捕获返回为promise对象的异常
    // 或者是同步代码的异常
    try {
        // 调用自己所写的验证函数
        // 此函数的返回值为promise对象
        await validateFormData(req.body);
    } catch (e) {
        // 有错就中断程序继续运行
        // 交给错误处理中间件处理
        const myErr = {
            path: "/admin/user-edit",
            message: e.message
        };
        // 触发错误处理中间件
        return next(JSON.stringify(myErr));
    }

    // 查看邮箱是否重复
    const user = await User.findOne({ email: req.body.email });
    // 重复了
    if (user) {
        // 有错就中断程序继续运行
        // 交给错误处理中间件处理
        const myErr = {
            path: "/admin/user-edit",
            message: "邮箱重复，当前输入的邮箱不可用"
        };
        // 触发错误处理中间件
        return next(JSON.stringify(myErr));
    } else {
        // 然后使用密码加密模块插入数据
        // 生成一个随机字符串
        const salt = await bcrypt.genSalt(10);
        // 生成加密的密码
        const newMessage = await bcrypt.hash(req.body.password, salt);
        // 将密码赋给原对象
        req.body.password = newMessage;
        // 然后调用create函数插入数据
        await User.create(req.body);
        // 插入完成后返回主界面
        res.redirect("/admin/user");
    }

}

// 导出函数
module.exports = userAdd;