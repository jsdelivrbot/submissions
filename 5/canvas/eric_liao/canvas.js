var c = document.getElementById("c");
var ctx = c.getContext("2d");

var color;
color="#000000";
var x,y;
var lastx,lasty;
var t;
var mouse_down = function(e){
    console.log("hi");
    var repeat = function(){
	console.log("x: " + x + "\n" + "y: " + y);
	ctx.beginPath();
	ctx.arc(x,y,4,0,2*Math.PI);
	t = setTimeout(repeat,1);
	ctx.fillStyle=color;
	ctx.fill();

	//need to draw a line using these vars
	lastx=x;
	lasty=y;
    }
    repeat();
}
var mouse_up = function(e){
    clearTimeout(t);
}
function getMouseXY(e) {
    x = e.offsetX;
    y = e.offsetY;
}

var clear = function(e){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    ctx.beginPath();
		
};

c.addEventListener("mousedown",mouse_down);
c.addEventListener("mouseup",mouse_up);
c.addEventListener("mousemove",getMouseXY);

var b = document.getElementById("b");
b.addEventListener("click",clear);

var changeRed = function(){
    console.log("ur a fgred");
    color="#ff0000";
}
var changeOrange = function(){
    color="#ff8800";
}
var changeYellow = function(){
    color="#ffff00";
}
var changeGreen = function(){
    color="#00ff00";
}
var changeBlue = function(){
    color="#0000ff"
}
var changePurple = function(){
    color="#8800ff";
}
var changeWhite = function(){
    color="#ffffff";
}
var changeBlack = function(){
    color="#000000";
}
var red = document.getElementById("color-red");
red.addEventListener("click",changeRed);
var orange=document.getElementById("color-orange");
orange.addEventListener("click",changeOrange);
var yellow=document.getElementById("color-yellow");
yellow.addEventListener("click",changeYellow);
var green=document.getElementById("color-green");
green.addEventListener("click",changeGreen);
var blue = document.getElementById("color-blue");
blue.addEventListener("click",changeBlue);
var purple=document.getElementById("color-purple");
purple.addEventListener("click",changePurple);
var white= document.getElementById("color-white");
white.addEventListener("click",changeWhite);
var black =document.getElementById("color-black");
black.addEventListener("click",changeBlack);
