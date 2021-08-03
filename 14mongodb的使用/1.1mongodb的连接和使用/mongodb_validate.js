// 引入
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => { console.log("数据库连接成功") })
    .catch(err => { console.log(err) })

// 创建规则
const validateSchema = mongoose.Schema({
    name: {
        // 数据类型
        type: String,
        // 必填项
        required: true,
        // 字符串长度，第二个参数为错误的提示信息
        minlength: [2, "名字太短"],
        maxlength: 10,
        trim: true
    },
    age: {
        type: Number,
        // 数字大小值
        min: 1,
        max: 100
    },
    bookTypes: {
        type: String,
        // 枚举的类型，只能输入这几样类型
        enum: ["html", "css", "javascript"]
    },
    author: {
        type: String,
        // 自定义的验证器,可以用于正则匹配的规则
        validate: {
            // 函数类型
            validator: v => {
                return v && v.length >= 2;
            },
            message: "长度应该大于4"
        },
        // 除去输入数据的两端的空格
        trim: true
    },
    publishDate: {
        type: Date,
        // 默认值 Date.now是现在的意思
        default: Date.now
    }
});

// 应用规则
const Validate = mongoose.model("Validate", validateSchema);

// 插入数据
Validate.create({
        name: "猫咪  ",
        age: 10,
        bookTypes: "javascript",
        author: "   老      ",
        // author: "12"
    }).then(result => { console.log(result) })
    .catch(err => {
        因为所有错误信息都是储存在errors对象中的
        const error = err.errors;
        for (var attr in error) {
            console.log(error[attr]["message"]);
        }
    })