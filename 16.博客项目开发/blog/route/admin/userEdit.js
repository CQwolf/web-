// 用户添加页面
// 引入用户集合
const { User } = require("../../model/user");
const userEdit = async(req, res) => {

    // 当前是用户管理页面的标识
    req.app.locals.currentLink = "user";

    // 拿到错误信息
    const { message, _id } = req.query;
    // 用id判断当前是使用修改操作还是增加操作
    if (_id) {
        // 修改操作
        // 查询出来这个id的所有信息
        const user = await User.findOne({ _id: _id });
        // 渲染添加的页面
        res.render("admin/user-edit", {
            message: message,
            user: user,
            link: "/admin/user-modify?_id=" + _id,
            button: "修改"
        });
    } else {
        // 新增操作
        // 渲染添加的页面
        res.render("admin/user-edit", {
            message: message,
            link: "/admin/user-edit",
            button: "添加"
        });
    }

}

// 导出函数
module.exports = userEdit;