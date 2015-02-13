var c = document.getElementById("c");
var ctx = c.getContext("2d");
var HEIGHT = c.height;
var WIDTH = c.width;
var display = document.getElementById("display");
var startX = 0;
var startY = 0;
var startTime = 0;
var balls = [];
var walls = [];
var GRAVITY = 0.5;
var FLING_MULTIPLIER = 10;
var MIN_WALL_WIDTH = 20; // Limit the size to prevent balls from traveling through walls
var MIN_WALL_HEIGHT = 40; // Limit the size to prevent balls from traveling through walls
var MIN_VELOCITY = 0.0001; // Minimum velocity to determine if a ball has stopped
var currentBall = -1; // Index of selected ball in the array
var animate = false;
var bucket;
var endLevel;
var level = 1;
var lives = 5;

var makeBall = function(x, y, radius, ctx) {
    return {
        x : x,
        y : y,
        lastX : x,
        lastY : y,
        radius : radius,
        dx : 0,
        dy : 0,
        ctx: ctx,
        animate : false,
        color : "#ff0000",
        draw : function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.stroke();
        },
        move : function() {
            if (this.animate) {
                this.lastX = this.x;
                this.lastY = this.y;
                this.dy += GRAVITY;
                var stepSize = Math.max(Math.abs(this.dx) / MIN_WALL_WIDTH, Math.abs(this.dy) / MIN_WALL_HEIGHT);
                if (stepSize < 1) {
                    stepSize = 1;
                }
                else {
                    stepSize = Math.ceil(stepSize);
                }
                for (var i = 0;i < stepSize;i++) {
                    this.x = this.x + this.dx / stepSize;
                    this.y = this.y + this.dy / stepSize;
                    if (this.x < 10 || this.x > WIDTH - 10) {
                        removeBall(this);
                        --lives;
                        setup();
                        return;
                    }
                    if (this.y < 10 || this.y > HEIGHT - 10) {
                        removeBall(this);
                        --lives;
                        setup();
                        return;
                    }
                    handleInWall(this);
                    handleInBucket(this);
                    if (endLevel) {
                        ++level;
                        removeBall(this);
                        setup();
                        return;
                    }
                }
            }
            this.draw();
        }
    }
}

var makeBucket = function(x, y, ctx) {
    return {
        ctx : ctx,
        colorUno : "#000000",
        colorDos : "#ff0000",
        //x : Math.random() * 925 + 25,
        //y : Math.random() * 525 + 25,
        x : x,
        y : y,
        w : 30,
        h : 30,
        draw : function() {
            ctx.fillStyle = this.colorDos;
            ctx.beginPath();
            ctx.rect(this.x, this.y, 30, 7);
            ctx.fill();
            ctx.strokeStyle = this.colorDos;
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = this.colorUno;
            ctx.rect(this.x, this.y + 7, 30, 23);
            ctx.fill();
            ctx.strokeStyle = this.colorUno;
            ctx.stroke();
        }
    }
}

var removeBall = function(o) {
    for (var i = 0;i < balls.length;i++) {
        if (balls[i] === o) {
            balls.splice(i, 1);
        }
    }
}

var makeWall = function(x, y, w, h, ctx) {
    return {
        x : x,
        y : y,
        w : w < MIN_WALL_WIDTH ? MIN_WALL_WIDTH : w,
        h : h < MIN_WALL_HEIGHT ? MIN_WALL_HEIGHT : h,
        ctx: ctx,
        color : "#0033CC",
        draw : function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fill();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }
}

var update = function() {
    if (animate) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        for (var i = 0; i < balls.length; i++) {
            balls[i].move();
        }
        for (var i = 0; i < walls.length; i++) {
            walls[i].draw();
        }
        bucket.draw();
        window.requestAnimationFrame(update);
    }
}

var inBall = function(ball, x, y) {
    return (Math.pow(ball.x - x, 2) + Math.pow(ball.y - y, 2)) < Math.pow(ball.radius, 2);
}

var handleInBucket = function(ball) {
    var ballRightBound = ball.x + ball.radius;
    var ballLeftBound = ball.x - ball.radius;
    var ballLowerBound = ball.y + ball.radius;
    var ballUpperBound = ball.y - ball.radius;
    var reboundHorizontal = false;
    var reboundVertical = false;
    if (((ballRightBound >= bucket.x && ballRightBound <= bucket.x + bucket.w) ||
         (ballLeftBound >= bucket.x && ballLeftBound <= bucket.x + bucket.w)) &&
        ballLowerBound >= bucket.y &&
        ballUpperBound <= bucket.y + bucket.h) {

        reboundHorizontal = true;
        }
    if (((ballUpperBound >= bucket.y && ballUpperBound <= bucket.y + bucket.h)) &&
        ((ballRightBound >= bucket.x && ballRightBound <= bucket.x + bucket.w) ||
         (ballLeftBound >= bucket.x && ballLeftBound <= bucket.x + bucket.w) ||
         (ballLeftBound <= bucket.x && ballRightBound >= bucket.x + bucket.w))) {

        reboundVertical = true;
        }
    if (reboundHorizontal) {
        if (reboundVertical) {
            if (ball.lastY >= bucket.y && ball.lastY <= bucket.y + bucket.h) {
                teleportBallOutOfWallX(ball, bucket);
                ball.dx = -1 * ball.dx;
            }
            else {
                teleportBallOutOfWallY(ball, bucket);
                ball.dy = -1 * ball.dy;
            }
            handleBallStop(ball, bucket);
        }
            else {
                teleportBallOutOfWallX(ball, bucket);
                ball.dx = -1 * ball.dx;
            }
    }
    else if (reboundVertical) {
        teleportBallOutOfWallY(ball, bucket);
        ball.dy = -1 * ball.dy;
    }
    if ((ballLowerBound >= bucket.y && ballLowerBound <= bucket.y + bucket.h) &&
        ((ballRightBound >= bucket.x && ballRightBound <= bucket.x + bucket.w) ||
        (ballLeftBound >= bucket.x && ballLeftBound <= bucket.x + bucket.w) ||
        (ballLeftBound <= bucket.x && ballRightBound >= bucket.x + bucket.w))) {

        endLevel = true;
        walls = [];
    }
}

var handleInWall = function(ball) {
    var ballRightBound = ball.x + ball.radius;
    var ballLeftBound = ball.x - ball.radius;
    var ballLowerBound = ball.y + ball.radius;
    var ballUpperBound = ball.y - ball.radius;
    for (var i = 0;i < walls.length;i++) {
        var wall = walls[i];
        var reboundHorizontal = false;
        var reboundVertical = false;
        if (((ballRightBound >= wall.x && ballRightBound <= wall.x + wall.w) ||
            (ballLeftBound >= wall.x && ballLeftBound <= wall.x + wall.w)) &&
            ballLowerBound >= wall.y &&
            ballUpperBound <= wall.y + wall.h) {

            reboundHorizontal = true;
        }
        if (((ballLowerBound >= wall.y && ballLowerBound <= wall.y + wall.h) ||
            (ballUpperBound >= wall.y && ballUpperBound <= wall.y + wall.h)) &&
            ((ballRightBound >= wall.x && ballRightBound <= wall.x + wall.w) ||
            (ballLeftBound >= wall.x && ballLeftBound <= wall.x + wall.w) ||
            (ballLeftBound <= wall.x && ballRightBound >= wall.x + wall.w))) {

            reboundVertical = true;
        }
        if (reboundHorizontal) {
            if (reboundVertical) {
                if (ball.lastY >= wall.y && ball.lastY <= wall.y + wall.h) {
                    teleportBallOutOfWallX(ball, wall);
                    ball.dx = -1 * ball.dx;
                }
                else {
                    teleportBallOutOfWallY(ball, wall);
                    ball.dy = -1 * ball.dy;
                }
                handleBallStop(ball, wall);
            }
            else {
                teleportBallOutOfWallX(ball, wall);
                ball.dx = -1 * ball.dx;
            }
        }
        else if (reboundVertical) {
            teleportBallOutOfWallY(ball, wall);
            ball.dy = -1 * ball.dy;
        }
    }
}

var handleBallStop = function(ball, wall) {
    if (ball.x + ball.radius > wall.x &&
        Math.sqrt(Math.pow(ball.dx, 2) + Math.pow(ball.dy, 2)) < MIN_VELOCITY) {
        ball.dx = 0;
        ball.dy = 0;
        animate= false;
        console.log("Ball stopped.");
    }
}

var teleportBallOutOfWallX = function(ball, wall) {
    if (ball.dx > 0) {
        ball.x = wall.x - ball.radius;
    }
    else if (ball.dy < 0) {
        ball.x = wall.x + wall.w + ball.radius;
    }
}

var teleportBallOutOfWallY = function(ball, wall) {
    if (ball.dy > 0 && Math.abs(ball.lastY - wall.y) < Math.abs(ball.lastY - wall.y - wall.h)) {
        ball.y = wall.y - ball.radius;
    }
    else if (ball.dy < 0 && Math.abs(ball.lastY - wall.y) > Math.abs(ball.lastY - wall.y - wall.h)) {
        ball.y = wall.y + wall.h + ball.radius;
    }
}

var handleMousedown = function(e) {
    startX = getOffsetX(e);
    startY = getOffsetY(e);
    for (var i = 0;i < balls.length;i++) {
        if (inBall(balls[i], startX, startY)) {
            startTime = new Date().getTime();
            currentBall = i;
            //changeDisplay("Start: " + startX.toString() + " " + startY.toString());
            return;
        }
    }
    currentBall = -1;
}

var handleMouseup = function(e) {
    if (currentBall != -1) {
        e.offsetX = getOffsetX(e);
        e.offsetY = getOffsetY(e);
        var elapsed = new Date().getTime() - startTime;
        var vx = FLING_MULTIPLIER * (e.offsetX - startX) / elapsed;
        var vy = FLING_MULTIPLIER * (e.offsetY - startY) / elapsed;
        balls[currentBall].dx = vx;
        balls[currentBall].dy = vy;
        balls[currentBall].animate = true;
        animate = true;
        update();
        // Y velocity is reversed to account for axes starting at the top left
        //changeDisplay("Velocity: x=" + vx.toString() + " y=" + (-vy).toString());
    }
}

var getOffsetX = function(e) {
    // Firefox compatibility
    return (e.offsetX === undefined) ? e.layerX - c.offsetLeft : e.offsetX;
}
var getOffsetY = function(e) {
    // Firefox compatibility
    return (e.offsetY === undefined) ? e.layerY - c.offsetTop : e.offsetY;
}

var changeDisplay = function(s) {
    display.innerHTML = s;
}

var setup = function() {
    walls = []
    if ( lives <= 0 ) {
        alert ( "LOSER!! YOU ONLY GOT UP TO LEVEL " + level );
        level = 1;
        lives = 5;
    }
    if ( level > 5 ) {
        alert ( "YOU WIN! PLAY AGAIN" );
        level = 1;
        lives = 5;
    }
    endLevel = false;

    /*lvlOne = {
    walls : {
        x : [ 100, 500, 900, 200, 700 ],
        y : [ 100, 400, 200, 400, 400 ],
        h : [ 100, 100, 100, 100, 100 ],
        w : [ 20, 20, 20, 20, 20 ]
    }
    };
    lvlOne = {
    walls : [ makeWall ( 100, 100, 100, 20, ctx ), makeWall ( 500, 400, 100, 20, ctx ), makeWall ( 900, 200, 100, 20, ctx ), makeWall ( 200, 400, 100, 20, ctx ), makeWall ( 700, 400, 100, 20, ctx ) ]
    }*/

    // Preload levels
    lvlOne = {
        walls : [],
        ball : makeBall(500, 150, 14, ctx),
        bucket : makeBucket(600, 300, ctx)
    }
    lvlTwo = {
        walls : [],
        ball : makeBall ( 200, 100, 14, ctx ),
        bucket : makeBucket(600, 300, ctx)
    }
    lvlThree = {
        walls : [ makeWall ( 475, 200, 20, 100, ctx ) ],
        ball : makeBall ( 350, 200, 14, ctx ),
        bucket : makeBucket ( 600, 300, ctx )
    }
    lvlFour = {
        walls : [ makeWall ( 650, 200, 20, 100, ctx ), makeWall (750, 200, 20, 100, ctx )],
        ball : makeBall ( 350, 200, 14, ctx ),
        bucket : makeBucket ( 700, 300, ctx )
    }
    lvlFive = {
        walls : [ makeWall ( 675, 250, 20, 100, ctx ), makeWall ( 800, 250, 20, 100, ctx )],
        ball : makeBall ( 350, 200, 14, ctx ),
        bucket : makeBucket ( 700, 400, ctx )
    }
    levels = [lvlOne, lvlTwo, lvlThree, lvlFour, lvlFive];

    // Add walls
    lvl = levels[level-1];
    walls = lvl['walls'];
    balls.push(lvl['ball']);
    bucket = lvl['bucket'];

    animate = true;
    update();
    animate = false;
    changeDisplay("Level: " + level + "<br/>Lives: " + lives);

}

setup();
c.addEventListener('mousedown', handleMousedown);
c.addEventListener('mouseup', handleMouseup);
