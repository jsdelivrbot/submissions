

Portal.wall = (function(x, y, color) {

	this.x = x;
	this.y = y;
	this.color = color;
	this.len = 100;

	function draw(ctx) {
		ctx.strokeStyle(color);
		ctx.lineWidth = 3;
		//vertical
		if (x == 0 || x == canvas.width) {
			ctx.moveTo(x, y - len * 0.5);
			ctx.lineTo(x, y + len * 0.5);
			ctx.stroke();
		}
		//horizontal
		else if (y == 0 || y == canvas.height) {
			ctx.moveTo(x - len * 0.5, y);
			ctx.lineTo(x + len * 0.5, y);
			ctx.stroke();
		}
	}

	return {
		draw		: draw,
	}
})();


