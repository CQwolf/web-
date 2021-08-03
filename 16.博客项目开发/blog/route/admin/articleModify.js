// 修改的数据处理
// 引入文章集合
const { Article } = require("../../model/article");
// 引入表单处理模块
const formidable = require("formidable");
const path = require("path");
const articleModify = (req, res) => {
    // 获取id号
    const { _id } = req.query;
    // 用formidable处理提交格式为图片的数据
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.设置图片的上传路径
    form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
    // 3.设置是否保留文件后缀
    form.keepExtensions = true;
    // 4.解析表单
    // 第一个参数为req,第二个参数为文件处理的结果函数
    form.parse(req, async(err, fields, files) => {
        // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
        // 2.fields 对象类型 保存普通表单数据 
        // 3.files 对象类型 保存了和上传文件相关的数据
        // return res.send(files.cover.path.split('public')[1]);
        // return res.send(fields);
        // return res.send(files);
        // 对图片路径做判断是否更新
        // 取出图片的相对路径
        const coverOld = files.cover.path.split('public')[1];
        const article = {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            content: fields.content,
        };
        // 重新选择了文件
        if (files.cover.size > 0) {
            article.cover = coverOld;
        }
        // return res.send(files);
        // 图片的路径类似于这种
        // D:\\重庆理工大学（需备份）\\课外学习爱好\\web学习\\web学习个人\\练习实例\\16.博客项目开发\\blog\\public\\uploads\\upload_ede4a5deb80242493bbf0cdeb81b579c.png
        // 更新数据到数据到数据库
        await Article.updateOne({ _id: _id }, article);
        // 将页面重定向到文章列表页面
        res.redirect('/admin/article');
    })
}

// 导出函数
module.exports = articleModify;