function ajax(options) {

    let defaults = {
        // 请求方式
        type: "get",
        // 请求地址
        url: "",
        // 请求的参数
        data: {},
        "Content-Type": "application/x-www-form-urlencoded",
        // 请求处理成功的函数
        success: function() {},
        // 请求处理失败的函数
        error: function() {},
    };
    // 此方法用于覆盖之前的默认配合
    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults, options);
    // 1.创建ajax对象
    const xhr = new XMLHttpRequest();
    // 用户希望的向服务器端传递的请求参数的类型
    const contentType = defaults["Content-Type"];
    // 得到拼接的字符串
    let paramsStr = "";
    // 参数请求类型为application/x-www-form-urlencoded
    if (contentType == "application/x-www-form-urlencoded") {
        // 拼接传递而来的参数
        const params = [];
        // 拼接参数为
        for (let attr in defaults.data) {
            let str = attr + "=" + defaults.data[attr];
            params.push(str);
        }
        paramsStr = params.join("&");
    }
    // 2.配置路径和参数的传递
    // 第一个参数是请求方式
    // 第二个参数是请求的路径
    // 请求方式为get
    if (defaults.type == "get") {
        xhr.open(defaults.type, defaults.url + "?" + paramsStr);
        // 3.发送请求
        xhr.send();
    }
    // 请求方式为post
    if (defaults.type == "post") {
        xhr.open(defaults.type, defaults.url);
        // 设置请求参数格式的类型
        xhr.setRequestHeader("Content-Type", contentType);
        // 判断用户希望的请求参数格式的类型
        // 如果类型为json
        if (contentType == "application/json") {
            // 向服务器端传递json数据格式的参数
            xhr.send(JSON.stringify(defaults.data));
        } else {
            // 向服务器端传递普通类型的请求参数
            xhr.send(paramsStr);
        }
    }

    // 4.当请求发送完毕后，并且请求处理完毕，接收返回的值
    xhr.onload = function() {
        // 获取返回的数据或信息
        let info = xhr.responseText;
        // 回调函数模块
        // 调用函数success传递参数值，实现回调函数的数据处理
        // 只有状态码为200才是成功调用
        if (xhr.status == 200) {
            // 获取响应头
            const ContentType = xhr.getResponseHeader("Content-Type");
            // 若响应头包含着application/json数据格式的话
            // 则进行转换
            // 转换的对象信息
            let infoParse = {};
            if (ContentType.includes("application/json")) {
                infoParse = JSON.parse(info);
            }
            defaults.success(infoParse, xhr);
        } else {
            //    其他不成功的信息，调用错误的处理函数
            defaults.error(info, xhr);
        }
    }
}



// 函数调用
ajax({
    // 请求方式
    // type: "get",
    // 请求地址
    url: "http://localhost:3000/",
    // 请求的参数
    data: {
        name: "你好",
        age: 20
    },
    // 请求处理成功的函数
    success: function(data, xhr) {
        console.log(data);
    },
    /*
			请求参数要考虑的问题
				1.请求参数位置的问题
					将请求参数传递到ajax函数内部, 在函数内部根据请求方式的不同将请求参数放置在不同的位置
					get 放在请求地址的后面
					post 放在send方法中
				2.请求参数格式的问题
					application/x-www-form-urlencoded
						参数名称=参数值&参数名称=参数值
						name=zhangsan&age=20
					application/json
						{name: 'zhangsan', age: 20}
					1.传递对象数据类型对于函数的调用者更加友好
					2.在函数内部对象数据类型转换为字符串数据类型更加方便
		*/
});