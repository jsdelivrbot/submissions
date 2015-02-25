APP.setConsts({
    PLAYER_RADIUS : 20,
    COLUMN_RADIUS : 20
});

APP.Doodah = (function() {
    function newPlayer(x, y) {
        return {
            x : x,
            y : y,
            lastpos : [x, y],
            xvel : 0,
            yvel : 0,
            radius : APP.PLAYER_RADIUS,
        }
    }

    function newObstacle(x, y) {
        return {
            x : x,
            y: y,
            radius : APP.COLUMN_RADIUS
        }
    }

    function distance(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    function collides(a, b) {
        return distance(a, b) < (a.radius + b.radius)
    }

    return {
        collides : collides,
        distance : distance,
        newPlayer : newPlayer,
        newObstacle : newObstacle
    }
})();
