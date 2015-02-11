var width = 1000;
var height = 667;
//random number between min and max
var randNum = function(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

//canvas
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

//MOUSE LOCATION?? YES DAMMIT
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
	x: evt.clientX - rect.left,
	y: evt.clientY - rect.top
    };
}

/*
var image = new Image();

image.onload = function() {
    ctx.drawImage(image,0,0);
}
image.src = 'image.jpg';


var drawLine = function(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0,102,204,0.4)';
    ctx.stroke();
}
*/



//kernel "class"
function kernel(x,y,mouseX,mouseY) {
    var self = this;
    self.image = new Image();
    self.image.src = 'kernel.png';
    self.popcornW = 70;
    self.popcornH = 65;
    self.kernelW = 40;
    self.kernelH = 36;
    self.pos = [x,y];
    self.v = 0;
    self.acc = 1;
    self.heat = 0;
    self.popped = false;
    self.move = function(e) {
	if (!self.popped) {

	}
    }
    self.pop = function() {
	self.popped = true;
	self.image.src = 'popcorn.png';
    }
    self.draw = function() {
	if (!self.popped) {
	    ctx.drawImage(self.image,self.pos[0]-self.kernelW/2, self.pos[1]-self.kernelH/2);
	}
	else {
	    ctx.drawImage(self.image,self.pos[0]-self.popcornW/2, self.pos[1]-self.popcornH/2);
	}
    }
}

var kernels = [];

//spawn 25 random kernels
for (var i=0;i<25;i++) {
    var x = randNum(250,750);
    var y = randNum(170,510);
    kernels.push(new kernel(x,y));
}
var mousePos;
var update = function(e) {
    ctx.fillStyle = "#ffffff";
    //there's a pretty good reason that these loops are separate, but that reason doesn't really apply here... just keep it like this
    mousePos = getMousePos(canvas, e);
    console.log(mousePos.x);
    //console.log(mousePos.y);
    //for (var i=0;i<kernels.length;i++) {
	//kernels[i].move();
    //}
    for (var i=0;i<kernels.length;i++) {
	kernels[i].draw();
    }
    window.requestAnimationFrame(update);
}

canvas.addEventListener("mouseover",update); //do NOT change it to mousemove unless you deleted mousePos.
window.requestAnimationFrame(update);
