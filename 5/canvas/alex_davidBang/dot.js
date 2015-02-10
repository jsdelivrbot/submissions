var c = document.getElementById("c");
var ctx = c.getContext("2d");
var mouse = {x: 0, y: 0};
var dots = [];

var makeDot = function(ctx){
    return {
	    x : 20 + 1200*Math.random(),
	    y : -15,
	    r : 15,
	    ctx : ctx,
	    dx : -2,
	    dy : 2,
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

var update = function() {
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,900,500);
    if (dots.length < 25){
        dots.push(makeDot(ctx));
    };
    for (var i = 0; i < dots.length; i++){
	    dots[i].move();
	    dots[i].spawn();
	    /*if (dots[i].checkCollide()) {
	        console.log("NOOB. GET BETTER");
	    }*/
	    if (!(dots[i].inBounds())) {
	        dots.splice(i,1);
	    }
    };
    window.requestAnimationFrame(update);
};


document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY;
}, false);

//dots.push(makeDot(ctx));
//dots.push(makeDot(ctx));
//c.addEventListener("click",clicked);
window.requestAnimationFrame(update);
