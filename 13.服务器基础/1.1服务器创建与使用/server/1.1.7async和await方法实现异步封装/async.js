// 1.async 关键字用于实现把普通函数变为异步函数里面
// 2.async 函数的return返回值为promise 对象，例如：promise {undefined}
// 3.async 函数的错误值使用throw来实现错误信息的输出
// 4.async 函数实现正常promise对象的后序调用


// await 关键字只用于在异步函数里面使用
// await promise并且能够暂停当前异步函数的运行，直到返回promise对象的结果后向下执行
// 例子1：async的使用
// async function p1() {

//     throw "错误";
//     return "123";
// }

// p1().then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     })


// 例子2 ：await使用
async function p1() {
    return "p1";
}

async function p2() {
    return "p2";
}

async function p3() {
    return "p3";
}

// 使用一个run函数来专门调用异步函数
async function run() {
    // 实现p1， p2， p3的顺序执行
    let r1 = await p1();
    let r2 = await p2();
    let r3 = await p3();
    console.log(r1);
    console.log(r2);
    console.log(r3);
}

run();