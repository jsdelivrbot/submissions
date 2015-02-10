var c = document.getElementById("c");
var ctx = c.getContext("2d");
var mouse = {x: 0, y: 0};


var makeDot = function(ctx){
    return {
	x : 100 + 800*Math.random(),
	y : 500,
	r : 15,
	ctx : ctx,
	dx : -1,
	dy : -1,
	color : "#ff0000",
	spawn : function() {
	    e.preventDefault();
	    ctx.arc(x,y,r,0,2*Math.PI);
	    ctx.fillStyle= color;
	    ctx.stroke();
	    ctx.fill();
	},
	move : function() {
	    this.x = this.x + dx;
	    this.y = this.y + dy;
	}
	checkCollide : function() {
	    return (Math.pow(mouse.x - this.x, 2) + Math.pow(mouse.y - this.y, 2) <= Math.pow(this.r,2)); 
	}
	inBounds : function() {
	    return (this.x > 0 && this.y > 0);
	}
    };
};


var update = function() {
    ctx.fillStyle="#ffffff";
    var b = makeDot(ctx);
    dots.push(b);
    for (var i = 0; i < dots.length; i++){
	dots[i].move();
	dots[i].spawn();
	if (dot[i].checkCollide()) {
	    console.log ("NOOB. GET BETTER");
	}
	if (!(dot[i].inBounds())) {
	    dots.pop(dot[i]);
	}
    }
    window.requestAnimationFrame(update);
};


document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY;
}, false);



var dots = [];
dots.push(makeDot(50,100,30,15,ctx));
dots.push(makeDot(100,200,30,15,ctx));
c.addEventListener("click",clicked);
window.requestAnimationFrame(update);
