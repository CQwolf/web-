// 使用node中的系统模块fs
const readFile = require("fs");
// 利用绝对路径进行路径拼接
const path = require("path");
// 在使用__dirname来获取绝对目录路径，filename是本文件绝对文件路径
console.log("本文件的绝对目录");
console.log(__dirname);
console.log("本文件的绝对文件路径");

console.log(__filename);
// 文件读取一般使用绝对路径，因为读取的文件一般相较于是当前控制台的目录
// 读文件
readFile.readFile(path.join(__dirname, "./writeFile.js"), "utf-8", (err, doc) => {
    console.log(err);
    console.log(doc);
    console.log(134);
    console.log("程序执行完毕！！")
});