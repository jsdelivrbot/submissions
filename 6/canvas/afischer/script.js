var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var dx = 5;
var dy = 5;
var x = 300;
var y = 300;
var width = 600;
var height = 600;

function circle(x,y,r) {
ctx.beginPath();
ctx.moveTo(x-20, y-30);
ctx.lineTo(x, y-20);
ctx.lineTo(x+20, y-30);
ctx.lineTo(x, y+30);
ctx.lineTo(x-20, y-30);
ctx.lineWidth = 1;
ctx.stroke();
}


function clear() {
ctx.clearRect(0, 0, width, height);
}

function init() {
return setInterval(draw, .0001);
}

function doKeyDown(evt){
switch (evt.keyCode) {
case 38:  /* Up arrow was pressed */
if (y - dy > 0){
y -= dy;

}
break;
case 40:  /* Down arrow was pressed */
if (y + dy < height){
y += dy;
}
break;
case 37:  /* Left arrow was pressed */
if (x - dx > 0){
x -= dx;
}
break;
case 39:  /* Right arrow was pressed */
if (x + dx < width){
x += dx;
}
break;
}
}

function draw() {
clear();
ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
circle(x, y, 10);
}

init();
window.addEventListener('keydown',doKeyDown,true);
