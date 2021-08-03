// 引入mongoose第三方模块
const mongoose = require("mongoose");

// 创建文章集合规则
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "请输入标题"],
        minlength: 2,
        maxlength: 20
    },
    author: {
        // 关联User集合里面的_id属性
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "请填写发布的作者"]
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String,
    },
}, {
    // 用于保存时间
    timestamps: {
        publishDate: "created",
    },
});

// 创建文章集合
const Article = mongoose.model("Article", articleSchema);

// 导出文章集合给其他模块使用
module.exports = { Article };