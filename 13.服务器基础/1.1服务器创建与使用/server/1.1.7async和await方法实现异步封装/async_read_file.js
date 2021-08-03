// async和await实现简化，且没有回调地狱
// 使用await和async关键字来实现读取文件的异步按顺序的读取
const fs = require("fs");
// 拼接路径操作
const path = require("path");
// 将其他api转换为返回promise对象的函数 以实现异步函数的await关键字的使用
const promisify = require("util").promisify;
// 将fs中的函数实现转换为异步函数，返回值为promise
const readFile = promisify(fs.readFile);

// 然后是实现异步函数的读取文件方法
async function run() {

    // 异步读取并且实现顺序读操作await关键字实现顺序操作
    let r1 = await readFile(path.join(__dirname, "./1.txt"), "utf8");
    let r2 = await readFile(path.join(__dirname, "./2.txt"), "utf8");
    let r3 = await readFile(path.join(__dirname, "./3.txt"), "utf8");

    // 然后输出文件内容
    console.log(r1);
    console.log(r2);
    console.log(r3);
}

// 调用函数
run();