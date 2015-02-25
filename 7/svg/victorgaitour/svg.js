
var cClicked = function(e) {
    e.preventDefault();
    console.log("cClicked");
    var c = this.getAttribute('fill');
    if (c=='red') {
	this.setAttribute('fill','orange');
    } else if (c=='orange'){
	this.setAttribute('fill','white');
    } else {
	this.remove();
    }
};

var addCircle = function(s,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    c1.addEventListener('click',cClicked);
    s.appendChild(c1);
    
};

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this) {return;}
    console.log("clicked");
    s = document.getElementById("s");
    var r = 5+30*Math.random();
    addCircle(s,e.offsetX,e.offsetY,r,'red');
};

var move = function() {
    var cs = document.getElementsByTagName("circle");
    for (var i=0;i<cs.length;i++) {
	var x = parseFloat(cs[i].getAttribute('cx'));
	var y = parseFloat(cs[i].getAttribute('cy'));
	var r = parseFloat(cs[i].getAttribute('r'));
	if ( x > 800){
	    window.cancelAnimationFrame(update);
	x = x + 3;
	r = r + 2*Math.random()-1;
	if (r<5) {r=20;}
	cs[i].setAttribute('cx',x);
	cs[i].setAttribute('cy',y);
	cs[i].setAttribute('r',r);
    }
};

var t =0;
var go = function(e) {
    addCircle(s, 12,0,12, 'red')
    addCircle(s, 12,50,12, 'red')
    addCircle(s, 12,100,12, 'red')
    addCircle(s, 12,150,12, 'red')
    addCircle(s, 12,200,12, 'red')
    addCircle(s, 12,250,12, 'red')
    addCircle(s, 12,300,12, 'red')
    addCircle(s, 12,350,12, 'red')
    addCircle(s, 12,400,12, 'red')
    addCircle(s, 12,450,12, 'red')
    addCircle(s, 12,500,12, 'red')
    addCircle(s, 12,550,12, 'red')
    addCircle(s, 12,600,12, 'red')
    
    e.preventDefault();
    if (t==0){
	t = setInterval(move,100);
    } else {
	clearInterval(t);
	t=0;
    }
};

var s = document.getElementById("s");
s.addEventListener('click',clicked);
var g = document.getElementById("go");
g.addEventListener("click",go);
