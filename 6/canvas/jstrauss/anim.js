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
		dx : 2,
		draw : function() {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.w,this.h);
		},
		move : function() {
			this.x = this.x + this.dx;
			// this.y = this.y + 2*Math.random() - 1;
			if (this.x < 10 || this.x > 580){
				this.dx = this.dx * -1;
			}
			if (this.y < 20 || this.y > 580){
				this.y = 100 + 400 * Math.random();
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
		// getx : function() {
		// 	return this.x;
		// },
		// gety : function() {
		// 	return this.y;
		// }
	};
};

var update = function() {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);
		for (var i = 0; i < blocks.length; i++){
				blocks[i].move();
				blocks[i].draw();
		}
		for (var i = 0; i < drops.length; i++){
				drops[i].move();
				drops[i].draw();
				for (var j = 0; j < blocks.length; j++) {
					if ((Math.abs(drops[i].x - blocks[j].x) < 15) && (Math.abs(drops[i].y - blocks[j].y) < 10)) {
						blocks[j].changeColor();
						score ++;
						drops[i].y = 700;
					}
				}
				// xnow = drops[i].getx();
				// ynow = drops[i].gety();
				//console.log(drops[i].x);
				//console.log(drops[i].y);
				// for (var i = 0; i < blocks.length; i++){
				// 	if (drops[i].getx <)
		}
		document.getElementById("points").value = "1";//score.toString();
		window.requestAnimationFrame(update);
};

var clicked = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		drops.push(makeDrop(x,y,10,10,ctx));
		// var w = 10+Math.random()*40;
		// var h = 10+Math.random()*20;
		// blocks.push(makeBlock(x,y,w,h,ctx));
};

c.addEventListener("click",clicked);
var blocks = [];
var drops = [];
blocks.push(makeBlock(500,100,30,15,ctx));
blocks.push(makeBlock(300,150,30,15,ctx));
blocks.push(makeBlock(150,200,30,15,ctx));
blocks.push(makeBlock(450,250,30,15,ctx));
blocks.push(makeBlock(100,300,30,15,ctx));
blocks.push(makeBlock(550,350,30,15,ctx));
blocks.push(makeBlock(200,400,30,15,ctx));
blocks.push(makeBlock(350,450,30,15,ctx));
blocks.push(makeBlock(250,500,30,15,ctx));
window.requestAnimationFrame(update);