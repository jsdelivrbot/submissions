//var c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//c1.setAttribute('cx',300);
//c1.setAttribute('cy',100);
//c1.setAttribute('r',50);
//c1.setAttribute('fill',"#00ff25");
var level, points, text;
level = 0;
points = 0;
var p = document.getElementById("points");
var s = document.getElementById("s");
var h = s.height.baseVal.value;
var w = s.width.baseVal.value;

var addEllipse = function(s,x,y,rx,ry,c,sc,sw,id) {
    var e1 = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
    e1.setAttribute('cx',x);
    e1.setAttribute('cy',y);
    e1.setAttribute('rx',rx);
    e1.setAttribute('ry',ry);
    e1.setAttribute('fill',c);
    e1.setAttribute('stroke',sc);
    e1.setAttribute('stroke-width',sw);
    e1.id = id;
    //e1.addEventListener('click',cClicked);
    s.appendChild(e1);
    return e1;
};

var addText = function(s,x,y,c,size,txt) {
    var t1 = document.createElementNS("http://www.w3.org/2000/svg","text");
    t1.setAttribute('x',x);
    t1.setAttribute('y',y);
    t1.setAttribute('fill',c);
    t1.setAttribute('font-size',size);
    t1.setAttribute('font-family','Arial');
    t1.textContent = txt;
    s.appendChild(t1);
    return t1;
};

var levelUp = function(e){
    clear();
    s.removeEventListener('click', f.clicked);
    level += 1;
    points += 100;
    p.textContent = "Points: "+points;
    text = addText(s,w/3,h/4,"black",40,"+100");
    //window.setTimeout(text.textContent = "Points: "+points"!",2000);
    window.setTimeout(function(){clear()},2000);
};

var clear = function(e){
    //for ( i = 0; i < s.childNodes.length; i++){
//	var item = s.childNodes[i];
//	s.removeChild(item);
  //  }
    while (s.lastChild){
	s.removeChild(s.lastChild);
    }
};


var f = {
    clicked : function(e){
	var rx = person.rx.baseVal.value;
	var ry = person.ry.baseVal.value;
	var frx = fire.rx.baseVal.value;
	var fry = fire.ry.baseVal.value;
	if (rx >= frx && ry >= fry){
	    levelUp();
	    console.log(level);
	}else{
	    var drx = rx/5;
	    var dry = ry/5;
	    e.preventDefault();
	    person.rx.baseVal.value = rx + drx;
	    person.ry.baseVal.value = ry + dry;
	}
	console.log('clicked');
    },
    start : function(e){
	text = addText(s,0,20,"black",20,"Click as fast as you can!");
	fire = addEllipse(s, w*.5, h*.75, w/4, h*.5, "orange", "red", 2, "fire");
	person = addEllipse(s, w*.5, h*.75, w/8, h*.25, "blue", "black", 2, "person");
	s.addEventListener('click',this.clicked);
    },
    person : document.getElementById("person"),
    fire : document.getElementById("fire")
};


