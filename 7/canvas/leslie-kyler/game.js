var c = document.getElementById("c");
var ctx = c.getContext("2d");

var makeSpike = function(x,y,w,h,ctx){
    return {
	x:x,
	y:y,
	w:w,
	h:h,
	ctx:ctx,
	count:0,
	dx : 1,
	dy : 1,
	color : "#f00000",
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.count = this.count+1;
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.x < 0 || this.x > 380) {
		this.dx = this.dx * -1;
	    }
	    if (this.y < 0 || this.y > 580) {
		this.dy = this.dy*-1;
	    }
	}
    };
};

var makeBalloon = function(x,y,r,b,ctx){
    return {
	x:x,
	y:y,
	r:r,
	grow:b,
	ctx:ctx,
	dy:5,
	mv: true,
	color: "#0000ff",
	draw : function() {
	    ctx.beginPath();
	    ctx.fillStyle = this.color;
	    ctx.arc(this.x,this.y,this.r,0, 2*Math.PI, false);
	    ctx.fill();
	    ctx.lineWidth = 1;
	    ctx.stokeStyle = "#000000";
	    ctx.stroke();
	},
	move: function() {
	    if (this.grow == true) {
		this.r = this.r + 1;
		rad = rad + 1;
	    }
	    else if (this.y < 590 - (this.r)  && this.mv==true) {
		this.y = this.y + this.dy;
	    }
	    else {
		this.mv = false;
	    }
	    
	}
    };
};


var addSpike = function() {
    var x = Math.random() * 380;
    var y = Math.random() * 580;
    var w = 20;
    var h = 20;
    spikes.push(makeSpike(x,y,w,h,ctx));
};
  
var mkBal = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var r = rad;
    balloons.push(makeBalloon(x,y,r,true,ctx));
}

var stopBal = function() {
    balloons[balloons.length -1].grow = false;
    addSpike();
}

var checkBounce = function() {
    for (var i=0; i<spikes.length;i++) {
	for (var j=0; j<spikes.length;j++){
	    if (j!=i) {
		if (spikes[i].x + spikes[i].w +2 >= spikes[j].x && spikes[i].x <= (spikes[j].x + spikes[j].w + 2)  && spikes[i].y + spikes[i].w >= spikes[j].y -2&& spikes[i].y <= (spikes[j].y + spikes[j].h+2)) {
		    //spike collision
		    spikes[i].dx = spikes[i].dx * -1;
		    spikes[i].dy = spikes[i].dy * -1;
		}
	    }
	}
	for (var j=0; j<balloons.length;j++) {
	    if (spikes[i].x + 20 >= balloons[j].x - balloons[j].r -2  && spikes[i].x <= (balloons[j].x + balloons[j].r + 2)  && spikes[i].y >= balloons[j].y - balloons[j].r -2&& spikes[i].y <= (balloons[j].y + balloons[j].r +2)) {
		//collision
		if (balloons[j].grow == true) {
		    console.log(over);
		    over = true;
		}
		else {
		    if (spikes[i].count>25) {
		    spikes[i].dx = spikes[i].dx * -1;
		    spikes[i].dy = -1
		    spikes[i].count = 0;
			}
		}
	    }
	}
    }
}

var checkCircs = function() {
    for (var i = 0; i<balloons.length;i++){
	for (var j=0; j<balloons.length;j++){
	    if (j!=i){
		//check if touching another balloon with mv = false
		//if so, balloon[i].mv = false
	    }
	}
    }
}

var update = function(){
	if (!over) {
	ctx.fillStyle = "#ffffff";
	console.log("hello");
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,800);
    ctx.fillStyle ="#000000";

    
		
   // rad = balloons[balloons.length - 1].r;

    for (var i=0;i<spikes.length;i++){
	spikes[i].move();
	spikes[i].draw();
    }
    for (var i=0;i<balloons.length;i++){
	balloons[i].move();
	balloons[i].draw();
    }
    checkBounce();
    window.requestAnimationFrame(update);
}
}


c.addEventListener("mousedown", mkBal);
c.addEventListener("mouseup", stopBal);

var spikes = [];
addSpike();

var balloons = [];

var clicked = false;

var over = false;

var rad = 10;

window.requestAnimationFrame(update);
