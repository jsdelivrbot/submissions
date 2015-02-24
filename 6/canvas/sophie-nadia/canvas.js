var c = document.getElementById("c");
var ctx = c.getContext("2d");

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var makeBall = function(x,y,ctx) {
    return {
        x : x,
        y : y,
        r : 8, //25
        dx : Math.random()*10-5,
        //dx : 1,
        dy : Math.random()*10-5,
        //dy : 1,
        ctx : ctx,
    state: "bouncing",
        color : getRandomColor(),
        counter : 50,
        setState : function (s) {
            this.state = s;
        },
        draw : function() {
            if (this.r > 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.strokeStyle = '#003300';
                ctx.stroke();
                ctx.closePath();
            }
        },
        move : function() {
            if (this.state == "bouncing"){
                if (this.x - this.r < 0 || this.x + this.r > 640){
                    this.dx = this.dx * -1;
                }
                if (this.y - this.r < 0 || this.y + this.r > 480){
                    this.dy = this.dy * -1;
                }
                this.x = this.x + this.dx;
                this.y = this.y + this.dy;
            } else if (this.state == "growing") {
                this.r++;
                if (this.r == 40) {
                    this.state = "big";
                }
            } else if (this.state == "big") {
                this.counter--;
                if (this.counter == 0) {
                    this.state = "shrinking";
                }
            } else if (this.state == "shrinking") {
                this.r--;
            }
        }
        
    };
};

var inRadius = function(e){
    /*for each (var item in obj) {
     sum += item;
     }*/
    var x = e.offsetX;
    var y = e.offsetY;
    
    for (i = 0; i < balls.length; i++){
        var distance = Math.sqrt( Math.pow(balls[i].x - x, 2) + Math.pow(balls[i].y - y, 2) );
        if (distance < balls[i].r){
            return i;
        }
    }
    return null;
    
};

var overlap = function(ball) {
    // ball inputed is growing, big, or shrinking
    var x = ball.x;
    var y = ball.y;
    var r = ball.r;
    for (var i = 0; i < balls.length; i++){
        b = balls[i];
        if (b.state == "bouncing"){
            //distance between centers
            var distance = Math.sqrt( Math.pow(b.x - x, 2) + Math.pow(b.y - y, 2) )
            if (distance < r + b.r){
                b.state = "growing";
            }
        }
    }
};


var update = function() {
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,640,480);
    ctx.closePath();
    
    for (var i = 0; i < balls.length; i++){
        if (balls[i].state != "bouncing"){
            overlap(balls[i]);
        }
        balls[i].move();
        balls[i].draw();
    }
    
    window.requestAnimationFrame(update);
};

var clicked = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var newB = makeBall(x,y,ctx);
    newB.setState("growing");
    balls.push(newB );
};

/*
 var clicked = function(e){
 if (inRadius(e)) {
 var pos = inRadius(e);
 balls[pos].color = "#0000ff";
 } else {
 var x = e.offsetX;
 var y = e.offsetY;
 balls.push(makeBall(x,y,ctx));
 }
 };
 */

c.addEventListener("click",clicked);

var b = document.getElementById("b");


var balls = [];

var reset = function() {
    balls = []
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,640,480);
    ctx.closePath();
    for ( i=0; i<50; i++) {
        balls.push(makeBall(320,240,ctx));
    }
}

b.addEventListener("click",reset);



reset();
window.requestAnimationFrame(update);

