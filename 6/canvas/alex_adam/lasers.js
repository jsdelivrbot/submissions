var c = document.getElementById("c");
var ctx = c.getContext("2d");
var mouse = {x: 0, y: 0};
var blocks = [];
var makeTarget = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#0000ff",
	dy : 2,
	hit : false,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.y = this.y + this.dy;
	    //this.y = this.y + 2*Math.random() - 1;
	    
	    if (this.y < 10 || this.y > 490){
		this.dy = this.dy * -1;
	      }
	}
	
	
    };
};
var makeBlock = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ff0000",
	dx : 5,
	hit : false,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.x = this.x + this.dx;
	    //this.y = this.y + 2*Math.random() - 1;
	    if ( this.x > 450){
		//this.dx = this.dx * -1;
		if( this.y < blocks[1].y + 40  && this.y > blocks[1].y ){
		    blocks[1].color = "#00ff00";
		    this.hit = true;
		}
	    }
	    if (this.x > 470)
		this.hit = true;
	}
    };
};
var makeShip = function(w,h,ctx,e) { 
    return {
	x : 0,
	y : 0,
	w : w, //40
	h : h, //15
	ctx : ctx,
	color : "#ffff00",

	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function(x1,y1) {
	    if(x1-w>=0 && x1-w<150){
		this.x=x1-w;
	    }
	    if(y1-h>=0 && y1-h<500-h){
		this.y=y1-h;
	    } 
	}
	
    };
};

var update = function(e) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    var x = mouse.x;
    var y = mouse.y;
    
    blocks[0].move(x, y);
    blocks[0].draw();
    for (var i = 1; i < blocks.length; i++){
	if (blocks[i].hit){
	    blocks.splice(i,1);
	}
	else {
	    blocks[i].move();
	    blocks[i].draw();
	}
    }
    window.requestAnimationFrame(update);
};

var clicked = function(e){
    //if( mouse.x < 150){
	var x = blocks[0].x+blocks[0].w;//e.offsetX;
	var y = blocks[0].y+(blocks[0].h/2);//e.offsetY;
	var w = 10;
	var h = 3;
	blocks.push(makeBlock(x,y,w,h,ctx));
    //}
};

document.addEventListener('mousemove', function(e){ 
    mouse.x =  e.offsetX; 
    mouse.y =  e.offsetY; 
}, false);

c.addEventListener("click",clicked);
blocks.push(makeShip(40,15,ctx));
blocks.push(makeTarget(450,150,30,40,ctx));
window.requestAnimationFrame(update);
