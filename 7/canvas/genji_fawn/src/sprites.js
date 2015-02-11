Portal.sprites = (function() {
	this.balls = [];
	this.walls = [];

	function draw() {
		for (ball in balls) {
			ball.draw();
		}
		for (wall in walls) {
			wall.draw();
		}
	}

	/* Ball Creation and Manipulation */
	function createBall(x, y, color, r) {
		balls.push(new Portal.Ball(x, y, color, r));
	}

	return {
		draw		: draw,
		createBall	: createBall
	}
})();
