var s = document.getElementById("s");
var button = document.getElementById("start");
var ingame = 0;

var createCircle = function(x,y,r,color,dx,dy){
    return {
        x:x,
        y:y,
        r:r,
        color:color,
        dx:dx,
        dy:dy,
        move:function(){
            this.x = this.x + this.dx;
            this.y = this.y + this.dy;
        },
        draw:function(){
            var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
            c.setAttribute("cx",this.x);
            c.setAttribute("cy",this.y);
            c.setAttribute("r",this.r);
	    console.log(this.r);
            c.setAttribute("fill",this.color);
            c.addEventListener("mouseover",lose);
            s.appendChild(c);
        }
    };
};

var update = function(){
    if (ingame == 1) {
	while (s.lastChild) {
            s.removeChild(s.lastChild);
	}
	for(var i = 0; i < balls.length; i++){
            balls[i].move();
            balls[i].draw();
	}
	score++;
	document.getElementById("counter").innerText = "Your current score is " + score;
	window.requestAnimationFrame(update);
    }
};

var lose = function(e){
    console.log('RIP');
    ingame = 0;
    alert("Game over! Your score was "+score.toString());
    score = 0;
    while (s.lastChild) {
        s.removeChild(s.lastChild);
    }
    window.requestAnimationFrame(update);
};

var randColor = function() {
    return '#'+Math.floor(Math.random()*16777215).toString(16); //I love it when people think of things like this
};

var go = function() {
    rand = Math.random();
    if (rand < 0.25) { //left
	balls.push(createCircle(100, Math.random()*800, Math.random()*180+20, randColor(), Math.random()*20, Math.random()*40-20));
    }
    else if (rand < 0.5) { //top
	balls.push(createCircle(Math.random()*800, 100, Math.random()*180+20, randColor(), Math.random()*40-20, Math.random()*20));
    }
    else if (rand < 0.75) { //right
	balls.push(createCircle(700, Math.random()*800, Math.random()*180+20, randColor(), Math.random()*-20, Math.random()*40-20));
    }
    else { //bottom
	balls.push(createCircle(Math.random()*800, 700, Math.random()*180+20, randColor(), Math.random()*40-20, Math.random()*-20));
    }
};

var balls = [];
var t;
var ingame = 0;
var score = 1;
var rand;
var start = function() {
    ingame = 1;
    t = setInterval( function() {
	rand = Math.random();
	if (ingame == 1) {
	    console.log(rand);
	    if (rand < 0.25) { //left
		balls.push(createCircle(100, Math.random()*800, Math.random()*30+20+Math.sqrt(score), randColor(), Math.random()*20+Math.sqrt(score), Math.random()*(40+Math.sqrt(score))-20));
	    }
	    else if (rand < 0.5) { //top
		balls.push(createCircle(Math.random()*800, 100, Math.random()*30+20+Math.sqrt(score), randColor(), Math.random()*(40+Math.sqrt(score))-20, Math.random()*20+Math.sqrt(score)));
	    }
	    else if (rand < 0.75) { //right
		balls.push(createCircle(700, Math.random()*800, Math.random()*30+20+Math.sqrt(score), randColor(), Math.random()*-20-Math.sqrt(score), Math.random*(40+Math.sqrt(score))-20));
	    }
	    else { //bottom
		balls.push(createCircle(Math.random()*800, 700, Math.random()*30+20+Math.sqrt(score), randColor(), Math.random()*(40+Math.sqrt(score))-20, Math.random()*-20-Math.sqrt(score)));
	    }
	}
	else {
	    while (s.lastChild) {
		s.removeChild(s.lastChild);
	    }
	    window.requestAnimationFrame(update);
	}
    }, 1000/score);
    window.requestAnimationFrame(update);
};


button.addEventListener("click", start);
