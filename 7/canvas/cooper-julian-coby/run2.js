var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");

var makeBlock = function(x,y,w,h,ctx, dx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	dx : dx,
	color : "#ff0000",
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + 2*Math.random() - 1;
	    if (this.x < 20 || this.x > 580){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 20 || this.y > 580){
		this.y = 100+400*Math.random();
	    }
	}
    };
};

var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i=0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
    }
    window.requestAnimationFrame(update);
};


var split = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    len = blocks.length;
    for(var i=0; i < len; i++){
	if ( Math.abs(blocks[i].x - x) <= (blocks[i].w / 2)  &&   Math.abs(blocks[i].y - y) <= (blocks[i].h / 2)){
	    blocks.push(makeBlock(x,y,(blocks[i].w / 2), (blocks[i].h / 2), ctx, 1));
	    blocks.push(makeBlock(x,y,(blocks[i].w / 2), (blocks[i].h / 2), ctx, -1));
	    blocks[i].draw = function() {};
	}
    }

};

c.addEventListener("click",split);

var blocks = [];
blocks.push(makeBlock(50,100,30,15,ctx,1));
blocks.push(makeBlock(100,200,30,15,ctx,1));
window.requestAnimationFrame(update);