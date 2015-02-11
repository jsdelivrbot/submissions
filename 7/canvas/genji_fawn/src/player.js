Portal.player = (function() {

	var blue = "#00ffff";
	var orange = "#ffa500";
	/* -1 - blue, 1 - orange */
	var c = -1;

	function shoot(ctx) {
		//somethingsomethingsomething
		if (c == -1) 
			Portal.sprites.walls.push(new shot(this.x, this.y, blue, 5, dx, dy))
	}

	return {
		shoot	 	: shoot,
	}
})();