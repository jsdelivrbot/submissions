var c = document.getElementById("c");
var ctx = c.getContext("2d");

var makeDonger = function(x,y,size,text,ctx){
    return {
	x : x,
	y : y,
	font : size+"px Comic Sans MS",
	text : text,
	ctx : ctx,
	dx : 1,

	draw : function() {
	    ctx.fillStyle="#000000";
	    ctx.font = this.font;
	    ctx.fillText(this.text,this.x,this.y);
	    ctx.stroke();
	},
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + 2*Math.random() -1;
	    if (this.x < 0 || this.x > c.width-320){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 20 || this.y > c.height-20){
		this.y = 100 + 400*Math.random();
	    }
	}
    };
};


var update = function() {
    var ctx = (a canvas context);
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,c.width,c.height);
    for (var i = 0; i < dongers.length; i++){
	dongers[i].move();
	dongers[i].draw();
    }
    window.requestAnimationFrame(update);
};


var clicked = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var d = makeDonger(x,y,69,"ᕙ༼ຈل͜ຈ༽ᕗ",ctx);
    dongers.push(d);
}; 


var dongers = [];
c.addEventListener("click",clicked);
window.requestAnimationFrame(update);
