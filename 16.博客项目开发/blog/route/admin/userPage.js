// 用户页面
// 引入用户集合
const { User } = require("../../model/user");
const userPage = async(req, res) => {

    // 当前是用户管理页面的标识
    req.app.locals.currentLink = "user";

    // 使用render函数实现模板的响应
    // 从数据库查询所有的数据，然后显示到页面
    // 查询全部用户的数据
    // const user = await User.find({});
    // 页面传递过来的当前页
    let { pid } = req.query;
    // 分页功能
    // 数据的总条数
    const total = await User.countDocuments({});
    // 每页的数据显示量
    const pageSize = 5;
    // 总页数多少为 总条数除以每页的数量的数 并向上取整
    const pageNum = Math.ceil(total / pageSize);
    // 当前页为多少
    let pageId = pid || 1;
    // 需要跳过的数量为 = (当前页页数 - 1) * 每页的数量
    let skipPage = (pageId - 1) * pageSize;
    // 然后分页查询出来每页的数据
    const user = await User.find({}).limit(pageSize).skip(skipPage);
    res.render("admin/user", {
        user: user,
        pageNum: pageNum,
        pageId: pageId,
        total: total,
    });
}

// 导出函数
module.exports = userPage;