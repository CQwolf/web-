/**
 *
 *
 * @param {*} a
 * @param {*} b
 * @return {*} 
 */
var addBinary = function(a, b) {
    // 分别转换成数组
    let arrA = a.length < b.length ? a.split("") : b.split("");
    let arrB = a.length >= b.length ? a.split("") : b.split("");
    // 获取较短的长度
    let lenMin = arrA.length <= arrB.length ? arrA.length : arrB.length;
    // 获取较长的长度
    let lenMax = arrA.length >= arrB.length ? arrA.length : arrB.length;
    // 进位
    let cIn = 0;
    // 求和的字符串
    let sumStr = "";
    let sumStr1 = "";
    // 中间相加数
    let temp = 0;
    for (let i = lenMin - 1; i >= 0; i--) {
        temp = parseInt(arrA[i]) + parseInt(arrB[lenMax - lenMin + i]) + cIn;
        console.log(parseInt(arrA[i]), parseInt(arrA[i]) + parseInt(arrB[lenMax - lenMin + i]), parseInt(arrB[lenMax - lenMin + i]),
            lenMax - lenMin + i, temp, cIn);
        if (temp >= 2) {
            cIn = 1;
            sumStr += temp % 2;
        } else {
            cIn = 0;
            sumStr += temp;
        }
    }
    for (let i = lenMax - lenMin - 1; i >= 0; i--) {
        temp = parseInt(arrB[i]) + cIn;
        if (temp >= 2) {
            cIn = 1;
            sumStr += temp % 2;
        } else {
            cIn = 0;
            sumStr += temp;
        }
    }
    if (cIn == 1) {
        sumStr += cIn;
    }
    for (let i = 0; i < sumStr.length; i++) {
        sumStr1 += sumStr.charAt(sumStr.length - i - 1);
    }
    return sumStr1;
};
console.log(addBinary("1010", "1011"));
console.log(addBinary("11", "1"));