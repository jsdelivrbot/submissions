var c = document.getElementById("c");
var b = document.getElementById("b");
var context = c.getContext("2d");
var dots = [];
var globalMouse = null;

// Black background
context.beginPath();
context.rect(0, 0, 500, 500);
context.fillStyle = "black";
context.fill();
context.closePath();

// Dots
var makeDot = function(x, y, radius, context){
	return {
		x : x,
		y : y,
		realX : x,
		realY : y,
		radius : radius,
		spread : false,
		original : false,
		velocity : 4,
		color : 'white',
		context : context,
		draw : function() {
			context.beginPath();
			context.arc(this.realX, this.realY, radius, 0, 2 * Math.PI, false);
			context.fillStyle = this.color;
	      	context.fill();
	      	context.closePath();
		},
		move : function() {
			if (this.spread) {
				this.realX += this.velocity;
				this.color = 'green';
			}
			else if (this.original && this.realX != x) {
				this.realX -= this.velocity;
			}
			else if (this.x == this.realX) {
				this.color = 'white';
			}
		}
	};
};

for (var i = 10; i < 500; i+=10) {
	for (var k = 10; k < 500; k+=10) {
		dots.push(makeDot(i, k, 2, context));
	};
};

// Mouse Position
function getMousePos(canvas, e) {
	var canvasRect = canvas.getBoundingClientRect();
	return {
		x : e.clientX - canvasRect.left,
		y : e.clientY - canvasRect.top
	};
};

// Moving Mouse Animation
var distance = function(x1, x2, y1, y2) {
	var xDiff = 0;
	var yDiff = 0;

	xDiff = x2 - x1;
	xDiff = xDiff * xDiff;

	yDiff = y2 - y1;
	yDiff = yDiff * yDiff;

	return Math.sqrt( xDiff + yDiff );
};

var spreadDots = function(e) {
	var mouse = getMousePos(c, e);
	globalMouse = getMousePos(c, e);

	for (var i = 0; i < dots.length; i++) {
		if (distance(dots[i].x, mouse.x, dots[i].y, mouse.y) < 40 && 
			distance(dots[i].realX, mouse.x, dots[i].realY, mouse.y) < 60) {

			dots[i].original = false;
			dots[i].spread = true;
		}
		else {
			dots[i].spread = false;
			dots[i].original = true;
		}
	};
};


// Update
var update = function(){
	context.fillStyle = "black";
	context.fillRect(0, 0, 500, 500);
	for (var i=0; i < dots.length; i++){
		if (globalMouse != null) {
			if (distance(dots[i].realX, globalMouse.x, dots[i].realY, globalMouse.y) > 50) {
				dots[i].spread = false;
			}
		}
		dots[i].move();
		dots[i].draw();
	};
	window.requestAnimationFrame(update);
};


c.addEventListener('mousemove', spreadDots, false);
window.requestAnimationFrame(update);









// b.addEventListener("click",clear)

// var clear = function(e) { 
// 	e.preventDefault();
// 	context.clearRect(0, 0, c.width, c.height);
// 	context.beginPath();
// 	context.rect(0, 0, 500, 500);
// 	context.fillStyle = "black";
// 	context.fill();
// 	context.closePath();
// };