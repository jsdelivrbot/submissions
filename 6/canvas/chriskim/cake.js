var b = document.getElementById("b");
var c = document.getElementById("c");
var ctx = c.getContext("2d");

var cake = [];

var addCake = function(x,y,w,h,dx,dy,ctx,pic){
    //console.log("add");
    return{
	x: x,
	y: y,
	w: w,
	h: h,
	ctx: ctx,
	dx: dx,
	dy: dy,
	pic: pic,
	draw: function(){
	    var cake = new Image();
	    cake.src = this.pic;
	    ctx.drawImage(cake,this.x,this.y,this.w,this.h);
	},
	move: function(){
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.x < 10 || this.x > 515){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 10 || this.y > 510){
		this.dy = this.dy * -1;
	    }
	},
};

var update = function(){
    //console.log("update");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i = 0; i < cake.length; i++){
	cake[i].move();
	cake[i].draw();
    }
    window.requestAnimationFrame(update);
};

var clicked = function(e){
    //console.log("click");
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 22 + Math.random() * 22;
    var h = 22 + Math.random() * 22;
    var dx = 0.4 + Math.random();
    var dy = 0.4 + Math.random();
    cake.push(addCake(x,y,w,h,dx,dy,ctx,"cake.jpg"));
};

c.addEventListener("click", clicked);

window.requestAnimationFrame(update);