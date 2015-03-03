var c1 = document.createElementNS("http://www.w3.org/2000/svg", "image");
c1.setAttributeNS('http://www.w3.org/1999/xlink','href',"rock.png");
c1.setAttribute("Id","rock");

var svg = document.getElementById("s");
var rockNumber = Math.floor(Math.random()*3);
var timer = 0;

var makeCircle = function(x,y,r,isRock){
    return {
	cx: x,
	cy: y,
	r: r,
	isRock: isRock,
	dx: Math.random()*3+2,
	dy: Math.random()*3+2,
	color: "#ff0000",
	draw: function(){
	    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	    c.setAttribute('cx', this.cx);
	    c.setAttribute('cy', this.cy);
	    c.setAttribute('r', this.r);
	    c.setAttribute('fill', this.color);
	    svg.appendChild(c);
	},
	move: function(){
	    if (this.cx>395-r || this.cx < r+5)
		this.dx*= -1;
	    if (this.cy>395-r || this.cy < r+5)
		this.dy*= -1;
	    this.cx+= this.dx;
	    this.cy+= this.dy;
	}
    };
};

// show the rock
var update = function(){
    
    var cs = document.getElementsByTagName("circle");
    if (timer >= 15)
    return;
};


// change cups to some other var bc i deleted it
var shuffle = function(e) {
    var num = Math.floor(Math.random() * 3);
    c1.setAttribute('x',cups[num][0]);
    c1.setAttribute('y',cups[num][1]);
    c1.setAttribute('height',"100px");
    c1.setAttribute('width',"100px");
    var game = document.getElementById("s");
    s.appendChild(c1);
};

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this)
	return;
};

var move = function() {
    var cs = document.getElementsByTagName("circle");
    if (timer==0)
	return;
    var dx = Math.random()*3+2;
    var dy = Math.random()*3+2;
    for (var i=0;i<cs.length;i++) {
	var x = parseFloat(cs[i].getAttribute('cx'));
	var y = parseFloat(cs[i].getAttribute('cy'));
	if (x > 380 || x < 40)
	    dx = -dx;
	if (y > 380 || y < 40)
	    dy = -dy;
	x = x+dx;
	y= y+dy;
	cs[i].setAttribute('cx',x);
	cs[i].setAttribute('cy',y);
    }
};

var t = 0;
var t2 = 0;
var go = function(e) {
    e.preventDefault();
    if (t==0){
	t = window.setInterval(move,100);
	t2 = window.setInterval(function(){timer++;}, 1000);
    }
    else{
	window.clearInterval(t);
	window.clearInterval(t2);
	t=0;
	t2=0;
	timer=0;
    }
};


var circles = [];
var i=0;
while (i<3){
    var c;
    var isRock = false;
    if (i==rockNumber)
	isRock = true;
    if (i==0)
	c = makeCircle(140, 280, 40, isRock);
    if (i==1)
	c = makeCircle(180, 280, 40, isRock);
    if (i==2)
	c = makeCircle(210, 140, 40, isRock);
    circles[i] = c;
    i++;
}

var s = document.getElementById("s");
s.addEventListener("click",shuffle);
var g = document.getElementById("go");
g.addEventListener("click",go);
