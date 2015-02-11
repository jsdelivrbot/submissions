

Portal.world = (function() {
	var WIDTH	 = 300,
		HEIGHT	 = 150,
		COLOR	 = "#E6E6E6";

	var elements = [];

	function draw(ctx) {
		ctx.fillStyle = COLOR;		
		ctx.fillRect(0, 0, WIDTH, HEIGHT );
	}

	function setDimensions(canvas) {
		setWidth(canvas.width);
		setHeight(canvas.height);
	}

	function setWidth(w) {
		this.width = w;
	}

	function setHeight(h) {
		this.height = h;
	}

	return {
		setWidth 		: setWidth,
		setHeight		: setHeight,
		setDimensions	: setDimensions,
		draw			: draw,
		width 			: WIDTH,
		height			: HEIGHT
	}

})();
