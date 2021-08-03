// 引入mongodb数据库连接模块
const mongoose = require("mongoose");

// 创建集合规则
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 10,
        max: 25
    },
    sex: {
        type: String,
        // enum: ["男", "女"]
    },
    email: {
        type: String,
        email: true
    },
    // 所属学院
    college: {
        type: String,
    },
    hobbies: [String],
    enterDate: {
        type: Date,
        default: new Date()
    }
});

// 以已有的规则创建集合 (students)
const Student = mongoose.model("Student", studentSchema);

// 导出此集合为其他模块所用
module.exports = Student;