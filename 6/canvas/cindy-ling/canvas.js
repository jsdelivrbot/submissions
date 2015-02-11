var c = document.getElementById("can");
var ctx = c.getContext("2d");
ctx.fillStyle = "#ffffff"


//ctx.beginPath();
//ctx.arc(650,300,300,0,2*Math.PI);
//ctx.fillStyle = "red";
//ctx.fill();
//ctx.stroke();

var makeCircle = function(x, y, r,ctx){
    return {
	x : x,
	y : y,
	r : r,
	color : '#'+Math.floor(Math.random()*16777215).toString(16),
	ctx : ctx,
	dx : Math.random()*3 - 1.5,
	dy : Math.random()*3 - 1.5,
	dr : 0,

	draw : function() {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.stroke();
	},
	move : function(){
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.r <= 5){
		this.dr = this.dr * -1;
	    }
	    if (this.x <= 10 || this.x > 1290){
		this.dx = this.dx * -1;
		this.r = this.r - this.dr;
	    }
	    if (this.y < 10 || this.y > 590){
		this.dy = this.dy * -1;
		this.r = this.r - this.dr;
	    }
	},
    };
};

var update = function(){
//    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,1300,600);
    for (var i = 0; i < balls.length; i++){
	balls[i].move();
	balls[i].draw();
    }
    window.requestAnimationFrame(update);
};

var clicked = function(e) {
    e.preventDefault();
    var x = e.offsetX;
    var y = e.offsetY;
    var r = 10 + Math.random()*75;
    balls.push(makeCircle(x, y, r, ctx));
    //console.log(b);
    //e.preventDefault();
    //ctx.arc(650,150,150,0,2*Math.PI);
    //ctx.arc(650,150,150,0,2*Math.PI);
    //ctx.fillStyle = "red";
    //ctx.fill();
    //ctx.stroke();
};
	       
var clear = function(e) {
    balls = [];
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,1300,600);
};

var change = function(e) {
    ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.fillRect(0,0,1300,600);
};

c.addEventListener("click", clicked);
var balls = [];
window.requestAnimationFrame(update);
    
var b = document.getElementById("butt");
b.addEventListener("click", clear);

var b2 = document.getElementById("butt2");
b2.addEventListener("click", change);

window.requestAnimationFrame(update);
