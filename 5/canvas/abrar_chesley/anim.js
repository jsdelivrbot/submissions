var c = document.getElementById("c");
var ctx = c.getContext("2d");
var HEIGHT = c.height;
var WIDTH = c.width;
var display = document.getElementById("display");
var startX = 0;
var startY = 0;
var startTime = 0;
var balls = [];
var GRAVITY = 0.5;
var FLING_MULTIPLIER = 10;
var currentBall = -1; // Index of selected ball in the array

var makeBall = function(x, y, radius, ctx) {
    return {
        x : x,
        y : y,
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
                this.dy += GRAVITY;
                this.x = this.x + this.dx;
                this.y = this.y + this.dy;
                if (this.x < 10 || this.x > WIDTH - 10) {
                    removeBall(this);
                    setup();
                    return;
                }
                if (this.y < 10 || this.y > HEIGHT - 10) {
                    removeBall(this);
                    setup();
                    return;
                }
            }
            this.draw();
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

var update = function() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
    }
    window.requestAnimationFrame(update);
}

var inBall = function(ball, x, y) {
    return (Math.pow(ball.x - x, 2) + Math.pow(ball.y - y, 2)) < Math.pow(ball.radius, 2);
}

var handleMousedown = function(e) {
    startX = e.offsetX;
    startY = e.offsetY;
    for (var i = 0;i < balls.length;i++) {
        if (inBall(balls[i], startX, startY)) {
            startTime = new Date().getTime();
            currentBall = i;
            display.innerText = "Start: " + startX.toString() + " " + startY.toString();
            return;
        }
    }
    currentBall = -1;
}

var handleMouseup = function(e) {
    if (currentBall != -1) {
        var elapsed = new Date().getTime() - startTime;
        var vx = FLING_MULTIPLIER * (e.offsetX - startX) / elapsed;
        var vy = FLING_MULTIPLIER * (e.offsetY - startY) / elapsed;
        balls[currentBall].dx = vx;
        balls[currentBall].dy = vy;
        balls[currentBall].animate = true;
        // Y velocity is reversed to account for axes starting at the top left
        display.innerText = "Velocity: x=" + vx.toString() + " y=" + (-vy).toString();
    }
}

var setup = function() {
    var x = 20;
    var y = 400;
    var radius = 10 + Math.random() * 5;
    var b = makeBall(x, y, radius, ctx);
    balls.push(b);
}

setup();
update();
c.addEventListener('mousedown', handleMousedown);
c.addEventListener('mouseup', handleMouseup);
