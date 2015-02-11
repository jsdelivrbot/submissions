var drawb = document.getElementById("drawingboard");
var ctx = drawb.getContext("2d");
var colors=document.forms[0];

var makeBlock = function(x,y,color) {
    return {
	x : x,
	y : y,
	dx: (Math.random()*12)-6,
	dy: (Math.random()*12)-6,
	ctx : ctx,
	color : color,
	draw : function() {
	    ctx.fillStyle=this.color;
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,20,0,2*Math.PI);
	    ctx.fill();
	    ctx.stroke();
	},
	move: function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.x < 10 || this.x > 990){
		this.dx = this.dx * -1;
		this.x = this.x + this.dx;
	    }
	    if (this.y < 10 || this.y > 490){
		this.dy = this.dy * -1;
		this.y = this.y + this.dy;
	    }
	    for (var i = 0; i < blocks.length; i++){
		if ((this.x!=blocks[i].x && this.y!=blocks[i].y)
		    &&(this.x < blocks[i].x+15 && this.x > blocks[i].x-15)
		    &&(this.y < blocks[i].y+15 && this.y > blocks[i].y-15)){
		    this.dx=this.dx*-1;
		    this.dy=this.dy*-1;
		    this.x = this.x + 2*this.dx;
		    this.y = this.y + 2*this.dy;
		    blocks[i].dx=blocks[i].dx*-1;
		    blocks[i].dy=blocks[i].dy*-1;
		    blocks[i].x = blocks[i].x + 2*blocks[i].dx;
		    blocks[i].y = blocks[i].y + 2*blocks[i].dy;
		    break;
		}
	    }
	}
    };
};

var clicked = function(e){
    e.preventDefault();
    var bcolor = colors.elements["color"].value;
    blocks.push(makeBlock(e.offsetX,e.offsetY,bcolor));
};

var clear = function(e){
    ctx.clearRect (0, 0, drawb.width, drawb.height);
    blocks = [];
    ctx.fillStyle="#000000";
    ctx.fillRect(0, 0, drawb.width, drawb.height);
};

var update = function() {
    ctx.clearRect (0, 0, drawb.width, drawb.height);
    ctx.fillStyle="#000000";
    ctx.fillRect(0, 0, drawb.width, drawb.height);
    for (var i = 0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
    }
    window.requestAnimationFrame(update);
};

drawb.addEventListener("click", clicked);

var blocks = [];
var butt = document.getElementById("butt");
butt.addEventListener("click", clear);
window.requestAnimationFrame(update);

