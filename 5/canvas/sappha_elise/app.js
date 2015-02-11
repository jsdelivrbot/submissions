var canvas = document.getElementById("snake");
canvas.width = 800;
canvas.height = 600;
canvas.setAttribute('tabindex',1);
var ctx = canvas.getContext('2d');

//frames per second 
var fps = 50;
var cell_width = 10;
var food = {x: 0, y: 0} ;

//snake is an array
var snake = [];
var length = 4;
var direction = 'right';
var next_direction = 'right';

function background() { 
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect = (0, 0, canvas.width, canvas.height);
}

//all objects represented as cells 
// cells are squares -> only width is used, not height
function color_cell(x,y,fill,stroke) { 
    ctx.fillStyle = fill;
    ctx.strokeStyle  = stroke;
    ctx.strokeRect(x*cell_width, y*cell_width, cell_width, cell_width);
}

function make_snake() {
    snake = []
    for (i = length-1; i>=0; i--) { 
	snake.push({x: i, y: 0});
    }
    // pushing counter for x coordinates, horizontal snake
}

function color_snake() {
    for (i=0; i<snake.length; i++) { 
	color_cell(snake[i].x, snake[i].y, "#66600", "#33CC00");
    }
}

function color_food() { 
    color_cell(food.x,food.y,"#FF0000","#FF0000")
}
function collision(x1,x2,y1,y2) {
    return (x1==x2 && y1==y2);
}

//make sure food isnt where the snake is
//if food where snake is call func again 
function make_food() {
    food.x = Math.floor(Math.random() * (canvas.width/cell_width - 1));
    food.y = Math.floor(Math.random() * (canvas.height/cell_width - 1));
    if (collision(food.x,snake.x,food.y,snake.y))
	make_food();
}

var controls = {
    _pressed: {},

    LEFT: 65,
    UP: 87,
    RIGHT: 68,
    DOWN: 83,

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


function move() { 
    var x = snake[0].x;
    var y = snake[0].y;
    direction = next_direction;
    if (direction == 'right')
	x++;
    else if (direction == 'left')
	x--;
    else if (direction == 'top')
	y--;
    else if (direction == 'bottom')
	y++;
    //tail becomes head
    var tail = snake.pop();
    tail.x = x;
    tail.y = y;
    //unshift adds tails to begining of array snake
    snake.unshift(tail);
}

function score(frames) { 
    ctx.fillStyle="#999";
    ctx.font = "normal 15pt Calibri";
    ctx.fillText("You are lasting " + frames + " frames", 10, canvas.height-10);
}

function new_game() { 
    direction = "right";
    next_direction = "right";
    make_snake();
    //make_food();
    if(typeof loop !== "undefined")
        clearInterval(loop);
    loop = setInterval(game, fps);
    
}

function game() {
    ctx.beginPath();
    background();
    color_snake();
    //color_food();
    if (controls.isDown(controls.UP)){
	if (direction != "bottom") 
	    next_direction = "top"
    }
    if (controls.isDown(controls.LEFT)) {
	if (direction != "right")
	    next_direction = "left"
    }
    if (controls.isDown(controls.DOWN)) {
	if (direction != "top")
	    next_direction = "bottom"
    }
    if (controls.isDown(controls.RIGHT)) {
	if (direction != "left")
	    next_direction = "right"
    }
    move()
    //checks to see snake collides with wall, new game if so
    var head = snake[0];
    if (head.x < 0 || head.x == canvas.width/cell_width || head.y < 0 ||
       head.y == canvas.height/cell_width) { 
	window.alert("AHHH, YOU CRASHED INTO THE WALL!")
	ctx.clearRect(0,0,canvas.width,canvas.height)
	new_game();
	return;
    }
    // checks to see if snake collides with itself, new game if so
    for(i = 1; i < snake.length; i++){
	if (head.x == snake[i].x && head.y == snake[i].y){
	    window.alert("You just ate yourself!")
	    ctx.clearRect(0,0,canvas.width,canvas.height)
            new_game();
            return;
	}
    }
}

new_game();

