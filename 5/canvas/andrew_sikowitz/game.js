var cv = document.getElementById("cv");
var ctx = cv.getContext("2d");
var btn = document.getElementById("button");
var mouseX = 0;
var mouseY = 0;

var makeBall = function(x,y,ctx) {
    return {
	x : x,
	y : y,
	vx : (Math.random()-0.5)*10,
	vy : (Math.random()-0.5)*10,
	ctx : ctx,
	color : "#ff0000",
	draw : function() {
	    ctx.fillStyle=this.color;
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,20,0,2*Math.PI);
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
	},
	check : function() {
	    if(Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2)<400) {
		end();
	    }
	}
    }
}

var end = function() {
    balls = [];
    window.cancelAnimationFrame(req);
    btn.style.visibility="visible";
    cv.removeEventListener("click", clicked);
    cv.removeEventListener("mousemove", moved);
    cv.removeEventListener("mouseenter",start_counting);
    cv.removeEventListener("mouseleave",stop_counting);
    count = false;
};

var update = function(e) {
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,600,800);
    var y = e.clientY;
    for (var i=0; i<balls.length; i++) {
	balls[i].move();
	balls[i].draw();
	balls[i].check();
    }
    if (count) {
	time += 1;
	document.getElementById("time").innerHTML = "Score: " + time;
    }
    req = window.requestAnimationFrame(update);
};

var clicked = function(e) {
    x = Math.random()*600;
    y = Math.random()*600;
    var b = makeBall(x,y,ctx);
    balls.push(b);
};

var start_counting = function() {
    count = true;
};

var stop_counting = function() {
    count = false;
};

var moved = function(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
};

var start = function() {
    balls.push(makeBall(50,50,ctx));
    cv.addEventListener("click", clicked);
    cv.addEventListener("mousemove", moved);
    cv.addEventListener("mouseenter",start_counting);
    cv.addEventListener("mouseleave",stop_counting);
    btn.style.visibility="hidden";
    time = 0;
    req = window.requestAnimationFrame(update);
}

var balls = [];
var time;
var count = false;
btn.addEventListener("click", start);
start();
