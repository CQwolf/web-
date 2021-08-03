// 导出文章详情页面的模块
// 引入文章集合
const { Article } = require("../../model/article");
// 引入评论集合
const { Comment } = require("../../model/comment");
module.exports = async(req, res) => {
    // 接收到所获取的_id
    const { _id } = req.query;
    // 读取出数据库的信息，显示到页面
    // 读取文章信息
    const article = await Article.findOne({ _id }).populate("author").lean();
    // 读取评论信息
    const comments = await Comment.find({ Aid: _id }).populate("Uid").lean();
    // return res.send(article);
    res.render("home/article", { article, comments });
}