var width = 1000;
var height = 667;

//random number between min and max
var randNum = function(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

//canvas
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

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
function kernel(x,y) {
    var self = this;
    self.image = new Image();
    self.image.src = 'kernel.png';
    self.pos = [x,y];
    self.v = 0;
    self.acc = 1;
    self.heat = 0;
    self.popped = false;
    self.move = function() {

    }
    self.pop = function() {
	self.popped = true;
	self.image.src = 'popcorn.png';
    }
    self.draw = function() {

    }
}

var kernels = [];

//spawn 25 random kernels
for (var i=0;i<25;i++) {
    var x = randNum(250,750);
    var y = randNum(200,400);
    kernels.push(new kernel(x,y));
}

var update = function() {
    ctx.fillStyle = "#ffffff";
    window.requestAnimationFrame(update);
}

canvas.addEventListener("mouseover",update);
window.requestAnimationFrame(update);
