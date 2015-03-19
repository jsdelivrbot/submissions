var field = document.getElementById("field");
var s = document.getElementById("start");
var score = document.getElementById("score");
var t = 0;
var time;
var colors = ['red', 'blue', 'green', 'yellow', 'black','purple','cyan']
var valid = false;

var createCircle = function(field,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('vx',(Math.random()+.5)*3);
    c1.setAttribute('vy',(Math.random()-.5)*3);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    c1.addEventListener("mouseover",end);
    field.appendChild(c1);
};

var end = function(e) {
    e.preventDefault();
    if (t != 0) {
	clearInterval(t);
	s.style.visibility='visible';
	t = 0;
	cs = document.getElementsByTagName("circle");
	for (var i=0; i<cs.length;i++) {
	    cs[i].removeEventListener("mouseover",end);
	}
    }
};

var start = function(e) {
    if (t==0) {
	while (field.firstChild) {
	    field.removeChild(field.firstChild);
	}
	time = 0;
	t = setInterval(run,3);
	s.style.visibility="hidden";
    }
};

var run = function(e) {
    var cs = document.getElementsByTagName("circle");
    for (var i=0; i<cs.length; i++) {
	x = parseInt(cs[i].getAttribute('cx'))+parseInt(cs[i].getAttribute('vx'));
	y = parseInt(cs[i].getAttribute('cy'))+parseInt(cs[i].getAttribute('vy'));
	if (x >= 1000 || y >= 600)
	    field.removeChild(cs[i]);
	else {
	    cs[i].setAttribute('cx',x);
	    cs[i].setAttribute('cy',y);
	}
    }
    if (Math.random() > 0.8) {
	createCircle(field, 1, Math.random()*600, 10, 
		     colors[Math.floor(Math.random()*colors.length)]); //Color
    }
    if (valid)
	time++;
    score.innerHTML="Score: " + time;
};

s.addEventListener("click",start);
field.addEventListener("mouseenter",function(){valid = true;});
field.addEventListener("mouseleave",function(){valid = false;});
start();
