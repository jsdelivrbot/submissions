var c = document.getElementById("c");
var ctx = c.getContext("2d");

var clicked = function(e){
    
};

var clear = function(e){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
};
c.addEventListener("click",clicked);
var b = document.getElementById("b");
b.addEventListener("click",clear);
