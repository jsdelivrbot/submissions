var c = document.getElementById("c");
var ctx = c.getContext("2d");

var d = document.createElement("span");
d.font = "69px Comic Sans MS";
d.textContent = "ᕙ༼ຈل͜ຈ༽ᕗ";
document.body.appendChild(d);
var emHeight = d.offsetHeight;
document.body.removeChild(d);
var id = 0;

var makeDonger = function(x,y,size,text,ctx,id){
    var metrics = ctx.measureText(text);
    var width = metrics.width;
   
    return {
	x : x,
	y : y,
	font : size+"px Comic Sans MS",
	text : text,
	ctx : ctx,
	dx : Math.floor((Math.random() * 10) + 1),
	dy : Math.floor((Math.random() * 10) + 1),
	width : width,
	size : size,
	id : id,

	draw : function() {
	    ctx.fillStyle="#000000";
	    ctx.font = this.font;
	    ctx.fillText(this.text,this.x,this.y);
	    ctx.stroke();
	},

	bounce : function() {
	    function deepCopy() {
		return true;
	    }
	    var otherDongers = dongers.filter(deepCopy);
	    otherDongers.splice(id,1);
	    for (var i = 0; i < otherDongers.length; i++){
		otherX = otherDongers[i].x;
		otherY = otherDongers[i].y;
		otherWidth = otherDongers[i].width;
		otherSize = otherDongers[i].size;
		if ((this.x+this.width > otherX) && (this.y+this.size >= otherY) && (otherY+otherSize >= this.y)) { //left
		    this.dx = Math.abs(this.dx);
		}
		if ((otherX+otherWidth > this.x) && (this.y+this.size >= otherY) && (otherY+otherSize >= this.y)) { //right
		    this.dx = Math.abs(this.dx) * -1;
		}		
		
		if ((this.y+this.size > otherY) && (this.x+this.width >= otherX) && (otherX+otherWidth >= this.x)){ //top
		    this.dy = Math.abs(this.dy);
		}
		if ((otherY+otherSize > this.y) && (this.x+this.width >= otherX) && (otherX+otherWidth >= this.x)){ //bottom
		    this.dy = Math.abs(this.dy) * -1;
		}
	    }
	},
	
	move : function() {
	    if (this.x < 0){ //left
		this.dx = Math.abs(this.dx);
	    }
	    if (this.x > c.width-width){ //right
		this.dx = Math.abs(this.dx) * -1;
	    }
	    if (this.y < size){ //top
		this.dy = Math.abs(this.dy);
	    }
	    if (this.y > c.height-size){ //bottom
		this.dy = Math.abs(this.dy) * -1;
	    }
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	}
    };
};


var update = function() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,c.width,c.height);
    for (var i = 0; i < dongers.length; i++){
	dongers[i].bounce();
	dongers[i].move();
	dongers[i].draw();
    }
    window.requestAnimationFrame(update);
};


var clicked = function(e) {
    var x = Math.min(e.offsetX,c.width-330);
    var y = e.offsetY;
    var d = makeDonger(x,y,69,"ᕙ༼ຈل͜ຈ༽ᕗ",ctx,id);
    id++;
    dongers.push(d);
}; 


var dongers = [];
c.addEventListener("click",clicked);
window.requestAnimationFrame(update);
