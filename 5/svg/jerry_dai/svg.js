var balls = 15 ;
var clock = 0 ;

var update = function(b) {
    var c = document.getElementById("count");
    c.innerHTML = balls.toString();
    if (b=0) {
	c.innerHTML = 0;
    }
};

var timer = function() {
    var t = document.getElementById("time");
    clock+=10 ;
    t.innerHTML = clock + 10;
}

var spawn = function() {
    var s = document.getElementById("s");
    var no = balls ;
    for(var i = 0; i < no; i++) {
	var r = 5 + 30*Math.random();
	var x = 500*Math.random();
	var y = 500*Math.random();
	addCircle(s, x, y, r, "black");
    }
    balls = balls - no;
    update();
};

var cClicked = function(e) {
    e.preventDefault();
    console.log("cClicked");
    var c = this.getAttribute('fill');
    this.remove();
    balls--;
    update();
};

var addCircle = function(s,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    c1.addEventListener('click',cClicked);
    s.appendChild(c1);
    balls++;
    update();
};

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this) {return;}
    s = document.getElementById("s");
    var r = 5+30*Math.random();
    addCircle(s,e.offsetX,e.offsetY,r,'black');
    update();
};

var move = function() {
    var cs = document.getElementsByTagName("circle");
    for (var i=0 ; i < cs.length; i++) {
	var x = parseFloat(cs[i].getAttribute('cx'));
	var y = parseFloat(cs[i].getAttribute('cy'));
	var r = parseFloat(cs[i].getAttribute('r'));
	x = x + 2*Math.random()-1;
	y = y + 2*Math.random()-1;
	r = r + 2*Math.random()-1;
	if (r<5) {r=20;}
	cs[i].setAttribute('cx',x);
	cs[i].setAttribute('cy',y);
	cs[i].setAttribute('r',r);
    }
    if (balls <= 0) {
	var scor = document.getElementById("score");
	var old = parseInt(scor.innerHTML);
	var ti = clock ;
	if ( (old == 0)||(ti < old) ) {
	    scor.innerHTML = (ti + 10).toString();
	} 
	clearInterval(t);
	t = 0;
    } else {
	timer();
    }

};

var t =0;
var go = function(e) {
    e.preventDefault();
    spawn();
    if (t==0){
	t = setInterval(move,10);
    } else {
	clearInterval(t);
	t=0;
    }
};

var reset = function(e) {
    clock = 0;
    document.getElementById("time").innerHTML = 0 ;
    balls = 0;
    clearInterval(t);
    t = 0;
}

var s = document.getElementById("s");
s.addEventListener('click',clicked);
var g = document.getElementById("go");
g.addEventListener("click",go);
