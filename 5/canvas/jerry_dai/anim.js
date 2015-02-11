//------------------CANVAS CODE--------------------
var c = document.getElementById("c");
var ctx = c.getContext("2d");

var makeBlock = function(x,y,w,h,ctx){
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	dx : 1,
	color : "#ff0000",
	draw : function() {
	    ctx.fillStyle=this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	    ctx.stroke();
	},
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + 2*Math.random() -1;
	    if (this.x < 10 || this.x > 580){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 20 || this.y > 580){
		this.y = 100 + 400*Math.random();
	    }
	}
    };
};

var update = function() {
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i = 0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
    }
    window.requestAnimationFrame(update);
};


var clicked = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 10+Math.random()*40;
    var h = 5+Math.random()*40;
    var b = makeBlock(x,y,w,h,ctx);
    blocks.push(b);
}; 


var blocks = [];
blocks.push(makeBlock(50,100,30,15,ctx));
blocks.push(makeBlock(100,200,30,15,ctx));
c.addEventListener("click",clicked);
window.requestAnimationFrame(update);


//--------------PLAYER CODE BELOW-----------------------
//make movement smooth, allow diagonal movement
var smooth = {
    keypressed: {},
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    isDown: function(keyCode) {
	return this.keypressed[keyCode];
    },
    onKeydown: function(event) {
	this.keypressed[event.keyCode] = true;
    },
    onKeyup: function(event) {
	delete this.keypressed[event.keyCode];
    }
};

//create a player object, allow movement functions

function Player() {
    this.x = 0;
    this.y = 0;
}

Player.draw = function(context) {
    context.fillRect(this.x, this.y, 16, 16);
};

Player.moveLeft = function() {
    this.x -= 1;
};

Player.moveUp = function() {
    this.y += 1;
};

Player.moveRight = function() {
    this.x += 1;
};

Player.moveDown = function() {
    this.y -= 1;
};

//update player movement smoothly
Player.update = function() {
    if (smooth.isDown(smooth.UP)) this.moveUp();
    if (smooth.isDown(smooth.LEFT)) this.moveLeft();
    if (smooth.isDown(smooth.DOWN)) this.moveDown();
    if (smooth.isDown(smooth.RIGHT)) this.moveRight();
};

//---------------------GAME CODE-------------------
var Game = {};

Game.start = function() {
    Game.context = document.getElementById("c").getContext("2d:");
							 
    Game.player = new Player();
};

Game.draw = function() {
    Game.player.draw(Game.context);
};

Game.update = function() {
    Game.player.update();
};

while (!Game.stopped) {
    Game.update();
    Game.draw();
}

Game.fps = 50;
Game.run = function() {
    Game.update();
    Game.draw();
};

Game._intervalId = setInterval(Game,run, 1000 / Game.fps);


//movement on keyboard with arrow keys
c.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
	//Left
    case 37:
	Game.player.moveLeft();
	break;
	//Up
    case 38:
	Game.player.moveUp();
	break;
	//Right
    case 39:
	Game.player.moveRight();
	break;
	//Down
    case 40:
	Game.player.moveDown();
	break;
    }
}, false);


c.addEventListener("click", makeBlock);
c.addEventListener("keyup", function(event) {smooth.onKeyup(event);}, false);
c.addEventListener("keydown", function(event) {smooth.onKeydown(event);}, false);
window.onload = function() {
    Game.start();
};
window.requestAnimationFrame(update);
