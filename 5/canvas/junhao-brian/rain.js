var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var maxRainCount = 50;


var makeRain = function(x,y,ctx){
		return{
				x : x,
				y : y,
				ctx : ctx,
				dy : 2,
				color : "#33A1DE",
				draw : function(){
						ctx.fillStyle=this.color;
						ctx.beginPath();
						ctx.arc(this.x,this.y,5,0,2*Math.PI);
						ctx.fill();
				},
				move : function(){
						this.y+= + this.dy;
						if (y >= canvas.height)
								rain.shift();
				}
		};
};

var autoRain = function(){
		var x = canvas.width*Math.random();
		var y = canvas.height*Math.random()/4;
		if (rain.length < maxRainCount){
				rain.push(makeRain(x,y,ctx));
		}
};

var start = function(){
		rainEvent = window.setInterval(autoRain, 100);
};

var stop = function(){
		window.clearInterval(rainEvent);
};

var update = function(){
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		for (var i = 0; i < rain.length; i++){
				rain[i].move();
				if (rain[i].y >= canvas.height)
						rain.splice(i,1);
				else
						rain[i].draw();
		}
		window.requestAnimationFrame(update);
};

var clicked = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		var raindrop = makeRain(x,y,ctx);
		rain.push(raindrop);
};

var rain = [];
var rainEvent;
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
canvas.addEventListener("click", clicked);

window.requestAnimationFrame(update);
