// 导出首页模块
// 引入文章集合
const { Article } = require("../../model/article");
// 文章分页效果
const pagination = require("mongoose-sex-page");
module.exports = async(req, res) => {
    // 表明这是首页
    const currentPageName = "index";
    // 获取页面传递来的当前页面
    const currentPage = req.query.cPage || 1;
    // 读取出数据库的信息，显示到页面
    const article = await pagination(Article).find({}).page(currentPage).size(6).display(3).populate("author").exec();
    // 处理返回文档类型为普通类型
    const articleMid = JSON.stringify(article);
    const articles = JSON.parse(articleMid);
    // return res.send(articles);
    res.render("home/default", { articles, currentPageName });
}