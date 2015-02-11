Portal.sprites = (function() {
	this.balls = [];

	this.numPlayers = 0;

	function draw(ctx) {
		for (ball in balls) {
			//ball.draw(ctx);	
			ctx.beginPath();
			ctx.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI);
			ctx.fillStyle(ball.color);
			ctx.fill();
			ctx.closePath();
		}
	}

	/* Ball Creation and Manipulation */
	function createBall(x, y, color, r, isPlayer) {
		if(isPlayer) {
			if( numPlayers == 0 ) {
				numPlayers = 0;
				balls.push(new Portal.Ball(x, y, color, r, true));
				return;
			} else {
				console.log("A player was already created.");
			}
		}
		balls.push(new Portal.Ball(x, y, color, r, false));
	}

	return {
		draw		: draw,
		createBall	: createBall
	}
})();
