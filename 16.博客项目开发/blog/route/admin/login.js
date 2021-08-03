// 登录页面的判断
// 引入用户集合
const { User } = require("../../model/user");
// 引入密码加密的模块
const bcrypt = require("bcrypt");
const login = async(req, res) => {
    // 使用这个方法获取post参数需要
    // 使用模块body-parser
    // 第二层服务器的判断
    // es6语法，对象解构
    const { email, password } = req.body;
    // 当输入的邮箱和密码为空时
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render("admin/error", { msg: "邮箱或者密码为空！！" });
    }
    // 在数据库中查找这个用户登录的数据
    const user = await User.findOne({ email });
    // 找到的情况
    if (user) {
        // 查看密码加密后和数据的是否相等
        // 第一个参数是明文密码
        // 第二个参数是加密后的密码
        const isEqual = await bcrypt.compare(password, user.password);
        if (isEqual) {
            // 将用户名存储到session域中
            req.session.username = user.username;
            req.session.role = user.role;
            // 将用户登录后的所有信息储存到共享的对象中
            // 实现多个页面的访问
            req.app.locals.userInfo = user;
            // 普通用户跳转到首页，管理员去往后台管理系统
            if (req.session.role == "normal") {
                res.redirect("/home/");
            } else {
                res.redirect("/admin/user");
            }
        } else {
            res.status(400).render("admin/error", { msg: "邮箱或者密码错误！！" });
        }
    } else {
        res.status(400).render("admin/error", { msg: "邮箱或者密码错误！！" });
    }
}

// 导出登录判断函数
module.exports = login;