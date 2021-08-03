// 引用Gulp模块
const gulp = require('gulp');
// 引入gulp-htmlmin插件,实现html压缩
const htmlmin = require('gulp-htmlmin');
// 实现相同的文件包含
const fileinclude = require('gulp-file-include');
// less语法转换为css
const less = require('gulp-less');
// css文件压缩
const csso = require('gulp-csso');
// es6语法转换为es5
const babel = require('gulp-babel');
// js代码压缩
const uglify = require('gulp-uglify');

// 使用gulp.task创建任务
// 1.任务名称
// 2.任务回调函数
// 复制文件
gulp.task("first", () => {
    console.log("第一个gulp任务");
    // 1.使用gulp.src获取需要处理的文件
    gulp.src("./src/css/base.css")
        .pipe(gulp.dest("dist/css"));
})

// 因为4.0版本的写法必须加一个done的函数，且结束语句为done();
// 压缩html文件
// 1.相同头部文件的抽取
// 2.html文件的压缩
gulp.task("htmlmin", done => {
    gulp.src("./src/*.html")
        // 相同文件导入头部
        .pipe(fileinclude())
        // 压缩html文件
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
    done();
})

// 压缩CSS代码
// 1.less语法转换为CSS
// 2.css代码的压缩
gulp.task("cssmin", done => {
    // 利用数组传参，多种文件选择
    gulp.src(["./src/css/*.less", "./src/css/*.css"])
        // less转css
        .pipe(less())
        // css文件压缩
        .pipe(csso())
        .pipe(gulp.dest("dist/css"));
    done();
})

// javascript代码任务
// 1.es6代码转换
// 2.代码压缩
gulp.task("jsmin", done => {
    gulp.src("./src/js/*.js")
        // es6转换为es5
        .pipe(babel({
            // 判断当前代码运行环境，
            // 将代码转换为当前运行环境所支持的代码环境
            presets: ['@babel/env']
        }))
        // 压缩操作
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
    done();
})

// 复制文件夹
gulp.task("copyfile", done => {
    gulp.src("./src/images/*")
        .pipe(gulp.dest("dist/images"));

    gulp.src("./src/lib/sweetalert/*")
        .pipe(gulp.dest("dist/lib"));

    done();
})

// 构建任务
gulp.task("default", gulp.series(["htmlmin", "cssmin", "jsmin", "copyfile"], done => { done(); }));