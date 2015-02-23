var addJonalf = function(s,x,y) {
    var jaimg = document.createElementNS("http://www.w3.org/2000/svg",'image');
    jaimg.setAttribute('width',100*Math.random(10));
    jaimg.setAttribute('height',100);
    jaimg.setAttribute('id','jonalf');
    jaimg.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','jon_alf.png');
    jaimg.setAttribute('x',x-20);
    jaimg.setAttribute('y',y-30);
    s.appendChild(jaimg);
    j++;
};

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this) {return;}
    s = document.getElementById('s');
    addJonalf(s,e.offsetX,e.offsetY);
};

var move = function() {
    var cs = document.getElementsByTagName("image");
    for (var i=0;i<cs.length;i++) {
	var x = parseFloat(cs[i].getAttribute('x'));
	var y = parseFloat(cs[i].getAttribute('y'));
	x = x + 2*Math.random()-1;
	y = y + 2*Math.random()-1;
	cs[i].setAttribute('x',x);
	cs[i].setAttribute('y',y);
    }
};

var t=0;
var j=0;
var go = function(e) {
    e.preventDefault();
    if (t==0){
	t = setInterval(move,100);
    }
    if (j>5&&j<10){
	document.getElementById("message").innerHTML="What do I say?";
    }
    else if (j>10&&j<15){
	document.getElementById("message").innerHTML="Oh what do I say?";
    }
    else if (j>15&&j<20){
	document.getElementById("message").innerHTML="I will never tell you what I say.";
    }
    else if (j>20&&j<50){
	document.getElementById("message").innerHTML="Keep making more Jonalfs. I dare you.";
    }
    else if (j>50){
	document.getElementById("message").innerHTML="I say Hashtables.";
    }
};

var s = document.getElementById('s');
s.addEventListener('click',clicked);
document.getElementById("garden.mp3").play();
s.addEventListener("click",go);
