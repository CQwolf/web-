// 导入jQuery
import $ from "jquery";
import "./css/1.css";
import "./css/1.less";
import "./css/1.scss";


// 引入vue
import Vue from "vue";

// 导入vue单文件组件
import my from "./components/my.vue";

$(function() {
    $("li:odd").css("background", "green");
    $("li:even").css("background", "red");
})
class Person {
    static s1 = "aaa"
}
console.log(Person.s1);

const vm = new Vue({
    el: "#app",
    // 使用render函数渲染模板
    render: h => h(my),
});