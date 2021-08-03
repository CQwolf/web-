// 首先，tab对象有四个功能，
// 切换，删除，增加，修改
// 声明变量获取声明变量的实例的this
var that;
class Tab {
    // 初始化调用的函数
    constructor(id) {
        // 获取声明变量的实例的this
        that = this;
        // 首先需要获取元素
        this.tab = document.querySelector(id);
        // 获取ul
        this.ul = this.tab.querySelector(".fisrstnav ul:first-child");
        // 获取section的父级
        this.fsection = this.tab.querySelector(".tabscon");
        // 获取加号按钮
        this.tabadd = this.tab.querySelector(".tabadd");
        this.init();
    }

    // 更新节点，动态绑定
    updateNode() {
        this.lis = this.tab.querySelectorAll("li");
        this.sections = this.tab.querySelectorAll("section");
        this.removes = this.tab.querySelectorAll(".icon-guanbi");
        // 获取所有li的第一个span
        this.spans = this.tab.querySelectorAll(".fisrstnav li span:first-child");
    }

    // 需要一个init()函数进行对小li的初始化事件绑定
    init() {
        // 先重新获取一次
        this.updateNode();
        // 加号点击后添加一个tab栏目
        this.tabadd.onclick = this.tabAdd;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            // 切换
            this.lis[i].onclick = this.tabToggle;
            // 删除
            this.removes[i].onclick = this.tabRemove;
            // 编辑文字
            this.spans[i].ondblclick = this.tabEdit;
            this.sections[i].ondblclick = this.tabEdit;
        }
    }

    // 1.tab栏切换功能
    tabToggle() {
        // 先清除所有，在给需要的加上
        that.clearClass();
        this.className = "liactive";
        // 因为这里的this指向为当前的li,不是对象声明时候的实例
        // 所以此处应该用that
        that.sections[this.index].className = "conactive";
    }

    // 清除class额外写一个函数，因为可重用
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.sections[i].className = "";
        }
    }

    // 2.tab增加功能
    tabAdd() {
        // 清除格式
        that.clearClass();
        // 点击了加号后添加两个内容，新的li和section
        var random = Math.random();
        var li = '<li class="liactive"><span>新测试</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">' + random + '</section>';
        // 利用 insertAdjacentHTML()方法添加元素到父元素里面的最后
        that.ul.insertAdjacentHTML("beforeend", li);
        that.fsection.insertAdjacentHTML("beforeend", section);
        // 生成了新的li需要重新获取和绑定事件,需要在最后进行重新获取
        that.init();
    }

    // 3.tab栏删除功能
    tabRemove(e) {
        // 防止点击关闭按钮使得父元素li冒泡而触发点击事件
        e.stopPropagation();
        // 获取当前关闭按钮的点击事件的索引号
        var index = this.parentNode.index;
        // 然后将所有的对应索引号的删除
        that.lis[index].remove();
        that.sections[index].remove();
        // 删除后自动重新获取绑定元素
        that.init();
        // 当前此时被选中状态的按钮被没有删除，而是其他未被选中状态的按钮被删除之后，原来的选中状态保持不变
        // 此判断为页面是否有这个类，有就不变，没哟就继续执行下面的代码
        if (document.querySelector(".liactive")) return;
        // 当前此时被选中状态的按钮被删除之后，焦点自动获取到被删除的前一个
        index--;
        // 利用自动点击事件来做，首先还要判断被删除的前一个节点是否存在
        that.lis[index] && that.lis[index].click();
    }

    // 4.tab栏修改功能
    tabEdit() {
        // 获取原span里面的内容
        var str = this.innerHTML;
        // 首先阻拦双击选中文字的默认行为
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 点击后，给当前span里面的添加一个input表单
        var inputStr = "<input type='text' />";
        this.innerHTML = inputStr;
        // 因为需要将当前tab栏的值进行取到文本框中
        // 取到span里面添加后的第一个input
        var input = this.children[0];
        input.value = str;
        // 双击后自动选中文字
        input.select();
        // 当失去焦点或者是按下回车之时，input里面的内容又需要保存到span中
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // 调用一下上面写的失去焦点的函数
                this.blur();
            }
        }
    }
}
new Tab("#tab");