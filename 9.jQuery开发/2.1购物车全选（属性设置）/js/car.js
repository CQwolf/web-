$(function() {
    // 1.全选部分开始
    // 首先是全选按钮选中时，小按钮也要选中，即按钮的变化跟随全选变化
    // change事件，当状态改变时就做一次
    $(".checkall").change(function() {
        // 当前按钮的属性获取
        // $(this).prop("checked");
        // 小按钮跟随全选的状态
        $(".j-checkbox").prop("checked", $(this).prop("checked"));
        // 因为有两个全选，所以需要给两个全选再次赋值
        $(".checkall").prop("checked", $(this).prop("checked"));
        // 6.添加背景模块
        if ($(this).prop("checked")) {
            // 如果全选按钮状态变化后被选中，全部商品项则添加背景
            $(".cart-item").addClass("check-cart-item");
        } else {
            // 反之，去掉背景
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 第二步就是需要对小按钮实现判断，假如小按钮全选中，也要实现全选被选中
    // 每次状态改变时都需要判断
    $(".j-checkbox").change(function() {
        // 用$(".j-checkbox:checked")获取当前已经被选中的小按钮
        // console.log($(".j-checkbox:checked").length);
        // 当选中值等于全部小按钮的值，全选按钮选中
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        }
        // 没有选中则继续当前的未选中状态
        else {
            $(".checkall").prop("checked", false);
        }
        // 6.添加背景模块
        if ($(this).prop("checked")) {
            // 如果按钮状态变化后被选中，则添加背景
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // 反之，去掉背景
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    // 全选部分结束

    // 2.商品增减模块开始、3.小计模块
    // 先实现一个变量值获取文本框的数字
    // 通过加减号的兄弟元素文本框来实现值的变化，在利用this对当前操作的文本框进行变化
    // 以达到各个文本框的值互不干扰
    // 增加
    $(".increment").click(function() {
        // 获取当前文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        // 加一后把值传回文本框内
        $(this).siblings(".itxt").val(n);
        // 获取当前点击的商品的单价。利用html()或者text
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // 去掉人民币符号
        p = p.substr(1);
        // 然后对应的修改小计的值，通过toFixed()函数确定保留几位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        // 当数量修改或者是增减都重新计算一次
        getPriceSum();
    });
    // 减少也是一样的
    $(".decrement").click(function() {
        // 获取当前文本框的值
        var n = $(this).siblings(".itxt").val();
        // 但需要做一个判断，如果值小于1,那么将不能继续减少
        if (n <= 1) {
            return;
        }
        n--;
        // 减一后把值传回文本框内
        $(this).siblings(".itxt").val(n);
        // 获取当前点击的商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // 去掉人民币符号
        p = p.substr(1);
        // 然后对应的修改小计的值，通过toFixed()函数确定保留几位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getPriceSum();
    });
    // 当数量被直接修改时，利用change事件进行相关的小计计算
    $(".itxt").change(function() {
        // 获取修改后的商品数量
        var n = $(this).val();
        // 获取当前点击的商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // 去掉人民币符号
        p = p.substr(1);
        // 然后对应的修改小计的值，通过toFixed()函数确定保留几位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getPriceSum();
    });
    // 商品增减模块结束
    // 4.商品总选数量和总价格计算，包含$.each()和$("dom").each()方法
    // 封装一个计算函数
    // 初始化调用一次，使得页面正确化
    getPriceSum();

    function getPriceSum() {
        // 用于获取商品总数量
        var totalNumber = 0;
        // 用户获取商品总价格
        var totalPrice = 0;
        // 用 each()方法获取每个文本框里面的数量值，得到总数量值
        // 因为element是DOM对象。不是一个jQuery对象， 所以需要包装
        $(".itxt").each(function(index, element) {
            totalNumber += parseInt($(element).val());
        });
        // 然后将结算模块里面的值重新复制
        $(".amount-sum em").text(totalNumber);
        // 价格也是相同方法
        $(".p-sum").each(function(index, element) {
            totalPrice += parseFloat($(element).text().substr(1));
        });
        // 然后将结算模块里面的值重新复制
        $(".price-sum em").text("￥" + totalPrice.toFixed(2));
    }
    // 5.删除商品模块开始
    // 5.1 点击商品后面删除，利用this和remove()删除对应的模块栏
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        // 因为删除商品会变化，所调用getPriceSum进行重新计算
        getPriceSum();
    });
    // 5.2 删除选择的模块栏
    $(".remove-batch").click(function() {
        // 被选中的表单的商品项会被删除
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getPriceSum();
    });
    // 5.3 清空购物车里面的模块栏
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getPriceSum();
    });
    // 删除商品模块结束
})