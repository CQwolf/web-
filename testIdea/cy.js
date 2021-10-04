console.log("*******************T1***********************");

function f1() {
    console.log(1);
    return new Promise.reject("4");
}

async function f2() {
    console.log(2);
    await f1();
    console.log(3);
}
f2();
console.log("******************************************");
console.log("*******************T2***********************");
// let n = 1;
// (function f3() {
//     n++;
// })();
// f3();
// console.log(n);
console.log("******************************************");
console.log("*******************T3***********************");
let a = 10;
let b = 15;
let result1 = a & b;
let result2 = a | b;
console.log(result1);
console.log(result2);
console.log("******************************************");
console.log("*******************T4***********************");
let nc = 22;
let n1 = 0;
while (true) {
    if (nc-- < 0) {
        n1++;
        break;
    }
}
console.log(n1);
console.log("******************************************");