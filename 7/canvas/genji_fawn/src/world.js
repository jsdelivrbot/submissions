

Portal.world = (function() {
	var width;
	var heigth;
	var color;

	var elements = [];

	function draw() {


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
		draw			: draw
	}

})();
