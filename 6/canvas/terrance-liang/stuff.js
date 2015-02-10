var drawb = document.getElementById("drawingboard");
var ctx = drawb.getContext("2d");

var clicked = function(e){
    e.preventDefault();
    ctx.beginPath();
    ctx.fillStyle="#34495e";
    ctx.fillRect(e.offsetX,e.offsetY,50,20);
    ctx.stroke();
    ctx.fill();
};

var clear = function(e){
    ctx.clearRect (0, 0, drawb.width, drawb.height);
};

drawb.addEventListener("click", clicked);
var butt = document.getElementById("butt");
butt.addEventListener("click", clear);
