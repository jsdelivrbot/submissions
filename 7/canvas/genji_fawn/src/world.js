

Portal.world = (function() {

	var WIDTH	 		= 300,
		HEIGHT	 		= 150,
		COLOR			= "#E6E6E6",
		PORTALHEIGHT 	= 50;

	var elements = [];

	function draw(ctx) {
		ctx.fillStyle = COLOR;		
		ctx.fillRect(0, 0, WIDTH, HEIGHT );
		//blue
		ctx.fillStyle = "#00ffff";
		ctx.fillRect(0, (HEIGHT * 0.5) - PORTALHEIGHT, 5, (HEIGHT * 0.5) + PORTALHEIGHT);
		//orange
		ctx.fillStyle = "#ffa500";
		ctx.fillRect(WIDTH - 5, (HEIGHT * 0.5) - PORTALHEIGHT, WIDTH, (HEIGHT * 0.5) + PORTALHEIGHT);
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

