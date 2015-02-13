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
    console.log(newFish.className);
    if(Math.random()<0.5){
	newFish.setAttribute('cx',0);
	newFish.setAttribute('speed',Math.random()*4+1);
    }
    else{
	newFish.setAttribute('cx',400);
	newFish.setAttribute('speed',Math.random()*4-5);
    }
    newFish.setAttribute('cy',Math.random()*400);
    var size = Math.random()*player.size*2;
    newFish.setAttribute('rx',size*2);
    newFish.setAttribute('ry', size);
    newFish.setAttribute('fill','#0000FF');
    svg.appendChild(newFish);
}

var moveFish = function(){
    var fishes = document.getElementsByClassName('fish');
    console.log[fishes];
    for (var i=0; i<fishes.length; i++){
	var x = parseFloat(fishes[i].getAttribute('cx'));
	var speed = parseFloat(fishes[i].getAttribute('speed'));
	x = x+speed;
	console.log(speed);
	fishes[i].setAttribute('cx',x);
    }
};

var go = function(e){
    e.preventDefault();
    var t = setInterval(moveFish(),100);
};

addFish();
addFish();
addFish();

moveFish();
