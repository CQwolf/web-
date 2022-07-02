// 回调函数的参数
function back(data) {
    console.log(data);
}

function callback(f) {
    const data = {
        name: "小全",
        white: "白色",
    };

    f(data);
}

callback(back);