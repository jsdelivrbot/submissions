var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var makeRain = function(x,y,ctx){
		return {
				x : x,//800*Math.random(),
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
						this.y = this.y + this.dy;
				}
		};
};

var update = function(){
		ctx.fillStyle="#ffffff";
		ctx.fillRect(0,0,800,600);
		for (var i = 0; i < rain.length; i++){
				rain[i].move();
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
rain.push(makeRain(100,100,ctx));
canvas.addEventListener("click", clicked);
window.requestAnimationFrame(update);
