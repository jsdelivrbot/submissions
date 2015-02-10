var c = document.getElementById("c");
var ctx = c.getContext("2d");
var mouse = {x: -1, y: -1};
var dots = [];
var lost = false;
var score = 0;
var i = 0;

var makeDot = function(ctx){
    return {
	    x : 20 + 1200*Math.random(),
	    y : -15,
	    r : 12 + 6*Math.random(),
	    ctx : ctx,
	    dx : -3 + 2*Math.random(),
	    dy : 2 + 2*Math.random(),
	    color : "#ff0000",
	    spawn : function() {
            ctx.beginPath();
	        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	        ctx.fillStyle= this.color;
	        ctx.stroke();
	        ctx.fill();
	    },
	    move : function() {
	        this.x = this.x + this.dx;
	        this.y = this.y + this.dy;
	    },
	    checkCollide : function() {
	        return (Math.pow(mouse.x - this.x, 2) + Math.pow(mouse.y - this.y, 2) <= Math.pow(this.r,2)); 
	    },
	    inBounds : function() {
	        return (this.x > -this.r && this.y < 500 + this.r);
	    }
    };
};

var setup = function(){
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,900,500);
    while (dots.length < 30){
            dots.push(makeDot(ctx));
    };
}

var update = function() {
    if (!(lost || mouse.x < 0 || mouse.x > 900 || mouse.y < 0 || mouse.y > 500)){
        //i++;
        console.log(i);
        if (dots.length < 40 + score / 500){
            dots.push(makeDot(ctx));
            //i = 0;
        };
        ctx.fillStyle="#000000";
        ctx.fillRect(0,0,900,500);
        for (var i = 0; i < dots.length; i++){
	        dots[i].move();
	        dots[i].spawn();
	        if (dots[i].checkCollide()) {
                lost = true;
	        }
	        if (!(dots[i].inBounds())) {
	            dots.splice(i,1);
	        }
        };
        ctx.font="20px Arial";
        ctx.fillStyle="#ffffff";
        ctx.fillText("Score: ",760,490);
        ctx.fillText(score,830,490);
        if (lost){
	        ctx.font="90px Georgia";
            ctx.fillStyle="#ffffff";
            ctx.fillText("Game Over!",180,265);
        };
        score += 1;
    };
    window.requestAnimationFrame(update);
};


document.addEventListener('mousemove', function(e){
    mouse.x = e.clientX - c.offsetLeft;//e.clientX || e.pageX; 
    mouse.y = e.clientY - c.offsetTop;
}, false);

setup();
window.requestAnimationFrame(update);
