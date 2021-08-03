// 删除文章的功能
const { Article } = require('../../model/article');
const articleDelete = async(req, res) => {
    const Did = req.query.Did;
    // 删除文章
    await Article.deleteOne({ _id: Did });
    // 返回到首页
    res.redirect("/admin/article");
}

// 导出函数
module.exports = articleDelete;