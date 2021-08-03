const fs = require("fs");
const path = require("path");


// 利用函数的返回值进行promise的对象返回
function p1() {
    return new Promise((resolve, reject) => {
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
}

function p2() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "./2.txt"), "utf8", (err, data) => {
            // 错误信息用reject处理
            if (err) {
                reject(err);
                // 正确处理数据用resolve处理
            } else {
                resolve(data);
            }
        })
    });
}

function p3() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "./3.txt"), "utf8", (err, data) => {
            // 错误信息用reject处理
            if (err) {
                reject(err);
                // 正确处理数据用resolve处理
            } else {
                resolve(data);
            }
        })
    });
}

// 然后使用promise的then函数链式调用和返回一个promise的对象
p1().then(r1 => {
        console.log(r1);
        // 在这里返回一个promise对象来调用下一个then函数
        // 实现异步顺序编程和链式编程的特性
        // 同时解决了回调地狱的缺点
        return p2();
    })
    .then(r2 => {
        console.log(r2);
        return p3();
    })
    .then(r3 => {
        console.log(r3);
    })