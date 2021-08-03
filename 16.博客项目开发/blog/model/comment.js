// 引入mongoose模块
const mongoose = require("mongoose");
// 储存页面的评论

// 创建评论集合规则
const commentSchema = mongoose.Schema({
    // 文章的id
    Aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
    // 评论用户的id
    Uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // 评论时间
    time: {
        type: Date,
    },
    // 评论内容
    content: {
        type: String,
    }
});

// 创建集合
const Comment = mongoose.model("Comment", commentSchema);

// 导出集合
module.exports = {
    Comment,
}