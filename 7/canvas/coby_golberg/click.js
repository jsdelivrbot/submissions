var c = document.getElementById("c");
var b = document.getElementById("s");
var ctx = c.getContext("2d");

var makeBlock = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	dx : 1,
	dy: 1,
	color : "#ff0000",
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.x = this.x + 2 * this.dx;
	    this.y = this.y + 2 * this.dy;
	    if (this.x < 20 || this.x > 580){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 20 || this.y > 580){
		this.dy = this.dy * -1;
	    }
	}
    };
};


var update = function() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i=0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
    }
    window.requestAnimationFrame(update);
};

var turn = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    
    for(var i=0; i < blocks.length; i++){
	var dx = blocks[i].dx;
	var dy = blocks[i].dy;
	var bx = blocks[i].x;
	var w = blocks[i].w;
	var by = blocks[i].y;
	var h = blocks[i].h;

	if ( Math.abs(bx - x) <= (w*5)  &&   Math.abs(by - y) <= (h*5)){
	
	    if ((dx > 0) && (x > (bx+w))){
		blocks[i].dx = -(blocks[i].dx);
	    }
	    if ((dx < 0) && (x < (bx+w))){
		blocks[i].dx = -(blocks[i].dx);
	    }

	    if ((dy > 0) && (y > (by+h))){
		blocks[i].dy = -(blocks[i].dy);
	    }
	    if ((dy < 0) && (y < (by-h))){
		blocks[i].dy = -(blocks[i].dy);
	    }
	
	}   
    }
};

c.addEventListener("click",turn);

var blocks = [];
blocks.push(makeBlock(50,100,30,15,ctx));
blocks.push(makeBlock(100,200,30,15,ctx));
window.requestAnimationFrame(update);
