var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");
var x = 300;
var y = 300;
var dx = 2;
var dy = 4;
var w;
var h;
var px;
var ph;
var pw;
//var intervalId = 0;
//var cmin = c.offset().left;
//var cmax = cmin + w;


function start() {
    w = c.width;
    h = c.height;
    makePaddle();
    intervalId = setInterval(draw, 10);
}

function makeCircle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

function makeRectangle(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0,0,w,h);
}

function makePaddle(){
    px = w/2;
    ph = 15;
    pw = 100;
}

//function mouseMove(e) {
//    if (e.pageX > cmin && e.pageX < cmax){
//px = e.pageX - cmin;
//}

//window.addEventListener("mousemove",mouseMove);

function draw() {
    clear();
    makeCircle(x,y,10);
    makeRectangle(px,h-ph,pw,ph);
    if (x+dx > w || x+dx <0)
	dx = -dx;
    if (y+dy < 0 || y+dy > h)
	dy = -dy;
//Next part is used for when bricks are available but was unable to complete that part because we didn't know how to do it.
   /* else if (y+dy > h){
      if (x>px && x<px+pw)
          dy = -dy;
	  else
	      clearInterval(intervalId);
    }*/
    x += dx;
    y += dy;
}

start();
//document.getElementById("b").addEventListener("click",start);
