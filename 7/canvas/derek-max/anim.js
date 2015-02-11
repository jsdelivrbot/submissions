
var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");

var makeCircle = function(x,y,r,ctx) {
    return {
        x : x,
        y : y,
        r : r,
        ctx : ctx,
        dx : Math.random()*10,
        dy : Math.random()*10,
        color : '#'+Math.floor(Math.random()*16777215).toString(16),
        draw : function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        },
        move : function() {
            this.x = this.x + this.dx;
            this.y = this.y + this.dy;
            if (this.x < 20 || this.x > 580){
                this.dx = this.dx * -1;
            }
            if (this.y < 20 || this.y > 580){
                this.dy = this.dy * -1;
            }
        }
    };
};

var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i=0; i < circles.length; i++){
        circles[i].move();
        circles[i].draw();
    }
    window.requestAnimationFrame(update);
}

var addcircle = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var r = 20+Math.random(40);
    circles.push(makeCircle(x,y,r,ctx));
};

var speedup = function(e){
    for (var i=0; i < circles.length; i++){
      circles[i].dx = circles[i].dx + 0.5;
      circles[i].dy = circles[i].dy + 0.5;
    }
    window.requestAnimationFrame(update);
};

var large = function(e){
    for (var i=0; i < circles.length; i++){
      circles[i].r = circles[i].r + 1;
    }
};

var normify = function(e){
    for (var i=0; i < circles.length; i++){
      circles[i].r = 15;
      circles[i].dx = Math.random()*10;
      circles[i].dy = Math.random()*10;
    }
};

c.addEventListener("click",addcircle);
s.addEventListener("click",speedup);
l.addEventListener("click",large);
n.addEventListener("click",normify);

var circles = [];
for (var i=0; i < 10; i++){
  circles.push(makeCircle((i+5)*(Math.random()+1)*20,(i+5)*(Math.random()+1)*20,15,ctx));
}
window.requestAnimationFrame(update);
