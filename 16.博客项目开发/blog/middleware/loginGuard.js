// 登录拦截功能
const guard = (req, res, next) => {
    // 当访问的页面不是登录页面，并且用户未登录时
    if (req.url != "/login" && !req.session.username) {
        // 直接返回到登录页面
        res.redirect("/admin/login");
    } else {
        // 直接把路由的控制权转交到下一个路由的路径匹配
        // 用户登录时 则放行通道
        if (req.url != "/login" && req.session.role == "normal") {
            // 阻止普通用户登录后台管理系统 只能查看网页首页
            return res.redirect("/home/");
        }
        next();
    }
}

// 导出guard函数
module.exports = guard;