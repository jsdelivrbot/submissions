

Portal.world = (function() {

	var WIDTH	 		= 800,
		HEIGHT	 		= 400,
		COLOR			= "#E6E6E6",
		PORTALHEIGHT 	= 50;

	var elements = [];

	function draw(ctx) {
		ctx.fillStyle = COLOR;		
		ctx.fillRect(0, 0, WIDTH, HEIGHT );
		//blue
		ctx.strokeStyle("#00ffff")
		ctx.lineWidth = 5;
		ctx.moveTo(0, HEIGHT * 0.5 - PORTALHEIGHT);
		ctx.lineTo(0, HEIGHT * 0.5 + PORTALHEIGHT);
		//orange
		ctx.strokeStyle("#ffa500")
		ctx.lineWidth = 5;
		ctx.moveTo(WIDTH, HEIGHT * 0.5 - PORTALHEIGHT);
		ctx.lineTo(WIDTH, HEIGHT * 0.5 + PORTALHEIGHT);
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

