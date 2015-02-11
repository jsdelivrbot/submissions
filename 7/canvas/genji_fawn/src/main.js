
var c = document.getElementById("world");
var ctx = c.getContext("2d");

/* Give the Portal object the dimensions of the screen. */
Portal.world.setDimensions(c);

/* Give the Portal object the dimensions of the screen on resize. */
window.onresize = function(e) {	
	Portal.world.setDimensions(c);
}

/* Starts the animation loop */
function draw() {
	window.requestAnimationFrame(draw);

	Portal.draw(ctx);
};

draw();
Portal.init();
