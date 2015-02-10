var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");
var pipes = [];
var frames = 0;

var makePipe = function(x, w, h1, h2, ctx) { //Creates a pipe starting at an x-coordinate of x, with a width of w, the bottom pipe goes up h1 pixels, the top pipe goes down h2 pixels.
    return {
	x : x,
	w : w,
	h1 : h1,
	h2 : h2,
	ctx : ctx,
	draw : function() {
	    ctx.fillStyle = "#008000";
	    ctx.fillRect(this.x, 400, this.w, this.h1);
	    ctx.fillRect(this.x, this.h2, this.w, this.h2);
	}
    };
};

var update = function() {
    frames++;
    if (frames % 200 == 0) {
	var rand = Math.floor(Math.random() * 300) + 50
	pipes.push(makePipe(500, 100, rand, Math.abs(300 - rand), ctx));
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 500, 400);
    for (var i = 0;i < pipes.length;i++) {
	pipes[i].x = pipes[i].x - 1;
	pipes[i].draw();
    }
    window.requestAnimationFrame(update);
}

b.addEventListener("click", window.requestAnimationFrame(update));
