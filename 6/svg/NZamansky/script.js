var svg = document.getElementById('s');

var player = {size : 3,
	      x : 200,
	      y : 200};

var p = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
p.setAttribute('cx',player.x);
p.setAttribute('cy',player.y);
p.setAttribute('rx',player.size*2);
p.setAttribute('ry',player.size);
p.setAttribute('fill','#FF0000');
svg.appendChild(p);

var addFish = function(){
    var newFish = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
    newFish.setAttribute('class','fish');
    if(Math.random()<0.5){
	newFish.setAttribute('cx',0);
	newFish.setAttribute('speed',Math.random()*2+1);
    }
    else{
	newFish.setAttribute('cx',400);
	newFish.setAttribute('speed',Math.random()*2-3);
    }
    newFish.setAttribute('cy',Math.random()*400);
    var size = Math.random()*player.size*1.5;
    newFish.setAttribute('rx',size*2);
    newFish.setAttribute('ry', size);
    newFish.setAttribute('fill','#0000FF');
    svg.appendChild(newFish);
}

var moveFish = function(){
	var score = document.getElementById('score');
	score.innerHTML = "SCORE: "+player.size;
	if(Math.random() < 0.01 * player.size){
		addFish();
	}
    var fishes = document.getElementsByClassName('fish');
    for (var i=0; i<fishes.length; i++){
	var x = parseFloat(fishes[i].getAttribute('cx'));
	var y = parseFloat(fishes[i].getAttribute('cy'));
	var size = parseFloat(fishes[i].getAttribute('ry'));
	var speed = parseFloat(fishes[i].getAttribute('speed'));
	x = x+speed;
	fishes[i].setAttribute('cx',x);

	if (Math.abs(x-player.x) < player.size + size && Math.abs(y-player.y) < player.size/2 + size/2){
		if (size <= player.size){
			player.size = player.size + size/4;
			p.setAttribute('ry',player.size);
			p.setAttribute('rx',player.size*2);
			fishes[i].remove();
		}
		else{
			var gameOver = document.createElementNS("http://www.w3.org/2000/svg","circle");		
			gameOver.setAttribute('cx',200);
			gameOver.setAttribute('cy',200);
			gameOver.setAttribute('r',400);
			gameOver.setAttribute('fill','#FF0000');
			svg.appendChild(gameOver);

			score.innerHTML = "GAME OVER: SCORE: "+player.size;
			window.clearInterval(t);
		}
	}

	if (x < 0 || x > 400){
		fishes[i].remove();
	}
    }
};

var t = window.setInterval(function(){moveFish();},20);

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' && player.y > 0) {
        player.y = player.y - 3;
		p.setAttribute('cy',player.y);
    }
    else if (e.keyCode == '40' && player.y < 400) {
        player.y = player.y + 3;
		p.setAttribute('cy',player.y);
    }
    else if (e.keyCode == '37' && player.x > 0) {
        player.x = player.x - 3;
		p.setAttribute('cx',player.x);
    }
    else if (e.keyCode == '39' && player.x < 400) {
        player.x = player.x + 3;
		p.setAttribute('cx',player.x);
    }

}
