
var c = document.getElementById("c");
var ctx = c.getContext("2d");

var drawTank = function() {
    ctx.beginPath();
    ctx.fillStyle = "#CD9B1D";
    ctx.fillRect(0,500,600,100);
    var img = new Image();
    img.src = 'fish.png';
    img.onload = function() {
	ctx.drawImage(img, 100,100,80,80);
    }
};

drawTank();



'''var c= document.getElementById("c");
var ctx = c.getContext("2d");

#ctx.fillRect(x,y,h,w)

var setup = function(){
   	ctx.beginPath();
   	ctx.fillStyle = "#CD9B1D";
    ctx.fillRect(0,500,600,100);
   	var img = new Image();
    img.src = 'dog.png';
    img.onload = function() {
		ctx.drawImage(img,50,50, 100, 100);
    }
};
setup();'''
