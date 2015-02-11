var c = document.getElementById("c");
var b = document.getElementById("s");
var ctx = c.getContext("2d");

var makeQuarter = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	dx : 1,
	color : "#ff0000",
	broken : false,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    if (this.broken) {
		this.x = this.x + this.dx;
		this.y = this.y + 2*Math.random() - 1;
		if (this.x < 20 || this.x > 580){
		    this.dx = this.dx * -1;
		}
		if (this.y < 20 || this.y > 580){
		    this.y = 100+400*Math.random();
		}
	    }
	}
    };
};


var makePinwheel = function(x,y,w,h,ctx, quarters) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	quarters : quarters,
	draw : function() {
	    for (var i = 0; i < 4; i++) {
		quarters[i].draw;
	    }
	},
	move : function() {
	    var dx = Math.random(10);
	    var dy = Math.random(10);
	    for (var i = 0; i < 4; i++) {	   
		quarters[i].x = x + dx;
		quarters[i].y = y + dy;
	    }
	},
	split : function(x,y) {
	    var x = e.offsetX;
	    var y = e.offsetY;
	    if (Math.abs(this.x - x) < this.rad && Math.abs(this.y - y) < this.rad) {
		for (var i = 0; i < 4; i++) {
		    quarters[i].broken = true;
		}
	    }
	}
    };
};

var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i=0; i < pinwheels.length; i++){
	pinwheels[i].move();
	pinwheels[i].draw();
    }
    window.requestAnimationFrame(update);
}

var quarters = [];
for (var i = 0; i < 4; i++) {	   
    quarters.push(makeQuarter(50,100,30,15,ctx));
}
var pinwheels = [];
pinwheels.push(makePinwheel(50,100,30,15,ctx,quarters));

c.addEventListener("click",split);
window.requestAnimationFrame(update);
