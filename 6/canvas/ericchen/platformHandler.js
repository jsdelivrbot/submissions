game.platformHandler = (function() {
	// deletes and creates platforms as they leave the screen

	var platforms = [];

	var makePlatform = function(x,y,width,height) {
	}

	var removePlatform = function(x,y,width,height) {
	}
	
	var update = function() {
		var index = 0;
		while (platforms[index].getY() < camera.getBottomEdge()) {
			platforms.shift();
		}
	}

	return {
		update : update
	};
}());
