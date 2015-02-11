var c = document.getElementById("c");
var message = document.getElementById("message");
var buttons = document.getElementById("buttons");
var bScore = document.getElementById("score");
var bStart = document.getElementById("start");
var bPause = document.createElement("button");
bPause.innerHTML = 'Pause';
var ctx = c.getContext("2d");
var frameDrag = 9;
var squareLen = 20;
var counter, pause, stop;
var snake, food, score;
var fun;

/* 0 Up, 1 Right, 2 Down, 3 Left */

//return a random square coordinate
var randVal = function(){
    return Math.floor(Math.random()*(600/squareLen))*squareLen;
};
        
var checkCollision = function(r1,r2){
    return (r1.x == r2.x) && (r1.y == r2.y);
};

var makeFood = function(x,y,ctx){
    return{
	x : x,
	y : y,
	w : squareLen,
	h : squareLen,
	ctx : ctx,
	color : '#0f0',
	draw : function(){
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	}
    };
};

var makeSnakePiece = function(x,y,ctx){
    return {
		x : x,
		y : y,
		dir : -1,
		nextDir: -1,
		w : squareLen,
		h : squareLen,
		ctx : ctx,
		color : "#f00",
		draw : function(){
		    this.x = ((this.x % 600)+600)%600; //needed to deal with negative off-screen
		    this.y = ((this.y % 600)+600)%600; //needed to deal with negative off-screen
		    ctx.fillStyle = this.color;
		    ctx.fillRect(this.x,this.y,this.w,this.h);
		},
	move : function(){
	    if (this.nextDir != -1){
		this.dir = this.nextDir;
		this.nextDir = -1;
	    }
	    switch(this.dir){
	    case 0:
		this.y -= squareLen;
		break;
	    case 1:
		this.x += squareLen;
		break;
	    case 2:
		this.y += squareLen;
		break;
	    case 3:
		this.x -= squareLen;
		break;
	    }
	}
    };
};

var addPart = function(){
    var oldLast = snake[snake.length-1];
    snake.push(makeSnakePiece(oldLast.x,oldLast.y,ctx));
};

var replaceFoodWithPart = function(){
    snake.push(makeSnakePiece(food.x,food.y,ctx));
};

var reset = function(){
    counter = 0;
    snake = [];
    food = null;
    score = 0;
    pause = true;
    fun = false;
    bStart.innerHTML = "Start";
    if (document.getElementById("pause") != null) buttons.removeChild(bPause);
    stop = false;
    console.log("RESETTING");
    snake.push(makeSnakePiece(300,300,ctx));
    snake[0].dir = 1;
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,600,600);
};
    
var checkGameOver = function(){
    for (var i=1; i < snake.length; i++){
		if (checkCollision(snake[0],snake[i])){
		    message.innerHTML = 'YOU LOSE!';
		    reset();
		    return;
		}
    }
    var i = 0;
};

var update = function(){
    //check frameDrag
    if (counter < frameDrag){
		counter++;
		window.requestAnimationFrame(update);
		return;
    }

    checkGameOver();
    if (pause) return;
    
    //clear screen
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,600,600);

    // update snake part directions
    for (var i=snake.length-1; i>0; i--){
		snake[i].dir = snake[i-1].dir;
    }
    
    //check if food needs to be replaced
    if (food == null){
		food = makeFood(randVal(),randVal(),ctx);
    }
    else{
	if (checkCollision(food,snake[0])){
	    console.log('YAY');
	    score+= 10;
	    bScore.innerHTML = "Score: "+score;
	    console.log('fun: '+fun);
	    
	    if (fun) replaceFoodWithPart();	    
	    food = null;
	    addPart();
	}
    }

    // draw snake    
    for (var i=0; i < snake.length; i++){
		snake[i].move();
		snake[i].draw();
    }
    // draw food if exists
    if (food != null) food.draw();
    counter = 0;
    window.requestAnimationFrame(update);
    
};



var togglePause = function(){
    pause = !pause;
    bPause.innerHTML="Play";
    if (!pause){
	bPause.innerHTML="Pause";
	window.requestAnimationFrame(update);
    }
};
bPause.addEventListener('click',togglePause);

var toggleStart = function(){
    if (stop){
	reset();
    }
    else{
	bStart.innerHTML = 'Stop';
	buttons.appendChild(bPause);
	message.innerHTML = "Snake Game";
	bScore.innerHTML = 'Score: 0';
	stop = !stop;
	pause = false;
	window.requestAnimationFrame(update);
    }
};
bStart.addEventListener("click",toggleStart);

window.addEventListener('keydown', function(e){
    var d = -1;
    var cur = snake[0].dir;
    console.log(e.which);
    switch(e.which){
    case 32: // space
	fun = true;
	message.innerHTML = "Fun Snake Game";
	e.preventDefault();
	break;
    case 38: // up
	if (cur != 2) d = 0;
	e.preventDefault();
	break;
    case 39: // right
	if (cur != 3) d = 1;
	e.preventDefault();
	break;
    case 40: // down
	if (cur != 0) d = 2;
	e.preventDefault();
	break;
    case 37: // left
	if (cur != 1) d = 3;
	e.preventDefault();
	break;
    case 80: // p
	togglePause();
	e.preventDefault();
	break;
    case 82: // r
	toggleStart();
	e.preventDefault();
	break;
    }
    if (d !=-1) snake[0].nextDir = d;

});

window.addEventListener("load",reset);

