var drawb = document.getElementById("drawingboard");
var ctx = drawb.getContext("2d");

var isLeft = true;

var makeBlock = function(x,y,w,h) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#34495e",
	draw : function() {
	    if (isLeft){
		ctx.rotate(20*Math.PI/180);
		ctx.fillRect(x,y,w,h);
		ctx.rotate(-20*Math.PI/180);
	    }
	    else {
		ctx.rotate(-20*Math.PI/180);
		ctx.fillRect(x,y,w,h);
		ctx.rotate(20*Math.PI/180);
	    }
	}
    };
};

var clicked = function(e){
    e.preventDefault();
    ctx.fillStyle="#34495e";
    blocks.push(makeBlock(e.offsetX,e.offsetY,50,20,ctx));
};

var clear = function(e){
    ctx.clearRect (0, 0, drawb.width, drawb.height);
};

var makeLeft = function(e){
    isLeft = true;
};

var makeRight = function(e){
    isLeft = false;
}

var update = function() {
    ctx.clearRect (0, 0, drawb.width, drawb.height);
    for (var i = 0; i < blocks.length; i++){
	blocks[i].draw();
    }
    window.requestAnimationFrame(update);
};

drawb.addEventListener("click", clicked);

var blocks = [];
var butt = document.getElementById("butt");
var leftb = document.getElementById("left");
var rightb = document.getElementById("right");
butt.addEventListener("click", clear);
leftb.addEventListener("click",makeLeft);
rightb.addEventListener("click",makeRight);
window.requestAnimationFrame(update);

