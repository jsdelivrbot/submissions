var makeCar = function(level) {
    var width = 50 + 40 * Math.random();
    var color = 
        "rgb(" + 
        Math.floor(100 * Math.random()) + "," + 
        Math.floor(100 * Math.random()) + "," + 
        Math.floor(100 * Math.random()) + ")";
    return {
        x: 0,
        level: level, 
        width: width, 
        color: color,
        remove: false
    };
};

var moveCar = function(car) {
    car.x += car.level;
    if (car.x > canvas.getAttribute("width"))
        car.remove = true;
}

var drawCar = function(car) {
    var x = 
        (car.level % 2 == 1) ? 
        car.x :
        canvas.getAttribute("width") - (car.width + car.x);
    var y = (car.level) * 70 + 10;
    var w = car.width;
    var h = 50;
    context.fillStyle = car.color;
    context.fillRect(x, y, w, h);
}

var makePlayer = function() {
    return {
        level: 0
    }
}

var movePlayer = function(player) {
    player.level += 1;
}

var drawPlayer = function(player) {
    var x = canvas.getAttribute("width") / 2 - 10;
    var y = player.level * 70 + 25;
    var w = 20;
    var h = 20;
    context.fillStyle = "rgb(0,255,0)";
    context.fillRect(x, y, w, h);
}

//MAIN??
var canvas = document.getElementById("game");
var newgame = document.getElementById("new");
var scoretag = document.getElementById("score");
var context = canvas.getContext("2d");

var score = 0;

var levels = [[], [], [], [], []];
var player = makePlayer();

var update = function() {

    context.fillStyle = "#ffffff";
    context.fillRect(0,0,canvas.getAttribute("width"),canvas.getAttribute("height"));

    for (var i = 0; i < levels.length; i++) {
        //SPAWN NEW CARS
        if (levels[i].length == 0 ||
            (levels[i][0].x >= 100 &&
             Math.random() < .005 * (i + 1)))

            levels[i].push(makeCar(i + 1));
        //DRAW EVERYTHING
        for (var j = 0; j < levels[i].length; j++) {
            if (levels[i][j].remove) {
                levels[i].splice(j, 1);
            }
            else {
                moveCar(levels[i][j]);
                drawCar(levels[i][j]);
            }
        }
    }

    //DRAW GOAL
    context.fillStyle = "rgb(100,255,100)";
    context.fillRect(0,
                     canvas.getAttribute("height") * 6 / 7,
                     canvas.getAttribute("width"),
                    canvas.getAttribute("height") / 7);

    context.font = "80px Courier";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText((player.level == 6) ? 
                     "(move again)" : 
                     "GOAL", 
                     0,
                     canvas.getAttribute("height") - 10,
                     canvas.getAttribute("width"));

    drawPlayer(player);

    //VICTORY CHECK
    if (player.level == 7) {
        score += 1;
        scoretag.innerHTML = "Score: " + score;
        console.log(score);
        alert("Congratulations!  You won!");
        newgameCallback();
    }

    //DEATH CHECK
    if (0 < player.level &&
        player.level < 6) {
        for (var i = 0; i < levels[player.level - 1].length; i++) {
            var car = levels[player.level - 1][i];
            if (car.x < canvas.getAttribute("width") / 2 &&
                canvas.getAttribute("width") / 2 < car.x + car.width) {
                alert("You died, sorry");
                newgameCallback();
                break;
            }
        }
    }

    window.requestAnimationFrame(update);
};

var advanceCallback = function(e) {
    movePlayer(player);
}

var newgameCallback = function(e) {
    iters = 0;
    player = makePlayer();
    for (var i = 0; i < 5; i++)
        levels[i] = [];   
}

newgameCallback();
document.onkeypress = advanceCallback;
newgame.addEventListener("click", newgameCallback);
window.requestAnimationFrame(update);
