var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");
var pipes = [];
var frames = 0;

var img = new Image();
img.src="http://3.bp.blogspot.com/-9hHsA2J18Sk/Uvfbls191cI/AAAAAAAAXUw/q841reaU3Lo/s1600/Flappy+Birds+high+res+transparent+background+png+animated+(1).png"

var bird = {
    y: 150,
    yvel : 0,
    draw : function(){
	ctx.drawImage(img,10,this.y,150,100);
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

var update = function() {
    frames++;
    if (frames % 200 == 0) {
	var rand = Math.floor(Math.random() * 300) + 50
	pipes.push(makePipe(100, rand, Math.abs(300 - rand), ctx));
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 500, 400);
    for (var i = 0;i < pipes.length;i++) {
	pipes[i].x = pipes[i].x - 1;
	pipes[i].draw();
    }
    bird.draw();
    window.requestAnimationFrame(update);
}

b.addEventListener("click", window.requestAnimationFrame(update));
