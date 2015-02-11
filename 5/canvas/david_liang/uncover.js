var c = document.getElementById("c");
var ctx = c.getContext("2d");

var clear = function(e) {
    ctx.clearRect(0,0,c.width,c.height);
}

var uncover = function(e) {
    var num = Math.random() * 3;
    if (num <= 1) {
        var img = document.getElementById("p");
    } else if (num <= 2) {
        var img = document.getElementById("f");
    } else {
        var img = document.getElementById("a");
    }
    ctx.drawImage(img,10,10);
}

c.addEventListener("click",uncover);
var b = document.getElementById("b");
b.addEventListener("click",clear);
