var cv = document.getElementById("cv");
var ctx = cv.getContext("2d");

var makeBall = function(x,y,ctx) {
    return {
	x : x,
	y : y,
	vx : (Math.random()-0.5)*2,
	vy : (Math.random()-0.5)*2,
	ctx : ctx,
	color : "#ff0000",
	draw : function() {
	    ctx.fillStyle=this.color;
	    ctx.beginPath();
	    ctx.arc(x,y,20,0,2*Math.PI);
	    //ctx.closePath();
	    ctx.fill();
	},
	move : function() {
	    this.x = this.x + this.vx;
	    this.y = this.y + this.vy;
	    if (this.x<=20 || this.x>=580)
		this.vx = -this.vx + (Math.random()-0.5)*.1;
	    if (this.y<=20 || this.y>=580)
		this.vy = -this.vy + (Math.random()-0.5)*.1;
	}
    }
}

var update = function() {
    console.log("RUN");
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,600,800);
    for (var i=0; i<balls.length; i++) {
	balls[i].move();
	balls[i].draw();
    }
    window.requestAnimationFrame(update);
}

var clicked = function(e) {
    var b = makeBall(e.offsetX, e.offsetY, ctx);
    balls.push(b);
}

var balls = [];
balls.push(makeBall(50,50,ctx));
cv.addEventListener("click", clicked);
window.requestAnimationFrame(update);
