var c = document.getElementById("c");
var ctx = c.getContext("2d");

var score = 0;

var makeBlock = function(x,y,w,h,ctx) {
	return {
		x : x,
		y : y,
		w : w,
		h : h,
		ctx : ctx,
		color : "#ff0000",
		dx : 2 + Math.random(),
		draw : function() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.w,this.h);
		},
		move : function() {
			this.x = this.x + this.dx;
			// this.y = this.y + 2*Math.random() - 1;
			if (this.x < 10 || this.x > 590){
				this.dx = this.dx * -1;
			}
		},
		changeColor : function() {
			this.color = "#0000ff";
		}
	};
};

var makeDrop = function(x,y,w,h,ctx) {
    return {
		x : x,
		y : y,
		w : w,
		h : h,
		ctx : ctx,
		color : "#0000ff",
		dy : 1,
		draw : function() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.w,this.h);
		},
		move : function() {
			this.y = this.y + this.dy;
			if (this.y == 600) {
				score = score - 1;
				console.log(score);
			}
		}
	};
};

var update = function() {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);

		ctx.beginPath();
		ctx.moveTo(0,50);
		ctx.lineTo(600,50);
		ctx.stroke();

		ctx.fillStyle="#000000";
		ctx.font = "20px arial";
		ctx.fillText("The Clouds: Water Droplet Launch Zone",125,25);
		ctx.stroke();

		for (var i = 0; i < blocks.length; i++){
				blocks[i].move();
				blocks[i].draw();
		}
		for (var i = 0; i < drops.length; i++){
				drops[i].move();
				drops[i].draw();
				for (var j = 0; j < blocks.length; j++) {
					if ((Math.abs(drops[i].x - blocks[j].x) < 15) && (Math.abs(drops[i].y - blocks[j].y) < 10)) {
						if (blocks[j].color == "#0000ff") {
							if (confirm("Game over! Your final score is " + score)){
						        location.reload();
						    }
						}
						else {
							blocks[j].changeColor();
							score ++;
							drops[i].y = 700;
						}
					}
				}
		}
		document.getElementById("points").innerHTML = score.toString();
		window.requestAnimationFrame(update);
};

var clicked = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		if (y < 50) {
			drops.push(makeDrop(x,y,10,10,ctx));
		}
};

c.addEventListener("click",clicked);
var blocks = [];
var drops = [];
for (var x = 100; x < 600; x += 50){
	blocks.push(makeBlock(580*Math.random()+10,x,30,15,ctx));
}
window.requestAnimationFrame(update);
