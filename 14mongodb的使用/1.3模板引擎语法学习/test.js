// 引入模板引擎，方便代码的维护和易于查看
const template = require("art-template");
const path = require("path");

// 引入时间信息格式化的模块
const dateformat = require("dateformat");

// 获取对应的art文件的绝对路径
// const targetPath = path.join(__dirname, "views", "test.art");

// 设置一个配置方法，实现时间格式的转换  
// 然后就可以在art或者html文件中使用这个方法了
// 此方法第一个参数为一个对象，第二个时间匹配规则
template.defaults.imports.dateformat = dateformat;

// 设置绝对根路径
template.defaults.root = path.join(__dirname, "views");
// 设置文件的后缀名方法
// 如果写了后缀名，就去查找后缀名相应的文件。如果没写后缀名，以这个后缀名为主
template.defaults.extname = ".art";

// 第一个参数为读取的art文件的路径 路径必须采用绝对路径
// 第二个参数为需要传递的数据,为对象的类型
// 返回值为一个拼接好的字符串变量
const html = template("test", {
    content: "<h1>年后</h1>",
    date: new Date(),
    user: [
        { name: "sb", age: 10 },
        { name: "二货", age: 20 },
        { name: "三傻", age: 30 }
    ]
});
// 打印拼接好的字符串查看效果
console.log(html);