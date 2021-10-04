var obj = {
  b: 1,
  aa: () => {
    console.log(this.b, this);
  },
  bb: function () {
    console.log(this.b, this);
  },
};

// 此处为obj调用
obj.aa(); // undefined 、this指向{}
obj.bb(); // 1 、this指向obj

var aa1 = obj.aa;
var bb1 = obj.bb;

// 此处为window调用
aa1(); // undefined this还是指向{}
bb1(); // 1、this指向window
// 箭头函数：箭头函数本身是没有this和arguments的，在箭头函数中引用this实际上是调用的是定义时的上一层作用域的this。
// 这里强调的是上一层作用域，是因为对象是不能形成独立的作用域的
