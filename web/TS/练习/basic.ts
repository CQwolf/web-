// : type把ts变量的类型定死，如同Java不能随意赋值不同类型的数值
let a: string = "hello";
// a= 10

// 枚举赋值 通过|连接 也称为联合类型

let b: "mele" | "female" | "1" | 1;

b = 1;

// 相当于关闭类型检测，如同原生js
let c: any;

// unknown表示未知类型
let e: unknown;

let s: string = "string";

// any类型可以直接赋值给任意变量
s = c;

// 而unknown类型不能直接赋值给s,需要做类型判断
if (typeof e === "string") {
  s = e;
}
// s=e

// 类型断言，我们已知变量为什么类型，但编译器不知道，所以需要我们去判断
let f: string = e as string;
// 或者 两者效果等同
f = <string> e


// void用于表示函数的返回值，表示返回为空，null和undefined都可以返回
function init(): void {
    // return null
    return undefined
}

// never是不返回值,永远不会返回结果
// 用于程序报错
function init1():never {
    throw new Error("出错了")
}

