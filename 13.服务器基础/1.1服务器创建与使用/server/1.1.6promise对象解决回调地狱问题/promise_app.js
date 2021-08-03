// 异步顺序读取文件，并使用promise解决回调地狱问题
const fs = require("fs");
const path = require("path");
// 文件顺序读取通过promise实现
let promise = new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "./1.txt"), "utf8", (err, data) => {
        // 错误信息用reject处理
        if (err) {
            reject(err);
            // 正确处理数据用resolve处理
        } else {
            resolve(data);
        }
    })
});
console.log(__dirname + "\\1.txt");

// 使用then方法实现正确读取的处理
// 使用catch方法实现读取错误的处理
promise.then(result => {
        console.log(result);
    })
    // 链式编程
    .catch(error => {
        console.log(error);
    })