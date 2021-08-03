// 用户信息的修改的处理
// 引入用户集合
const { User, validateFormData } = require("../../model/user");

// 引入密码加密的模块
const bcrypt = require("bcrypt");
const userModify = async(req, res, next) => {
    // res.send("ok");
    // 获取id和修改的信息
    const { _id } = req.query;
    const { username, password, email, role, state } = req.body;
    // 根据_id查询出来用户信息
    const user = await User.findOne({ _id: _id });
    // 先判断密码输入是否正确
    // 第一个参数是密码明文，第二个参数是密码密文
    const isEqual = bcrypt.compare(password, user.password);
    if (isEqual) {
        // 密码正确，实现修改
        // 比对数据格式是否正确
        try {
            await validateFormData(req.body);
        } catch (e) {
            // 有错就中断程序继续运行
            // 交给错误处理中间件处理
            const myErr = {
                path: "/admin/user-edit",
                _id: _id,
                message: e.message
            };
            // 触发错误处理中间件
            return next(JSON.stringify(myErr));
        }
        // 查看邮箱是否重复
        const userByEmail = await User.findOne({ email: email });
        // 重复了 且并不是本条需要修改的已在数据库中的邮箱
        // 而是其他用户已经注册的邮箱
        if (userByEmail && user.email != userByEmail.email) {
            // 有错就中断程序继续运行
            // 交给错误处理中间件处理
            const myErr = {
                path: "/admin/user-edit",
                _id: _id,
                message: "邮箱重复导致数据修改失败"
            };
            // 触发错误处理中间件
            return next(JSON.stringify(myErr));
        } else {
            // 若都没问题，继续进行修改
            await User.updateOne({ _id: _id }, {
                username: username,
                email: email,
                state: state,
                role: role,
            });
            // 插入完成后返回主界面
            res.redirect("/admin/user");
        }
    } else {
        // 密码不正确的话
        const myErr = {
            path: "/admin/user-edit",
            _id: _id,
            message: "密码不正确导致数据修改失败"
        };
        next(JSON.stringify(myErr));
    }
}

module.exports = userModify;