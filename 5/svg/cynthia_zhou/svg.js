//var c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//c1.setAttribute('cx',300);
//c1.setAttribute('cy',100);
//c1.setAttribute('r',50);
//c1.setAttribute('fill',"#00ff25");
var level, points, text, speed, dspeed, lives, timer, myInterval;
level = 0;
points = 0;
lives = 3;
speed = 10; //max is timer.width = 600
dspeed = 3;
var p = document.getElementById("points");
var l = document.getElementById("lives");
var s = document.getElementById("s");
var h = s.height.baseVal.value;
var w = s.width.baseVal.value;
var mX, mY;
//var timer = document.getElementById("timer");
window.addEventListener('mousemove', function(e){
    mX = e.pageX - 9;
    mY = e.pageY - 87;
});

var addTimer = function(){
    var timer = document.createElementNS("http://www.w3.org/2000/svg","rect");
    timer.setAttribute('x','0');
    timer.setAttribute('y','50');
    timer.setAttribute('width',w);
    timer.setAttribute('height','20');
    timer.setAttribute('fill','red');
    timer.setAttribute('stroke','black');
    timer.setAttribute('stroke-width','1');
    s.appendChild(timer);
    return timer;
};

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
    clearInterval(myInterval);
    s.removeEventListener('click', f.clicked);
    level += 1;
    points += 100;
    p.textContent = "Points: "+points;
    text = addText(s,w/3,h/2,"black",40,"+100 Points");
    if (level%4==0){
	speed += dspeed;
	text.textContent = text.textContent + ", FASTER!"
    }
    //window.setTimeout(text.textContent = "Points: "+points"!",2000);
    window.setTimeout(function(){next()},2000);
};

var loseLife = function(e){
    clear();
    clearInterval(myInterval);
    s.removeEventListener('click', f.clicked);
    lives -= 1;
    l.textContent = "Lives: "+lives;
    text = addText(s,w/3,h/4,"black",40,"-1 Life");
    if (lives <= 0){
	lose = addText(s,w/3,h/2,"black",50,"You Lose :-(");
	score = addText(s,w/3,h*.75,"black",50,"Score :"+points);
    }else{
	window.setTimeout(function(){next()},2000);
    }
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

var decreaseTime = function(){
    if (timer.width.baseVal.value <= 0){
	loseLife();
    }else{
	timer.width.baseVal.value -= speed;
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
	}else{
	    var drx = rx/10;
	    var dry = ry/10;
	    e.preventDefault();
	    person.rx.baseVal.value = rx + drx;
	    person.ry.baseVal.value = ry + dry;
	}
    },
    start : function(e){
	myInterval = setInterval(decreaseTime, 300);
	text = addText(s,0,20,"black",20,"Click as fast as you can!");
	fire = addEllipse(s, w*.5, h*.75, w/4, h*.5, "orange", "red", 1, "fire");
	person = addEllipse(s, w*.5, h*.75, w/8, h*.25, "blue", "black", 1, "person");
	s.addEventListener('click',this.clicked);
    },
    person : document.getElementById("person"),
    fire : document.getElementById("fire")
};


var train = {
    peopleNum : 0,
    people : [],
    currentPerson : null,
    originalX : 0,
    originalY : 0,
    dy : 0,
    start : function(e){
	myInterval = setInterval(decreaseTime, 400);
	text = addText(s,0,20,"black",20,"Move them behind the orange line!");
	this.peopleNum = speed/5;
	var peopleW = w*.05;
	var peopleH = h*.1;
	for ( i=0; i<this.peopleNum; i++ ){
	    person = addEllipse(s, (i+1)*(w/(this.peopleNum+1)), h/2, peopleW, peopleH, "yellow", "black", "1", "person"+i);
	    person.addEventListener('mousedown',this.pressed);
	    this.people.push(person);
	    shadow = addEllipse(s, (i+1)*(w/(this.peopleNum+1)), h*.8, peopleW, peopleH, "white", "black", "3", "person"+i);
	    shadow.setAttribute('stroke-dasharray','5,5');
	    shadow.setAttribute('fill-opacity','0');
	    shadow.addEventListener('mouseup',this.shadowReleased);
	}
	this.dy = shadow.cy.baseVal.value - person.cy.baseVal.value;
	myevent = setInterval(this.movePerson,100);
	s.addEventListener('mouseup',this.released);
	var line = document.createElementNS("http://www.w3.org/2000/svg","rect");
	line.setAttribute('x','0');
	line.setAttribute('y',shadow.cy.baseVal.value - 70);
	line.setAttribute('width',w);
	line.setAttribute('height','20');
	line.setAttribute('fill','orange');
	line.setAttribute('stroke','black');
	line.setAttribute('stroke-width','1');
	s.appendChild(line);
    },
    movePerson : function(e){
	if (train.currentPerson != null){
	    train.currentPerson.cx.baseVal.value = mX;
	    train.currentPerson.cy.baseVal.value = mY;
	}
    },
    pressed : function(e){
	train.currentPerson = this;
	originalX = this.cx.baseVal.value;
	originalY = this.cy.baseVal.value;
    },
    released : function(e){
	train.currentPerson.cx.baseVal.value = originalX;
	train.currentPerson.cy.baseVal.value = originalY;
	train.currentPerson = null;
    },
    shadowReleased : function(e){
	train.currentPerson.cx.baseVal.value = originalX;
	train.currentPerson.cy.baseVal.value = originalY + train.dy;
	train.currentPerson = null;
	train.peopleNum -= 1;
	if (train.peopleNum <= 0){
	    levelUp();
	    train.reset();
	}
    },
    reset : function(e){
	s.removeEventListener('mouseup',this.released);
	this.people = [];
    }
};


var wire = {
    colors : ['pink','green','blue','yellow','purple','orange'],
    wires : [],
    currentLine : null,
    currentWire : null,
    wireNum : 0,
    addWire : function(x,y,c,id){
	var wire = document.createElementNS("http://www.w3.org/2000/svg","rect");
	wire.setAttribute('x',x);
	wire.setAttribute('y',y);
	wire.setAttribute('width','20');
	wire.setAttribute('height','80');
	wire.setAttribute('fill',c);
	wire.setAttribute('stroke','black');
	wire.setAttribute('stroke-width','1');
	wire.id = id;
	s.appendChild(wire);
	return wire;	
    },
    addLine : function(x1,y1,x2,y2,sc,sw){
	var line = document.createElementNS("http://www.w3.org/2000/svg","line");
	line.setAttribute('x1',x1);
	line.setAttribute('y1',y1);
	line.setAttribute('x2',x2);
	line.setAttribute('y2',y2);
	line.setAttribute('stroke',sc);
	line.setAttribute('stroke-width',sw);
	s.appendChild(line);
	return line;
    },
    setLine : function(line,x1,y1,x2,y2){
	line.setAttribute('x1',x1);
	line.setAttribute('y1',y1);
	line.setAttribute('x2',x2);
	line.setAttribute('y2',y2);
    },
    //line : wire.addLine('0','0','0','0','black','3'),
    moveLine : function(line,x2,y2){
	line.setAttribute('x2',x2);
	line.setAttribute('y2',y2);
    },
    pressed : function(e){
	var y1;
	wire.currentWire = this;
	if (this.y.baseVal.value < h/2){
	    y1 = this.y.baseVal.value+this.height.baseVal.value;
	}else{
	    y1 = this.y.baseVal.value;
	};
	//line = wire.addLine('0','0','0','0','black','3');
	wire.currentLine = wire.addLine(this.x.baseVal.value+this.width.baseVal.value/2,y1,mX,mY, 'black', '3');
	//wire.lines.push(line);
	//var lineInterval = setInterval(wire.moveLine(line,mouseX,mouseY), 100);
    },
    released : function(e){
	s.removeChild(wire.currentLine);
    },
    wireReleased : function(e){
	console.log(wire.currentWire.id+", "+this.id);
	if (this.id == wire.currentWire.id){
	    if (this.y.baseVal.value != wire.currentWire.y.baseVal.value){
		console.log("match");
		wire.wireNum -= 1;
		wire.addLine(wire.currentWire.x.baseVal.value+wire.currentWire.width.baseVal.value/2, wire.currentWire.y.baseVal.value+wire.currentWire.height.baseVal.value, this.x.baseVal.value+this.width.baseVal.value/2, this.y.baseVal.value, this.id, '10');
		if (wire.wireNum <= 0){
		    wire.reset();
		    levelUp();
		}
	    }
	}
    },
    updateLine : function(e){
	wire.moveLine(wire.currentLine,mX,mY);
    },
    start : function(e){
	myInterval = setInterval(decreaseTime, 1000);
	text = addText(s,0,20,"black",20,"Connect the wires!");
	this.wireNum = speed/5;
	if (this.wireNum > this.colors.length){
	    this.wireNum = this.colors.length;
	};
	for ( i=0; i<this.wireNum; i++ ){
	    wire1 = this.addWire((i+1)*50, 100, this.colors[i], this.colors[i]);
	    wire2 = this.addWire(w-(i+1)*50, h-80, this.colors[i], this.colors[i]);
	    wire1.addEventListener('mousedown',this.pressed);
	    wire2.addEventListener('mousedown',this.pressed);
	    wire1.addEventListener('mouseup',this.wireReleased);
	    wire2.addEventListener('mouseup',this.wireReleased);
	    s.addEventListener('mouseup',this.released);
	    this.wires.push(wire1);
	    this.wires.push(wire2);
	    //line = wire.addLine('0','0','0','0','black','3');
	    myevent = setInterval(wire.updateLine,100);
	};
	//s.addEventListener('mousedown',this.pressed);
    },
    reset : function(){
	this.wires = [];
	this.currentLine = null;
	this.currentWire = null;
	s.removeEventListener('mouseup',this.released);
    }
};

var games = [f, wire, train];

var next = function(){
    clear();
    var i = Math.floor(Math.random()*games.length);
    timer = addTimer();
    games[i].start();
};
//next();
