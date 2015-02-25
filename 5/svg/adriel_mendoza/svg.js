var target = document.createElementNS("http://www.w3.org/2000/svg",	"image");
target.setAttributeNS('http://www.w3.org/1999/xlink','href',"target.png");
target.setAttribute('height','50px');
target.setAttribute('width','50px');
target.setAttribute("Id","target");

var timer = 60;
var score = 0;
var done = false;
var posX;
var posY;

document.getElementById("s").addEventListener("click", clicked);

function play(){
	if(done == false){
		var whacked = true;
		newtarget();
		loop();
	}
};

function loop(){
	document.getElementById('timer').innerHTML = "Time Left: "+timer+"";
	timer -= 1;
	var t = document.getElementById("s");
	document.getElementById('countdown').innerHTML = "Your Score: "+score+"";
	if (timer < 0){
		window.clearTimeout(z);
		done = true;
	}else{
		var z = window.setTimeout("loop();",1000);
	}
};

function newtarget() {
	posX = Math.random() * (400) + 50;
	posY = Math.random() * (400) + 50;

	target.setAttribute('x', posX);
	target.setAttribute('y', posY);
	var s = document.getElementById("s");
	s.appendChild(target);
};

function clicked(e){
	e.preventDefault();
	console.log(e.offsetX);
	console.log(posX);
	console.log(e.offsetY);
	console.log(posY);
	if(Math.abs(e.offsetX - 30 - posX) <= 15 && 
		Math.abs(e.offsetY - 30 - posY) <= 15 &&
		done == false){
		var t = document.getElementById("s");
		t.removeChild(t.lastChild);
		newtarget();
		score = score + 1;
	}
};
 
