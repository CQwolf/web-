const path = require("path");
// 引入预览首页入口
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html"
});
// vue处理打包
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const vuePlugin = new VueLoaderPlugin();
module.exports = {
    // 创建构造模式
    // development为开发模式
    // production为生产模式
    mode: "development",
    // 文件打包源地址
    entry: {
        path: path.join(__dirname, "./src/index.js")
    },
    // 文件的输出地址
    output: {
        path: path.join(__dirname, "./dist"),
        // 输出的名字
        filename: "bundle.js"
    },
    // 预览页面生成
    plugins: [htmlWebpackPlugin, vuePlugin],
    // 配置其他文件打包规则
    module: {
        rules: [{
            // 配置css文件匹配规则。可使用正则表达式
            test: /\.css$/,
            // 打包这个文件的loader
            // 从后往前的调用不能写反顺序
            use: ["style-loader", "css-loader", "postcss-loader"]
        }, {
            // 配置less文件匹配规则。可使用正则表达式
            test: /\.less$/,
            // 打包这个文件的loader
            // 从后往前的调用不能写反顺序
            use: ["style-loader", "css-loader", "less-loader"]
        }, {
            // 配置sass文件匹配规则。可使用正则表达式
            test: /\.scss$/,
            // 打包这个文件的loader
            // 从后往前的调用不能写反顺序
            use: ["style-loader", "css-loader", "sass-loader"],
        }, {
            // 配置图片等文件的打包 转换为base64格式的图片，便于实现提高速度的加载
            test: /\.(jpg|png|gif|bmp|ttf|eot|svg|woff|woff2)$/,
            //limit用来设置字节数，只有小于limit值的图片，才会转换
            //为base64图片
            use: ["url-loader?limit=20000&name=[hash:8]-[name].[ext]"]
        }, {
            // 处理自己写的js文件
            test: /\.js$/,
            use: "babel-loader",
            //exclude为排除项，意思是不要处理node_modules中的js文件
            exclude: /node_modules/
        }, {
            // 处理vue单文件组件
            test: /\.vue$/,
            loader: "vue-loader",
        }]
    }
}