APP.setConsts({
    canvas : document.createElement("canvas"),
    CANVAS_WIDTH : 640,
    CANVAS_HEIGHT : 380,

    // Colors
    C_BACKGROUND : "rgb(100, 120, 100)",
    C_OBSTACLE : "rgb(200, 200, 200)",
    C_PLAYER : "rgb(0, 0, 0)"
});

APP.setConsts({
    ctx : APP.canvas.getContext("2d")
});

APP.Rendering = (function() {
    var canvas = APP.canvas,
        height = APP.CANVAS_HEIGHT,
        width = APP.CANVAS_WIDTH;

    canvas.height = height;
    canvas.width = width;

    // Draw the world to the canvas
    var draw = function() {
        // Clear screen
        APP.ctx.fillStyle = APP.C_BACKGROUND;
        APP.ctx.fillRect(0, 0, APP.CANVAS_WIDTH, APP.CANVAS_HEIGHT);

        drawObstacles();
        drawShadows();
        drawPlayer();
    }

    var drawPlayer = function() {
        // Draw player
        APP.ctx.fillStyle = APP.C_PLAYER;
        APP.ctx.beginPath();
        APP.ctx.arc(APP.player.x, APP.player.y, APP.player.radius, 0, 2 * Math.PI);
        APP.ctx.closePath();
        APP.ctx.fill();
    }

    var drawObstacles = function() {
        for (var i = 0; i < APP.obstacles.length; i++) {
            drawObstacle(APP.obstacles[i]);
        }
    }

    var drawObstacle = function(obstacle) {
        APP.ctx.fillStyle = APP.C_OBSTACLE;
        APP.ctx.beginPath();
        APP.ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, 2 * Math.PI);
        APP.ctx.closePath();
        APP.ctx.fill();
    }

    var drawShadows = function() {
        for (var i = 0; i < APP.obstacles.length; i++) {
            drawShadow(APP.obstacles[i]);
        }
    }

    var drawShadow = function(obstacle) {
        var px = APP.player.x,
            py = APP.player.y,
            x = obstacle.x,
            y = obstacle.y;

        var dist = APP.Doodah.distance(APP.player, obstacle);
    }

    return {
        draw : draw,
    }
})();
