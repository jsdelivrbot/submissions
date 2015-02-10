var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");
var jumping = 0;
var pipes = [];
var frames = 0;

var img = new Image();
img.src="http://3.bp.blogspot.com/-9hHsA2J18Sk/Uvfbls191cI/AAAAAAAAXUw/q841reaU3Lo/s1600/Flappy+Birds+high+res+transparent+background+png+animated+(1).png"

var bird = {
    y: 150,
    dy : 0,
    draw : function(){
	ctx.drawImage(img,10,this.y,150,100);
	ctx.beginPath();
	ctx.arc(88, this.y + 40, 20, 0, 2 * Math.PI);
	ctx.strokeStyle = "#000000";
	ctx.stroke();
    },
    move : function(){
	this.y += this.dy;
	this.dy += .2;
	if (this.dy >= 10){
	    this.dy = 10;
	}
	else if (this.dy <= -10){
	    this.dy = -7;
	}
    },
    jump : function(){
	this.dy -= 5.0;
	console.log(this.dy);
    }
    
}

var makePipe = function(w, h1, h2, ctx) { //Creates a pipe starting at an x-coordinate of x, with a width of w, the bottom pipe goes up h1 pixels, the top pipe goes down h2 pixels.
    return {
	x : 500,
	w : w,
	h1 : h1,
	h2 : h2,
	ctx : ctx,
	draw : function() {
	    ctx.fillStyle = "#008000";
	    ctx.fillRect(this.x, 0, this.w, this.h1);
	    ctx.fillRect(this.x, 400-this.h2, this.w, this.h2);
	}
    };
};


var findNearestX = function(pipe) {
    if (88 <= pipe.x) {
	return pipe.x;
    } else if (88 >= pipe.x) {
	return 88;
    } else {
	return pipe.x + pipe.w
    }
}

var findNearestY = function(pipe) {
    if (bird.y + 40 <= pipe.h1 || bird.y >= 400 - pipe.h2) {
	return bird.y + 40;
    } else {
	if (bird.y + 40 - pipe.h1 <= 400 - pipe.h2 - (bird.y + 40)) {
	    return pipe.h1;
	} else {
	    return 400 - pipe.h2;
	}
    }
}

var dist = function(x1, x2, y1, y2) {
    return Math.floor(Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5));
}

var collision = function(pipe) {
    if (dist(88, findNearestX(pipe), bird.y + 40, findNearestY(pipe)) <= 20) {
	console.log("YOU LOST!");
    }
}

var update = function() {
    frames++;
    if (frames % 200 == 0) {
	var rand = Math.floor(Math.random() * 225) + 50
	pipes.push(makePipe(100, rand, 275 - rand, ctx));
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 500, 400);
    if (pipes.length > 0  && pipes[0].x <= -100){
	pipes.shift(); //queue
    }
    for (var i = 0;i < pipes.length;i++) {
	collision(pipes[i]);
	pipes[i].x = pipes[i].x - 1;
	pipes[i].draw();
    }
    if (jumping) {
	bird.jump();
    }
    bird.move();
    bird.draw();
    jumping = 0;
    window.requestAnimationFrame(update);
}

c.addEventListener("click", function() {
    jumping = 1;
});
b.addEventListener("click", window.requestAnimationFrame(update));
