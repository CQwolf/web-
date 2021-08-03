// 文章编辑路由的显示
// 引入文章集合
const { Article } = require("../../model/article");
// 引入日期处理函数
const dateformat = require("dateformat");
const articleEdit = async(req, res) => {
    // 当前是文章页面的标识
    req.app.locals.currentLink = "article";
    // 判断当前是新增还是修改操作
    // 拿到错误信息
    const { _id } = req.query;
    // 用id判断当前是使用修改操作还是增加操作
    if (_id) {
        // 修改操作
        // 查询出来这个id的所有信息
        const article = await Article.findOne({ _id: _id }).populate("author").lean();
        // 渲染添加的页面
        res.render("./admin/article-edit", {
            article: article,
            link: "/admin/article-modify?_id=" + _id,
            button: "修改"
        });
    } else {
        // 新增操作
        // 渲染添加的页面
        res.render("./admin/article-edit", {
            link: "/admin/article-edit",
            button: "添加",
            nowDate: new Date(),
        });
    }
    res.render();
}

// 导出函数
module.exports = articleEdit;