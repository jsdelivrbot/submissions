var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");

var createBlock = function(x,y,r,ctx) {
		return {
				x : x,
				y : y,
		                r : r,
 				ctx : ctx,
				dx : 1,
				color : getRandomColor(),
				draw : function() {
				    ctx.fillStyle=this.color;
				    ctx.beginPath();
				    
				    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
				    ctx.fill();
				    ctx.stroke();
				},
				move : function() {
						this.x = this.x + 4*this.dx;
						this.y = this.y + 2*Math.random() - 1;
						if (this.x < 5 || this.x > 580){
								this.dx = this.dx * -1;
						}
						if (this.y < 20 || this.y > 580){
								this.y = 100+400*Math.random();
						}
				}
		};
};




function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var update = function(){
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);
		for (var i=0; i < blocks.length; i++){
				blocks[i].move();
				blocks[i].draw();
		}
		window.requestAnimationFrame(update);
}

var addBlock = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		var r = 20+Math.random(40);
		blocks.push(createBlock(x,y,r,ctx));
		
};





c.addEventListener("click",addBlock);

var blocks = [];
window.requestAnimationFrame(update);
