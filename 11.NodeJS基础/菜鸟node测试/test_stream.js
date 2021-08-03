var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');
// 设置为一个utf8的编码实现中文的识别
readerStream.setEncoding('utf8');
readerStream.on('end', function() {
    console.log("读完数据")
})

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');
writerStream.setDefaultEncoding("utf8");
writerStream.on("finish", function() {
    console.log("写完数据")
})

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");