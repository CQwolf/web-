function aa() {
    var x = 2;
    return function bb() {
        var temp = 5;
        console.log(x + y + temp++);
    };
}
var y = 3;

aa()();