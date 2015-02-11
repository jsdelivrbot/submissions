var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var circles=[];
function ayy(){

	
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, W, H);
	//style.opacity = '0.00002';
	//alert("hey");
	
}
var Circ = function(x,y, r, ctx) {
		return {
				x : x,
				y : y,
				r : r,
				ctx : ctx,
				color : "#ff0000",
				draw : function() {
						ctx.fillStyle = this.color;
						ctx.fill(this.x,this.y,this.w,this.h);
				},
				move : function() {
						this.x = this.x + this.dx;
						this.y = this.y + 2*Math.random() - 1;
						if (this.x < 10 || this.x > 580){
								this.dx = this.dx * -1;
						}
						if (this.y < 20 || this.y > 580){
								this.y = 100 + 400 * Math.random();
						}
				}
						
				
		};
};


canvas.addEventListener('click', function(e) {
		ctx.arc(e.offsetX,e.offsetY, 6, 0, 2 * Math.PI, false);
		//alert("ayy");
		ctx.strokeStyle="blue";
		ctx.stroke();
		circles.push(
					 });
window.onload=ayy;
