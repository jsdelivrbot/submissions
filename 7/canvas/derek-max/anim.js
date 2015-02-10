var c = document.getElementById("c");
var ctx = c.getContext("2d");

var makeBlock = function(x,y,dx,dy,w,h,fill,ctx){
    return {
	x : x,
	y : y,
	dx : dx,
	dy : dy,
	w : w,
	h : h,
	ctx:ctx,
	fill : "#00FFAA",
	move : function(){
	    this.x = this.x+dx
	    this.y = this.y+dy
	    if (y > 400 || y < 20){
		this.dy = this.dy * -1;
	    }
	    if (x > 400 || y < 20){
		this.dx = this.dx * -1;
	    }
	},
	draw : function(){
	    ctx.fillStyle = fill;
	    ctx.fillRect(this.x, this.y, this.w, this.h);
	}
    };
}
var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i=0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
	//console.log(blocks[i]);
    }
    window.requestAnimationFrame(update);
}
var addBlock = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    console.log(e.offsetX);
    var w = 20+Math.random(40);
    var h = 10+Math.random(20);
    blocks.push(makeBlock(x,y,1, Math.random(),w,h,"#FF00FF", ctx));
};
c.addEventListener("click",addBlock);
var blocks = [];
window.requestAnimationFrame(update);
