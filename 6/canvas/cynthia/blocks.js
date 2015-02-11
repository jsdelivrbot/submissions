var c = document.getElementById("c");
var ch = c.height;
var cw = c.width;
var ctx = c.getContext("2d");
var makePlayer = function(ctx){
    return {
	x : cw/2,
	y : ch,
	ctx : ctx,
	draw : function() {
	    var img = document.getElementById("lala");
	    ctx.drawImage(img,this.x,this.y);
	}
    };
};
var makeCircle = function(ctx){
    ctx.arc(100,300,10,0,2*Math.PI);
    ctx.fillStyle="#ff0000";
    ctx.stroke();
    ctx.fill();
};
var player = makePlayer(ctx);
player.draw();
var makeBlock = function(x,y,w,h,speed,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ff0000",
	dx : speed,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.x = this.x + this.dx;
	    //this.y = this.y + 2*Math.random() - 1;
	    if (this.x < 10 || this.x > 480){
		this.dx = this.dx * -1;
	    }
//	    if (this.y < 20 || this.y > 480){
//		this.y = 100 + 400 * Math.random();
//	    }
	//},
	//remove : function() {
	//    color = "#ffffff";
	//    ctx.fillStyle = color;
	//    ctx.fillRect(this.x,this.y,this.w,this.h);
	}
    };
};
var update = function() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i = 0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
    }
    window.requestAnimationFrame(update);
};
//var clickRect = function(e){
//    this.remove();
//};
var clicked = function(e){
    var x, y;
    if (e.offsetX){
	x = e.offsetX;
	y = e.offsetY;
    }
    else if (e.layerX){
	x = e.layerX;
	y = e.layerY;
    }
    for ( i=0; i<blocks.length; i++){
	console.log("MouseX: "+e.layerX+", BlockX: "+blocks[i].x)
	console.log("MouseY: "+e.layerY+", BlockY: "+blocks[i].y)
	if (x <= blocks[i].x+blocks[i].w && x >= blocks[i].x-blocks[i].w){
	    if (y <= blocks[i].y+blocks[i].h && y >= blocks[i].y-blocks[i].h){
		blocks.splice(i,1);
		return;
	    }
	}
    }
    var w = 10+Math.random()*40;
    var h = 10+Math.random()*20;
    //this.addEventListener("click",clickRect);
    blocks.push(makeBlock(x,y,w,h,Math.random()*5,ctx));
};
//var addRemove = function(){
//    for ( i=0; i<blocks.length; i++){
//	blocks[i].addEventListener("click",blocks[i].remove());
//    }
//};
var clear = function(e){
    //ctx.fillStyle = "#ffffff";
    //ctx.fillRect(0,0,600,600);
    blocks = [];
};

c.addEventListener("click",clicked);
var blocks = [];
var restart = function(e){    
    dy = 50;
    for ( i=0; i<500/dy; i++ ){
	blocks.push(makeBlock(Math.random()*cw,i*dy,Math.random()*30+10,15,Math.random()*3,ctx));
    }
};

restart();
//addRemove();
window.requestAnimationFrame(update);
var clearButton = document.getElementById("clear");
clearButton.addEventListener("click",clear);
var restartButton = document.getElementById("restart");
restartButton.addEventListener("click",restart);
