Portal.sprites = (function() {
	this.balls = [];

	this.numPlayers = 0;

	function draw(ctx) {
		for (i in balls) {
			//console.log(balls[i]);
		
			/* Draw the ball */
			balls[i].draw(ctx);

			/* Update the ball position */
			balls[i].update();
		}
	}

	/* Ball Creation and Manipulation */
	function createBall(x, y, color, r, vx, vy, isPlayer) {
		if(isPlayer) {
			if( numPlayers == 0 ) {
				numPlayers = 0;
				balls.push(new Portal.Ball(x, y, color, r, vx, vy, true));
				return;
			} else {
				console.log("A player was already created.");
			}
		}
		balls.push(new Portal.Ball(x, y, color, r, vx, vy, false));
	}

	return {
		draw		: draw,
		createBall	: createBall,
		balls		: this.balls
	}
})();
