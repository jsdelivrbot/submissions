var v =0;
var t =0;
document.body.style.background = "#33cccc";

var addPipes = function(s,x,y,h1,c1) {
    var p1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    p1.setAttribute('x',x);
    p1.setAttribute('y',y);
    p1.setAttribute('height',h1);
    p1.setAttribute('width',40);
    p1.setAttribute('fill',c1);
    s.appendChild(p1);
};

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this) {return;}
    s = document.getElementById("tw");
    og = document.getElementById("c1");
    var y = parseFloat(og.getAttribute('cy'));
    og.setAttribute('cy',y-Math.random()*20-60);
    v=0;
};

var move = function() {
    og = document.getElementById("c1");
    var y = parseFloat(og.getAttribute('cy'));
    og.setAttribute('cy',y+v);
    if (y>390 || y<0){
	alert("you lose!");
	v=0;
	og.setAttribute('cy',250);
    }
    v = v+0.5;
    if (Math.random()<0.05){
	addPipes(s,395,0,Math.random()*120+150,'green');
    }
    var ps = document.getElementsByTagName("rect");
    for (var i=0;i<ps.length;i++) {
	var x = parseFloat(ps[i].getAttribute('x'));
	var y = parseFloat(ps[i].getAttribute('height'));
	if (((x-parseFloat(og.getAttribute('cx'))<20) && 
	     (x-parseFloat(og.getAttribute('cx'))>-60)) &&
	    (parseFloat(og.getAttribute('cy'))-y<20)){
	    alert("you lose!");
	    v=0;
	    og.setAttribute('cy',300);
	}
	x = x - 5;
	ps[i].setAttribute('x',x);
    }
};

var go = function(e) {
    e.preventDefault();
    if (t==0){
				t = setInterval(move,50);
    } else {
				clearInterval(t);
				t=0;
    }
};

var s = document.getElementById("tw");
s.addEventListener('click',clicked);
var g = document.getElementById("go");
g.addEventListener("click",go);
