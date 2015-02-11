game.player = (function() {
    var x = 150;
    var y = 350;
    var width = 20;
    var height = 20;
    var xVel = 3;
    var yVel = 0;
    var isRightDown = false;
    var isLeftDown = false;
    var isRightFirst = false;
    var draw = function() {
        context.fillStyle = game.PLAYER_COLOR;
        context.fillRect(x, y, width, height);
    }

    var updateXPos = function() {
        if (isRightDown && isLeftDown) {
            console.log("Right Down and Left Down")
            if (isRightFirst) {
                x += xVel;
            } else {
                x -= xVel;
            }
        } else if (isRightDown) {
            console.log("right down");
            x += xVel;
        } else if (isLeftDown) {
            console.log("left down");
            x -= xVel;
        }
    }

    var updateYPos = function() {
        y += yVel;
    }

    var keyDownHandler = function(e) {
        if (e.keyCode === 65) {
            // left
            isLeftDown = true;
            if (!isRightDown) {
                isRightFirst = false;
            }
        } else if (e.keyCode === 68) {
            // right
            isRightDown = true;
            if (!isLeftDown) {
                isRightFirst = true;
            }
        }
    }

    var keyUpHandler = function(e) {
        if (e.keyCode === 65) {
            // left
            isLeftDown = false;
        } else if (e.keyCode === 68) {
            // right
            isRightDown = false;
            isRightDownFirst = false;
        }
    }

    document.addEventListener("keydown", keyDownHandler);

    document.addEventListener("keyup", keyUpHandler);

    var updateYVel = function() {
        if (yVel < game.MAX_SPEED) {
            // positive -> means player is going down
            // game.GRAVITY is negative, this makes yVel positive
            yVel -= game.GRAVITY;
        }
    }


    var checkY = function(platform) {
        var playerBottom = y + height;
        var platformBottom = platform.y + platform.height;

        var playerFootTop = y + height - 7;


        return (playerBottom > platform.y) && (playerFootTop < platform.y);
    }

    var checkX = function(platform) {
        var playerRight = x + width;
        var platformRight = platform.x + platform.width;

        return (playerRight > platform.x) && (x < platformRight);
    }

    var handleCollisions = function() {
       var platforms = game.platformHandler.platforms;

       for (var i = 0; i < platforms.length; i++) {
           if (checkY(platforms[i]) && checkX(platforms[i]) && yVel >= 0) {
               yVel = game.PLAYER_JUMP;
           }
       }
    }

    var update = function() {
        updateYVel();
        updateXPos();
        updateYPos();
        handleCollisions();
    }

    return {
        x: x,
        y: y,
        xVel: xVel,
        yVel: yVel,
        width: width,
        height: height,
        draw: draw,
        update: update
    }
}());
