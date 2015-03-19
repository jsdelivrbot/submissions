var field = document.getElementById("field");
var s = document.getElementById("start");
s.addEventListener("click",start);
var t = 0;

var createCircle = function(field,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('vx',Math.random()*10);
    c1.setAttribute('vy',Math.random()*10);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    c1.addEventListener("onmouseover",end);
    field.appendChild(c1);
};

var end = function(e) {
    e.preventDefault();
    if (t != 0) {
	clearInterval(t);
	s.style.visibility="visible";
	t = 0;
    }
};

var start = function(e) {
    if (t==0) {
	t = setInterval(run,10);
	s.style.visibility="hidden";
    }
};

var run = function(e) {
    var cs = document.getElementsByTagName("circle");
    for (var i=0; i<cs.length; i++) {
	x = cs[i].getAttribute('cx')+cs[i].getAttribute('vx');
	y = cs[i].getAttribute('cy')+cs[i].getAttribute('vy');
	if (x >= 1000 || y >= 600)
	    cs[i].removeChild();
	else {
	    cs[i].setAttribute('cx',x);
	    cs[i].setAttribute('cy',y);
	}
    }
    if (Math.random() > 0.8) {
	createCircle(field, 0, Math.random()*600, 10, 'red');
    }
};
console.log(t);
start();
