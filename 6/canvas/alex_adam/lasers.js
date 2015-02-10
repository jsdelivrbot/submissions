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
	dx : 1,
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
		if( this.y < blocks[0].y  && this.y > blocks[0].y - 40)
		    blocks[1].color = "#00ff00";
		this.hit = true
	    }
	    /*if (this.y < 20 || this.y > 580){
	      this.y = 100 + 400 * Math.random();
	      }*/
	}
	
	
    };
};
var makeShip = function(w,h,ctx,e) {
    return {
	x : 0,
	y : 0,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ffff00",

	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function(x1,y1) {
	    console.log("here:")
	    console.log(x1);
	    console.log(y1)
	    //if( cursor.x < 200 && cursor.y<500){
	    this.x= x1;
	    this.y= y1;
	    //}
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
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 10+Math.random()*40;
    var h = 10+Math.random()*20;
    blocks.push(makeBlock(x,y,w,h,ctx));
};

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY 
}, false);

c.addEventListener("click",clicked);
blocks.push(makeShip(40,15,ctx));
blocks.push(makeTarget(450,150,30,40,ctx));
blocks.push(makeBlock(50,100,30,15,ctx));
blocks.push(makeBlock(100,200,30,15,ctx));
window.requestAnimationFrame(update);
