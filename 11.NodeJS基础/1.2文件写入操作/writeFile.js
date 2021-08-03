// 使用node中的系统模块fs
const writeFile = require("fs");
// path模块操作不同系统的文件路径
const path = require("path");
let wordStr = "你好，我是文件写入程序";
writeFile.writeFile(path.join(__dirname, "./data.txt"), wordStr, err => {
    if (err != null) {
        console.log("文件写入失败" + err);
        return;
    }
    console.log("文件写入成功");
})