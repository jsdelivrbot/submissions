Portal.shot = (function(x, y, color, r, dx, dy) {

	this.x 			= x			? x		: X_DEFAULT;
	this.y			= y			? y		: Y_DEFAULT;
	this.r 			= r			? r		: R_DEFAULT;
	this.color 		= color		? color	: C_DEFAULT;	
	this.dx			= dx;
	this.dy 		= dy;
	
	var R_DEFAULT = 5;
	var C_DEFAULT = "#00ffff";


	function draw(ctx) {
		ctx.beginPath();
		ctx.arc(X, Y, R, 0, 2*Math.PI);
		ctx.fillStyle(COLOR);
		ctx.fill();
		ctx.closePath();
		x = x + dx;
		y = y + dy;
	}

	function ifWall() {
		if (x <= 2.5 || 
			x >= canvas.width - 2.5 ||
			y <= 2.5 || 
			y >= canvas.height - 2.5) {
			Portal.sprites.walls.push(new wall(x, y, color))
		} 
	}



	return {
		draw	 	: draw,
		ifWall		: ifWall,
	}

})();