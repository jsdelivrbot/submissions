var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");
var yellow = "#FFFF00";
var red = "#FF0000";
var blue = "#0000FF";

var makeBlock = function(x,y,ctx,color) {
    return {
	x : x,
	y : y,
	w : 50,
	h : 15,
	ctx : ctx,
	color : color,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	}
    };
};

var makeBall = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	dx : -1,
	dy : -1,
	color : "#ff0000",
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.arc(180,120,7,Math.PI/4,Math.PI);
	},
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.x < 7 || this.x > 593){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 7 || this.y > 593){
		this.dy = this.dy * -1;;
	    }
	    for (var i=0; i < blocks.length; i++){
		blockY=blocks[i].y;
		block
		if(this.y == blocks[i].y+blocks[i].w/2 && this.x == blocks[i].x){
		    this.y
	    }
	}
    };
};
var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    ball.update()
    window.requestAnimationFrame(update);
}

var addBlock = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 20+Math.random(40);
    var h = 10+Math.random(20);
    blocks.push(makeBlock(x,y,w,h,ctx));
    
};

c.addEventListener("click",addBlock);

var blocks = [];
window.requestAnimationFrame(update);
