var c = document.getElementById("c");
var ctx = c.getContext("2d");

var newPad = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ff0000",
	dx : 1,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	}
    }
};


var update = function() {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);
		for (var i = 0; i < blocks.length; i++){
			
				blocks[i].draw();
		}
		window.requestAnimationFrame(update);
};

//Place a new block
var placeBlock = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		var w = 50;
		var h = 50;
		blocks.push(newPad(x,y,w,h,ctx));
};

c.addEventListener("click", placeBlock);
var blocks = [];
blocks.push(newPad(0,0,24,24,ctx));
blocks.push(newPad(25,0,24,24,ctx));
window.requestAnimationFrame(update);
						
var xMax = canvas.width;
var yMax = canvas.height;

var fill = function(e){
    var width = xMax;
    var len = yMax;
    var xLoc = 0;
    var yLoc = 0;
    //also need number of pads in each dir
    while (width!=0 && len!=0){
	//something like if pad width is at the end,
	blocks.push(newPad(xLoc,yLoc,24,24,ctx));
	xLoc += 25;
	yLoc += 25;
    }

}
