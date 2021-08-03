// 存储评论的处理
// 引入评论集合
const { Comment } = require("../../model/comment");
module.exports = async(req, res) => {
    // 接收提交的数据
    const comment = req.body;
    comment.time = new Date();
    // res.send(comment);
    // 存入数据库中
    await Comment.create(comment);
    // 然后重定向到此页面实现刷新
    res.redirect("/home/article?_id=" + comment.Aid);
}