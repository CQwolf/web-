// 文章列表路由的显示
// 引入文章集合
const { Article } = require("../../model/article");
// 引入mongoose系统分页效果
const pagination = require("mongoose-sex-page");

const article = async(req, res) => {
    // 当前是文章页面的标识
    req.app.locals.currentLink = "article";

    const currentPage = req.query.page;

    // 从数据库查询数据
    // .populate函数是查询本表与其他表相关的字段
    // 使用populate("关联的字段名")
    //  使用方法 ：pagination(集合构造函数).page(1) .size(20) .display(8) .exec();
    const article = await pagination(Article).find().page(currentPage).size(4).display(3).populate("author").exec();
    // 处理返回文档类型为普通类型
    const article1 = JSON.stringify(article);
    const article2 = JSON.parse(article1);
    // return res.send(article2);
    // console.log(article);
    res.render("./admin/article", {
        article: article2,
    });
}

// 导出函数
module.exports = article;