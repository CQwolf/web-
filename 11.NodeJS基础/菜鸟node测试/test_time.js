console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);

console.time("获取数据");
//
// 执行一些代码
// 
let sum = 0;
for (let i = 0; i < 100; i++) {
    sum += i;
}
console.log(sum);
console.timeEnd('获取数据');

console.info("程序执行完毕。")