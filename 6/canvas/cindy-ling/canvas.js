var c = document.getElementById("can");
var ctx = c.getContext("2d");



ctx.beginPath();
ctx.arc(650,300,300,0,2*Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.stroke();

var clicked = function(e) {
    console.log(b);
    e.preventDefault();
    ctx.arc(650,150,150,0,2*Math.PI);
    ctx.arc(650,150,150,0,2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();

};

var clear = function(e) {
};

c.addEventListener("click", clicked);
var b = document.getElementById("dup");

