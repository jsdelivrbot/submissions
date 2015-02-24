var c = document.getElementById("c");

//keyboard controls: arrow keys to move
var controls = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

window.addEventListener('keyup', function(event) { controls.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { controls.onKeydown(event); }, false);

//----------------------CODE FOR THE GAME LOOP--------------------
var Game = {
    fps: 60,
    width: 600,
    height: 400
};

//interval of the game
Game._onEachFrame = (function() {
   
    return function(cb) {
        setInterval(cb, 1000 / Game.fps);
    }
})();

//load up a bunch of obstacles and the player and finish line objects at the start of the game
//start running the game
Game.start = function() {
    Game.canvas = document.getElementById("c");
    Game.context = Game.canvas.getContext("2d");
    Game.player = new Player();
    Game.finish = new Finish();
    Game.obstacle = new Obstacle();
    Game.obstacle2 = new Obstacle();
    Game.obstacle3 = new Obstacle();
    Game.obstacle4 = new Obstacle();
    Game.obstacle5 = new Obstacle();
    Game.obstacle6 = new Obstacle();
    Game.obstacle7 = new Obstacle();
    Game.obstacle8 = new Obstacle();
    Game.obstacle9 = new Obstacle();
    Game.obstacle10 = new Obstacle();
    Game.obstacle11 = new Obstacle();
    Game.obstacle12 = new Obstacle();
    Game.obstacle13 = new Obstacle();
    Game.obstacle14 = new Obstacle();
    Game.obstacle15 = new Obstacle();
    Game._onEachFrame(Game.run);
};

//runs the game, the loop redraws the game every tick
Game.run = (function() {
    var loops = 0, skipTicks = 1000 / Game.fps,
    maxFrameSkip = 10,
    nextGameTick = (new Date).getTime(),
    lastGameTick;

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextGameTick) {
            Game.update();
            nextGameTick += skipTicks;
            loops++;
        }

        if (loops) Game.draw();
    }
})();

//draw the position of the player and finish line, clear the canvas every frame
Game.draw = function() {
    Game.context.clearRect(0, 0, Game.width, Game.height);
    Game.player.draw(Game.context);
    Game.finish.draw(Game.context);
    Game.obstacle.draw(Game.context);
    Game.obstacle2.draw(Game.context);
    Game.obstacle3.draw(Game.context);
    Game.obstacle4.draw(Game.context);
    Game.obstacle5.draw(Game.context);
    Game.obstacle6.draw(Game.context);
    Game.obstacle7.draw(Game.context);
    Game.obstacle8.draw(Game.context);
    Game.obstacle9.draw(Game.context);
    Game.obstacle10.draw(Game.context);
    Game.obstacle11.draw(Game.context);
    Game.obstacle12.draw(Game.context);
    Game.obstacle13.draw(Game.context);
    Game.obstacle14.draw(Game.context);
    Game.obstacle15.draw(Game.context);
    
    if (collision(Game.player, Game.obstacle)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }
    if (collision(Game.player, Game.obstacle2)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle3)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle4)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle5)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle6)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle7)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle8)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle9)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle10)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle11)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle12)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle13)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle14)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.obstacle15)) {
	Game.player.x = 0;
	Game.player.y = 0;
    }

    if (collision(Game.player, Game.finish))
	window.alert("WIN");
};

//update player movements
Game.update = function() {
    Game.player.update();
    Game.obstacle.update();
    Game.obstacle2.update();
    Game.obstacle3.update();
    Game.obstacle4.update();
    Game.obstacle5.update();
    Game.obstacle6.update();
    Game.obstacle7.update();
    Game.obstacle8.update();
    Game.obstacle9.update();
    Game.obstacle10.update();
    Game.obstacle11.update();
    Game.obstacle12.update();
    Game.obstacle13.update();
    Game.obstacle14.update();
    Game.obstacle15.update();
};

//collisions
function collision1(x1, y1, w1, h1, x2, y2) {
    return ((x2 <= x1 && x1+w1 >= x1) &&
	    (y2 <= y1 && y1+h1 >= y1))
}

function collision(player, obstacle) {
    px = player.x;
    py = player.y;
    pw = player.w;
    ph = player.h;
    ox = obstacle.x;
    oy = obstacle.y;
    ow = obstacle.w;
    oh = obstacle.h;
    
    return ( (px <= ox && px+pw >= ox) &&
	     (py <= oy && py+ph >= oy)
	   )
    
}


//finish line object
function Finish() {
    this.x = Game.width - 32;
    this.y = Game.height - 32;
}

//draw the finish line
Finish.prototype.draw = function(context) {
    context.fillRect(this.x, this.y, 32, 32);
}

//obstacle object
function Obstacle() {
    if (Math.random() < 0.5){
	this.code = true;
    }
    else {
	this.code = false;
    }
    this.dx = 7*Math.random();
    this.x = Game.width*Math.random();
    this.y = Game.height*Math.random();
    this.w = 10+Math.random()*40;
    this.h = 5+Math.random()*40;
}

Obstacle.prototype.draw = function(context) {
    context.fillRect(this.x,this.y,this.w,this.h);
}

Obstacle.prototype.update = function(context) {
    if (this.code) {
	this.x = this.x + this.dx;
	this.y = this.y + 2*Math.random() -1;
	
	if (this.x < 10 || this.x > 580){
	    this.dx = this.dx * -1;
	}
	if (this.y < 20 || this.y > 580){
	    this.y = 100 + 400*Math.random();
	}
    }
    else {
	this.y = this.y + this.dx;
	this.x = this.x + 2*Math.random() -1;
	
	if (this.y < 10 || this.y > 580){
	    this.dx = this.dx * -1;
	}
	if (this.x < 20 || this.x > 580){
	    this.x = 100 + 400*Math.random();
	}
    }    
}


//player object
function Player() {
    this.x = 0;
    this.y = 0;
}

//draw the player
Player.prototype.draw = function(context) {
    context.fillRect(this.x, this.y, 32, 32);
};

//player movements
Player.prototype.moveLeft = function() {
    this.x -= 2;
};

Player.prototype.moveRight = function() {
    this.x += 2;
};

Player.prototype.moveUp = function() {
    this.y -= 2;
};

Player.prototype.moveDown = function() {
    this.y += 2;
};


//update player movements based on key press
Player.prototype.update = function() {
    if (controls.isDown(controls.UP)) this.moveUp();
    if (controls.isDown(controls.LEFT)) this.moveLeft();
    if (controls.isDown(controls.DOWN)) this.moveDown();
    if (controls.isDown(controls.RIGHT)) this.moveRight();
};



