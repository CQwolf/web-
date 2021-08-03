// 搭建网站服务器，实现客户端与服务器端的通信
// 连接数据库，创建用户集合，向集合中插入文档
// 当用户访问/list时，将所有用户信息查询出来
//  实现路由功能
//  呈现用户列表页面
//  从数据库中查询数据并且显示到列表页中
// 将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
//  1.第一步
//      首先得到需要修改的id查询出来数据
//      其次是进行页面的数据回显
//  2.第二步
//      将修改的数据获取
//      在数据库中修改后进行跳转到list页面
// 当用户访问/delete时，实现用户删除功能
//  直接获取当前的id然后到数据库中删除，最后跳转到list页面

// 导入模块
const http = require("http");
const url = require("url");
const querystring = require("querystring");

// 这里实现模块化开发的准则
// 引入数据库连接
require("./model/index");

// 引入数据库规则创建
const User = require("./model/user");

// 创建服务器
const app = http.createServer();

// 监听客户端的请求
app.on("request", async(req, res) => {

    // 获取提交方式
    const method = req.method;

    // 获取请求的地址  对象解构方式获取值
    // 实现query查询参数的对象化
    const { pathname, query } = url.parse(req.url, true);

    // 一般用于获取数据
    if (method === "GET") {

        // 显示数据库的列表数据 的路由方式
        if (pathname == "/list") {
            // 查询数据库用户的所有信息  此处实现await关键字则需要在函数声明加上async
            let data = await User.find();
            // 使用模板字符串进行拼接操作
            let list = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td>
                            <td>年龄</td>
                            <td>爱好</td>
                            <td>邮箱</td>
                            <td>操作</td>
                        </tr>
                        `;
            data.forEach(element => {
                list += `
                <tr>
				<td>${element.name}</td>
				<td>${element.age}</td>
				<td>
                `;
                // 对爱好进行循环遍历出来
                element.hobbies.forEach(element => {
                    list += `
                    <span>${element}</span>
                    `
                });
                list += `
                </td>
				<td>${element.email}</td>
				<td>
					<a href="/delete?id=${element._id}" class="btn btn-danger btn-xs">删除</a>
					<a href="/modify?id=${element._id}" class="btn btn-success btn-xs">修改</a>
				</td>
			</tr>
            `;
            });
            list += `
            </table>
            </div>
        </body>
        </html>
            `;
            // 然后返回到页面
            res.end(list);
        }

        // 添加功能的路由
        else if (pathname == "/add") {
            // add页面的字符串
            let add = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                      <div class="form-group">
                        <label>用户名</label>
                        <input name="name" type="text" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input name="password" type="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input name="age" type="text" class="form-control" placeholder="请填写年龄">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="足球" name="hobbies"> 足球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="篮球" name="hobbies"> 篮球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="烫头" name="hobbies"> 烫头
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="吃饭" name="hobbies"> 吃饭
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="睡觉" name="hobbies"> 睡觉
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="打豆豆" name="hobbies"> 打豆豆
                            </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            </html>
            `;
            // 返回给浏览器的添加页面
            res.end(add);
        }

        // 修改功能页面的跳转
        else if (pathname == "/modify") {
            // 根据id查询出来的数据显示
            let user = await User.findOne({ _id: query.id });
            // 爱好的选择，用于动态生成选中状态
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头', '吃饭', '睡觉', '打豆豆'];
            // modify页面的字符串
            let modify = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method="post" action="/modify?id=${user._id}">
                      <div class="form-group">
                        <label>用户名</label>
                        <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写年龄">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
            `;
            hobbies.forEach(item => {
                // 判断一下查询的爱好包含了哪些
                // 包含的爱好基于给顶一个选中状态
                let isHobby = user.hobbies.includes(item);
                // 有这个爱好就选中
                if (isHobby) {
                    modify += `<label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                  </label>`
                } else {
                    modify += `<label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies"> ${item}
                  </label>`
                }
            })
            modify += `</div>
                      </div>
                      <button type="submit" class="btn btn-primary">修改用户</button>
                    </form>
                </div>
            </body>
            </html>`
                // 返回给浏览器的添加页面
            res.end(modify);
        }

        // 页面的删除的路由
        else if (pathname == "/delete") {
            // 根据id进行删除
            await User.deleteOne({ _id: query.id });

            // 或者这样
            // await User.findOneAndDelete({ _id: query.id });
            // 然后重定向到list页面
            res.writeHead(301, {
                location: "/list"
            });

            res.end();
        }

    }

    // 一般用于提供功能 例如，添加和删除什么的
    else if (method === "POST") {

        // 处理需要添加的数据
        if (pathname == "/add") {
            // 用于获取用户表单提交的参数
            let formData = "";
            // 获取post的提交参数
            req.on("data", param => {
                formData += param;
            });

            // 获取提交完后的参数处理
            req.on("end", async() => {
                // 将获取的参数转换为对象格式
                user = querystring.parse(formData);
                // 然后向数据添加数据
                // await User.create({
                //     name: params.name,
                //     age: params.age,
                //     password: params.password,
                //     email: params.email,
                //     hobbies: params.hobbies
                // });

                // 或者这种直接将user这个处理过的对象作为第一个参数
                await User.create(user);
                // 添加成功后跳转到list页面
                // 301表示重定向的标码
                res.writeHead(301, {
                    location: "/list"
                });
                // 这个请求用于本次请求的结束
                // 必须加上
                res.end();
            })
        }

        // 处理需要修改的数据
        else if (pathname == "/modify") {
            // 用于获取用户表单提交的修改的数据
            let formData = "";
            // 获取post的提交参数
            req.on("data", param => {
                formData += param;
            });

            // 获取提交完后的参数处理
            req.on("end", async() => {
                // 将获取的参数转换为对象格式
                userUpdate = querystring.parse(formData);
                // 然后根据_id值进行修改，第一个修改的条件，第二个是需要修改的参数
                await User.updateOne({ _id: query.id }, userUpdate);
                // 修改成功后跳转到list页面
                // 301表示重定向的标码
                res.writeHead(301, {
                    location: "/list"
                });
                // 这个请求用于本次请求的结束
                // 必须加上
                res.end();
            })
        }
    }
});

// 监听端口号
app.listen(3000);
console.log("服务器创建成功")