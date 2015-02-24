var c = document.getElementById("c");
var ctx = c.getContext("2d");
var xcor = 200;
var ycor = 0;
var drawBall() {
    ctx.fillStyle="#009933";
    ctx.fillRect(10,500,10,100);
    ctx.fillRect(10,590,100,10);
    ctx.fillRect(100,500,10,100);

<<<<<<< HEAD
    ctx.fillStyle="#5200A3";
    ctx.fillRect(290,500,10,100);
    ctx.fillRect(290,590,100,10);
    ctx.fillRect(380,500,10,100);

    ctx.fillStyle="#000000";
    var img = new Image();
    img.src = "metal.jpg";
    img.onload = function() {
	ctx.drawImage(img,125,245,150,10);
    };


    ctx.beginPath();
    ctx.arc(xcor,ycor,10,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle="#000000";
    ctx.stroke();
    ctx.fill();
    while (ycor < 250) {
	ycor += 10;
    };
    drawBall.requestAnimationFrame;
};
drawBall();
/*var makeBall = function(x,y,w,h,r,ctx){
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	r : r,
	ctx: ctx,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	};
var update = function(){
    ctx.fillStyle = "#ffffff";
    for (var i = 0; i < blocks.length; i++){
	blocks[i].move();
	blcoks[i].draw();
    }
    window.requestAnimationFrame(update);
};

var clicked = function(e){
};

c.addEventListener("click",clicked);
window.requestAnimationFrame(update);*/

=======
ctx.fillStyle="#000000";
ctx.rotate(20*Math.PI/180);
ctx.fillRect(125,245,150,10);

ctx.fillStyle="#009933";
ctx.fillRect(0,500,10,100);
ctx.fillRect(0,590,100,10);
ctx.fillRect(90,500,10,100);

ctx.fillStyle="#5200A3";
ctx.fillRect(300,500,10,100);
ctx.fillRect(300,590,100,10);
ctx.fillRect(390,500,10,100);

ctx.beginPath();
ctx.arc(200,235,10,0,2*Math.PI);
ctx.closePath();
ctx.fillStyle="#000000";
ctx.stroke();
ctx.fill();
>>>>>>> 54d19e49f6af55981bf4b2f9b183f12cbeb2ed80
