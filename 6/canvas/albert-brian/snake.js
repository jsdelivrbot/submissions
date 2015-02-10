var c = document.getElementById("c");
var message = document.getElementById("message");
var bStart = document.getElementById("start");
var bPause = document.getElementById("pause");
var ctx = c.getContext("2d");
var frameDrag = 9, counter = 0;
var squareLen = 20;
var snake = [];
var food = null;
var pause = false;
var forceLose = false;

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
			if (this.x>579 || this.x == 0 || this.y == 0 || this.y >579){
				forceLose = true;
			}
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
    
var checkGameOver = function(){
	if (forceLose){
		message.innerHTML = 'YOU LOSE!';
		return;
	}
    for (var i=1; i < snake.length; i++){
		if (checkCollision(snake[0],snake[i])){
		    message.innerHTML = 'YOU LOSE!';
		    return;
		}
    }
    var i = 0;

    /*
    while (i<30){
    	if (ctx.getImageData(i*20+2 ,2, 1, 1).data[0] == 255){
    		message.innerHTML = 'YOU LOSE!';
    	}
    	if (ctx.getImageData(2, i*20+2, 1, 1).data[0] == 255){
    		message.innerHTML = 'YOU LOSE!';
   		}
    }
    */
};

var update = function(){
    //check frameDrag
    if (counter < frameDrag){
		counter++;
		window.requestAnimationFrame(update);
		return;
    }

    checkGameOver();
        
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
    if (!pause) window.requestAnimationFrame(update);
};



snake.push(makeSnakePiece(300,300,ctx));
snake[0].dir = 1;

window.addEventListener('keydown', function(e){
    var d = -1;
    var cur = snake[0].dir;
    console.log(e.which);
    switch(e.which){
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
    }
    if (d !=-1) snake[0].nextDir = d;

});

bPause.addEventListener('click',function(e){
    pause = !pause;
    if (!pause) window.requestAnimationFrame(update);    
});
bStart.addEventListener("click",function(e){
	forceLose = false;
    window.requestAnimationFrame(update);    
});


