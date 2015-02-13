var c = document.getElementById("c");
var ctx = c.getContext("2d");
var mouse = {x: -1, y: -1};
var dots = [];
var restart = document.getElementById("restart");
var lost = false;
var score = 0;
var n = 0;
var trails = [];

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
	    checkTrail : function (t, u) {
	        return (Math.pow(t - this.x, 2) + Math.pow(u - this.y, 2) <= Math.pow(this.r,2)); 
	    }, 
	    inBounds : function() {
	        return (this.x > -this.r && this.y < 500 + this.r);
	    }
    };
};

var makeTrail = function(x,y) {
    return {
	    x : x,
	    y : y,
	    trail: function() {
	        ctx.fillStyle= "#00ff00";
	        ctx.fillRect(x,y,4,4);
	        ctx.stroke();
	    }
    };
};


var setup = function(){
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,900,500);
    while (dots.length < 35){
        dots.push(makeDot(ctx));
    };
};

var update = function() {
    if (!(lost || mouse.x < 0 || mouse.x > 900 || mouse.y < 0 || mouse.y > 500)){
        ctx.fillStyle="#000000";
        ctx.fillRect(0,0,900,500);
	    for (var j = 0; j < trails.length; j++) {
	        trails[j].trail();
	    };
        for (var i = 0; i < dots.length; i++){
	        dots[i].move();
	        dots[i].spawn();
	        if (dots[i].checkCollide()) {
                lost = true;
	        }
	        
	        for (var k = 0; k < trails.length; k++) {
		        if (dots[i].checkTrail(trails[k].x, trails[k].y)) {
                    lost = true;
		        }
	        }
	        
	        if (!(dots[i].inBounds())) {
	            dots.splice(i,1);
                i--;
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
        n += 1;
        if (dots.length < 35){
            dots.push(makeDot(ctx));
        }else if (dots.length < 45 + score / 500 && n > 15){
            dots.push(makeDot(ctx));
            n = 0;
        };
    };
    window.requestAnimationFrame(update);
};


document.addEventListener('mousemove', function(e){
    mouse.x = e.clientX - c.offsetLeft;//e.clientX || e.pageX; 
    mouse.y = e.clientY - c.offsetTop;

    trails.push (makeTrail(mouse.x, mouse.y));
    if (trails.length >= 15) {
	    trails.splice(0,1);
    };
}, false);

restart.addEventListener('click', function(e){
    window.location.reload(true);
}, false);

setup();
window.requestAnimationFrame(update);
