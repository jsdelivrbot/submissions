var c = document.getElementById("c");
var ch = c.height;
var cw = c.width;
var ctx = c.getContext("2d");
var hit = false;
var win = false;
var time = document.getElementById("time");
var start, elapsed;
var player;
var makeCircle = function(x,y,ctx){
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle="#ff0000";
    ctx.stroke();
    ctx.fill();
};
var makePlayer = function(x,y,ctx){
    return {
	x : x,
	y : y,
	r : 10,
	dx : 10,
	dy : 10,
	ctx : ctx,
	draw : function() {
//	    var img = new Image();
//	    img.onload = function() {
//		ctx.drawImage(img, x, y, 30,30);
//	    };
//	    img.src = "kitten.jpeg";
	    makeCircle(this.x,this.y,ctx);
	    if (this.y < 10){
		win = true;
	    };
	},
	up : function(){
	    this.y -= this.dy
	},
	down : function(){
	    this.y += this.dy
	},
	left : function(){
	    this.x -= this.dx
	},
	right : function(){
	    this.x += this.dx
	}
    };
};

var clear = function() {
    ctx.clearRect(0,0, cw, ch);
};

//c.addEventListener('mousemove', function(e){
//    player.x = e.offsetX;
//    player.y = e.offsetY;
//    player.draw();
//});

c.addEventListener('keypress', function(e){
    console.log("hi");
    player.up();
});

window.onkeyup = function(e){
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 38){
	player.up();
    }else if (key == 40){
	player.down();
    }else if (key == 37){
	player.left();
    }else if (key == 39){
	player.right();
    }
};

var makeBlock = function(x,y,w,h,speed,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "green",
	dx : speed,
	draw : function() {
	    ctx.beginPath();
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	    //ctx.addHitRegion({id:'block'});
	},
	move : function() {
	    this.x = this.x + this.dx;
	    if (player.x+player.r < this.x+this.w && player.x-player.r > this.x && player.y+player.r > this.y && player.y+player.r < this.y+this.h){
		hit = true;
	    }else{
		if (this.x < 10 || this.x > 480){
		    this.dx = this.dx * -1;
		}
	    }
	}
    };
};
var update = function() {
    if (hit){
	console.log("HIT");
	window.cancelAnimationFrame(raf);
	hit = false;
	window.alert("You Lost!");
    }else if (win){
	window.cancelAnimationFrame(raf);
	window.alert("Contragulations! You WON!");
	win = false;
    }else{
	elapsed = new Date().getTime() - start;
	time.value = elapsed/1000;
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,600,600);
	for (var i = 0; i < blocks.length; i++){
	    blocks[i].move();
	    blocks[i].draw();
	}
	player.draw();
	raf = window.requestAnimationFrame(update);
    }
};

var clicked = function(e){
    var x, y;
    if (e.offsetX){
	x = e.offsetX;
	y = e.offsetY;
//    }else if (e.clientX){
//	x = e.clientX;
//	y = e.clientY;
    }else if (e.layerX){
	x = e.layerX;
	y = e.layerY;
    }
    console.log("MouseX: "+e.layerX+", BlockX: "+x)
    console.log("MouseY: "+e.layerY+", BlockY: "+y)
    var w = 10+Math.random()*40;
    var h = 10+Math.random()*20;
    blocks.push(makeBlock(x,y,w,h,Math.random()*5,ctx));
};

var clear = function(e){
    //ctx.fillStyle = "#ffffff";
    //ctx.fillRect(0,0,600,600);
    blocks = [];
};

var blocks = [];

var restart = function(e){    
    start = new Date().getTime();
    clear();
    dy = 25;
    for ( i=0; i< (ch-2*dy)/dy; i++ ){
	if (i%2==0){
	    blocks.push(makeBlock(Math.random()*cw,i*dy,Math.random()*30+20,25,Math.random()*4+1,ctx));
	    blocks.push(makeBlock(Math.random()*cw,i*dy,Math.random()*30+20,25,Math.random()*4+1,ctx));
	    blocks.push(makeBlock(Math.random()*cw,i*dy,Math.random()*30+20,25,Math.random()*4+1,ctx));
	}
    }
    player = makePlayer(cw/2,ch-30,ctx);
    hit = false;
    win = false;
};

restart();
raf = window.requestAnimationFrame(update);
var restartButton = document.getElementById("restart");
restartButton.addEventListener("click",restart);
