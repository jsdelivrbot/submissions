var b = document.getElementById("b");
var s = document.getElementById("s");
var m = document.getElementById("m");


var getRandomColor = function(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//redirecting
var clicked = function(e){
    e.preventDefault();
    console.log("ok");
}

//adds circle according to mouse position
var addCircle = function(e){
    e.preventDefault();
    var c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c1.setAttribute('cx', e.offsetX);
    c1.setAttribute('cy', e.offsetY);
    c1.setAttribute('r', 10 + Math.random() * 10);
    c1.setAttribute('dx', 5 + Math.random() * 5);
    c1.setAttribute('dy', 5 + Math.random() * 5);
    c1.setAttribute('fill', getRandomColor());
    c1.addEventListener("click",clicked);
    s.appendChild(c1);
};

//adds circle at random location
var randAddCircle = function(e){
    e.preventDefault();
    var c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var x = 15 + Math.random() * 550;
    var y = 15 + Math.random() * 550;
    var ra = 10 + Math.random() * 10;
    var dx = 5 + Math.random() * 5;
    var dy = 5 + Math.random() * 5;
    c1.setAttribute('cx', x);
    c1.setAttribute('cy', y);
    c1.setAttribute('r', ra);
    c1.setAttribute('dx', dx);
    c1.setAttribute('dy', dy);
    c1.setAttribute('fill', getRandomColor());
    s.appendChild(c1);
};

var move = function(){
    var cs = document.getElementsByTagName("circle");
    for (var i = 0; i < cs.length; i++){
	var x = parseFloat(cs[i].getAttribute('cx'));
	var y = parseFloat(cs[i].getAttribute('cy'));
	var dx = parseFloat(cs[i].getAttribute('dx'));
	var dy = parseFloat(cs[i].getAttribute('dy'));
	if (x < 15 || x > 585){
	    dx = dx * -1;
	    cs[i].setAttribute('dx', dx);
	}
	if (y < 15 || y > 585){
	    dy = dy * -1;
	    cs[i].setAttribute('dy', dy);
	}
	//console.log(cs[i].getAttribute("dy"));
	cs[i].setAttribute('cx', x + dx);
	cs[i].setAttribute('cy', y + dy);
    }
};

var t = 0;
var go = function(e){
    console.log("go");
    e.preventDefault();
    if (t == 0){
	t = setInterval(move,100);
    }
    else{
	clearInterval(t);
	t = 0;
    }
};

b.addEventListener("click", randAddCircle);
s.addEventListener("click", addCircle);
m.addEventListener("click", go);

