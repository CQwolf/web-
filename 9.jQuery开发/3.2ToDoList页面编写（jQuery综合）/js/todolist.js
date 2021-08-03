// 接口函数
$(function() {
    // 首先页面进入时自动渲染
    load();
    // 首先是在header里面的点了回车keyCode == 13,然后保存数据
    // 需要使用键盘事件里面的keydown和event获取键盘值
    // 需要的数据类型为：{title:"",done:false}
    $("#title").on("keydown", function(event) {
        // 1.本地储存数据
        // 当值为13时才有用
        if (event.keyCode === 13) {
            if ($(this).val() == "") {
                alert("请输入事件");
            } else {
                // 首先需要读取本地localStorage里面的数据
                var local = getData();
                // 然后追加数据到这个local
                // 这个title就根据用户输入值， 所以用$(this).val();
                local.push({ title: $(this).val(), done: false });
                // 然后储存到本地
                saveData(local);
                // 2.取出数据进行渲染
                // 添加数据时渲染
                load();
                // 清空当前框，便于输入
                $(this).val("");
            }
        }
    });

    // 3.点击a删除当前的数据
    $("ol,ul").on("click", "a", function() {
        // 获取数据
        var data = getData();
        // 修改数据
        // 获取当前点的index
        var index = $(this).attr("index");
        // 再用splice(从哪里就开始删除,删除几个元素)
        data.splice(index, 1);
        // 保存数据
        saveData(data);
        // 渲染页面
        load();
    });

    // 4.根据两边的input选中，改变done的值
    $("ol,ul").on("click", "input", function() {
        // 获取数据
        var data = getData();
        // 修改数据
        // 获取当前点的index
        var index = $(this).siblings("a").attr("index");
        // 再用splice(从哪里就开始删除,删除几个元素)
        data[index].done = $(this).prop("checked");
        // 保存数据
        saveData(data);
        // 渲染页面
        load();
    });
    // 读取本地数据的函数
    function getData() {
        // 从todolist获取值
        var data = localStorage.getItem("todolist");
        // 原来有值
        if (data !== null) {
            // 因为本地storage只能储存字符串类型
            // 而我们需要对象类型，所以用JSON.parse()方法转换字符串类型为对象类型
            return JSON.parse(data);
        } else {
            // 没有数据则返回空数组
            return [];
        }
    }

    //储存本地数据
    function saveData(data) {
        // 同理，本地只能储存字符串类型的值，需要将对象转换为字符串
        // 利用JSON.stringify()方法
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 添加li进行渲染函数
    function load() {
        // 先获取数据
        var data = getData();
        // 然后清空ol和ul里面的li
        $("ol,ul").empty();
        // 统计todo和done的数量
        var todoNum = 0;
        var done = 0;
        // 然后遍历这个数据进行生成li
        $.each(data, function(index, valData) {
            // 根据done的值确定应该渲染到ul还是ol
            if (!valData.done) {
                var insert = "<li><input type='checkbox'><p>" + valData.title + "</p><a herf='javascript:;' index='" + index + "' title = '点击我删除此事件'></a></li>";
                $("ol").prepend(insert);
                todoNum++;
            } else {
                var insert = "<li><input type='checkbox' checked='checked'><p>" + valData.title + "</p><a herf='javascript:;' index='" + index + "' title = '点击我删除此事件'></a></li>";
                $("ul").prepend(insert);
                done++;
            }
            // 显示到页面中
            $("#todocount").text(todoNum);
            $("#donecount").text(done);
        });
    }
})