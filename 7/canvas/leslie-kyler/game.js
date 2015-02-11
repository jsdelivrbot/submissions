var c = document.getElementById("c");
var ctx = c.getContext("2d");

var makeSpike = function(x,y,w,h,ctx){
    return {
	x:x,
	y:y,
	w:w,
	h:h,
	ctx:ctx,
	dx : 2,
	dy : 10,
	color : "#f00000",
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.x = this.x + this.dx + 2 * Math.random();
	    this.y = this.y + this.dy + 2*Math.random();
	    if (this.x < 20 || this.x > 580) {
		this.dx = this.dx * -1;
	    }
	    if (this.y < 2 || this.y > 780) {
		this.dy = this.dy*-1;
	    }
	}
    };
};

var addSpike = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 20;
    var h = 20;
    spikes.push(makeSpike(x,y,w,h,ctx));
};
    
var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,800);
    for (var i=0;i<spikes.length;i++){
	spikes[i].move();
	spikes[i].draw();
    }
    window.requestAnimationFrame(update);
}


c.addEventListener("click", addSpike);
var spikes = [];

window.requestAnimationFrame(update);
