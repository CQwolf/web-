let version = "8.9";
// 箭头函数，模板字面量，let和const
const sayHi = userName => "你好欢迎" + `${userName}`;
// 导出变量利用export对象
exports.version = version;
exports.sayHi = sayHi;
// 最终以module.exports为准
module.exports = {
    version: "module2.0",
    sayHi: userName => "你好，module.exports欢迎" + `${userName}`
}