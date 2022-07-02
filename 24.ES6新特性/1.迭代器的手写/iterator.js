let banji = {
    name: "终极一班",
    status: ["琦玉", "大蛇", "奈克斯", "死神"],
    // iterator是一个返回迭代对象的函数
    // 这个迭代对象必须包含一些next函数
    // 这个next函数返回一个带有value和done的对象
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.status.length) {
                    const result = {
                        value: this.status[index],
                        done: false,
                    };
                    index++;
                    return result;
                } else {
                    const result = {
                        value: undefined,
                        done: true,
                    };
                    return result;
                }
            },
        };
    },
};
// 用for of来循环迭代他
for (let key of banji) {
    console.log(key);
}