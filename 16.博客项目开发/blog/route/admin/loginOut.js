// 退出登录按钮实现
const loginOut = (req, res) => {
    // 删除session
    req.session.destroy(function() {
        // 删除cookie
        // 这是cookie的默认的名字 清除客户端缓存的cookie
        res.clearCookie("connect.sid");
        // 重定向到用户登录页面
        res.redirect("/admin/login");
    });
}

// 导出函数
module.exports = loginOut;