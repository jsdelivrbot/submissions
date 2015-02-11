var c = document.getElementById("c");
var ctx = c.getContext("2d");
var yellow = "#FFFF00";
var red = "#FF0000";
var blue = "#0000FF";
var black = "#000000";
var white = "#FFFFFF";

function start() {
    intervalId = setInterval(update, 10);
}
var makeBlock = function(x,y,w,h,ctx,color,slide) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	slide: slide,
	ctx : ctx,
	color : color,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	moveright : function(){
	    this.x=this.x+5;
	    if(this.x>520){
		this.x=520;
	    }else if(this.x<0){
		this.x=0;
	    }
	},
	moveleft : function(){
	    this.x=this.x-5;
	    if(this.x>520){
		this.x=520;
	    }else if(this.x<0){
		this.x=0;
	    }
	}
    };
};
var slidemove = function(event){
    var key = window.event.keyCode;
    if(key== 39){
	slide.moveright();
    }else if(key == 37){
	slide.moveleft();
    }
    slide.draw();
};
var makeBall = function(x,y,r,ctx,color) {
    return {
	x : x,
	y : y,
	r : r,
	ctx : ctx,
	color : color,
	dx : -2,
	dy : 2,
	draw : function() {
	    ctx.beginPath();
	    ctx.fillStyle = this.color;
	    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	    ctx.closePath();
	    ctx.fill();
	    ctx.stroke();
	},
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.x < 7 || this.x > 593){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 7){
		this.dy = this.dy * -1;;
	    }
	    if (this.y>593){
		lose();
	    }
	    var destroy= false;
	    for (var i=0; i < blocks.length; i++){
		for(var a = blocks[i].h; a>0;a--){
		    if(destroy){
			break;
		    }
		    for(var b = blocks[i].w; b>0;b--){
			if(destroy){
			    break;
			}
			tempXL= blocks[i].x-b;
			tempXR= blocks[i].x+b;
			tempYL= blocks[i].y-a;
			tempYR= blocks[i].y+a;
			if(this.x+this.r==tempXL || this.x+this.r == tempXR||
			   this.x-this.r==tempXL || this.x-this.r == tempXR){
			    if(Math.abs(this.y-(tempYL))<=1||Math.abs(this.y-(tempYR))<=1){
				this.dy= this.dy * -1;
				this.x = this.x + this.dx;
				this.y = this.y + this.dy;
				destroy=true;
				break;
			    }
			}
			if(this.y+this.r==tempYL || this.y+this.r == tempYR||
			   this.y-this.r==tempYL || this.y-this.r == tempYR){
			    if(Math.abs(this.x-(tempXL))<=1||Math.abs(this.x-(tempXR)<=1)){
				this.dx= this.dx * -1;
				this.x = this.x + this.dx;
				this.y = this.y + this.dy;
				destroy=true;
				break;
			    }
			}
		    }
		}
		if(destroy){
		    if(!blocks[i].slide){
			blocks.splice(i,1);
		    }
		    destroy=false;
		    break;
		}
	    }
	}
    }
};
var lose = function(){
    ctx.fillStyle = black;
    ctx.fillRect(0,0,600,600);
    ctx.fillStyle = white;
    ctx.font="60px arial";
    ctx.fillText("YOU LOSE!",150,300);
};
var update = function(){
    ctx.fillStyle = black;
    ctx.fillRect(0,0,600,600);
    for (var i=0; i < blocks.length; i++){
	blocks[i].draw();
    }
    ball.move();
    ball.draw();
};
var blocks = [];
var ball = makeBall(300,500,7,ctx,white);
var slide = null ;

var make = function(x,y,l,w){
    if(600/l<x){
	x= 600/l;
    }
    if(400/w<y){
	y= 400/w;
    }
    startX = (600-((l+4)*x))/2;
    startY = (400-((w+2)*y))/2;
    for(var i =0; i< x; i++){
	for(var j = 0; j< y;j++){
	    var color = white;
	    if(j%3==0){
		color= yellow;
	    }else if(j%3==1){
		color= red;
	    }else{
		color = blue;
	    }
	    blocks.push(makeBlock(((l+4)*i)+startX,((w+2)*j)+startY,l,w,ctx,color,false));
	}
    }
    blocks.push(makeBlock(180,580,100,10,ctx,white,true));
    slide=blocks[blocks.length-1];
};


window.document.addEventListener("keydown", slidemove);
make(10,3,50,15);
start();

