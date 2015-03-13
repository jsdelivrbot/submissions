game.platformHandler = (function() {
    // deletes and creates platforms as they leave the screen

    var platforms = [];

    var makePlatform = function(x, y, width, height, dx) {
        platforms.push({
            x: x,
            y: y,
            width: width,
            height: height,
            isBelowPlayer: false,
            draw: function() {
                context.fillStyle = game.PLATFORM_COLOR;
                context.fillRect(this.x, this.y, this.width, this.height);
            },
            move: function() {
            }
        });
    }

    var removePlatform = function(x,y,width,height) {
        platforms.shift();
    }

    var draw = function() {
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].draw();
        }
    }

    var update = function() {
        var index = 0;
        while (platforms[index].getY() < camera.getBottomEdge()) {
            platforms.shift();
        }
    }

    return {
        platforms: platforms,
        makePlatform: makePlatform,
        removePlatform: removePlatform,
        draw: draw,
        update: update
    };
}());
