var c = document.getElementByID("c");
var ctx = c.getContext("2d");


var makeRain = function(x,y,ctx) {
	return {
		x : x,
		ctx : ctx,
		y : y,
		dy : 20
		draw : function() {
						ctx.fillStyle="#33A1DE";
						ctx.arc(this.x,this.y,5,0,2*Math.PI);
						ctx.stroke();
				},
		move : function() {
						this.y = this.y + this.dy;
						},
	}
}

var clicked = function() {
	var x = e.offsetX;
	var y = e.offsetY;
	var rain = makeRain(x,y,ctx);
	raindrops.push(rain);

}
var raindrops = [];
c.addEventListener("click",clicked);
window.requestAnimationFrame(update);
