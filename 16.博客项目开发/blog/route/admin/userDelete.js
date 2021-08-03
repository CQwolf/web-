// 用户根据id的删除功能
// 引入用户集合
const { User } = require("../../model/user");
const userDelete = async(req, res) => {
    // 获取id
    const { Did } = req.query;
    // 根据Did删除用户
    await User.deleteOne({ _id: Did });
    // 跳转到主页面
    res.redirect("/admin/user");
}

// 导出函数
module.exports = userDelete;