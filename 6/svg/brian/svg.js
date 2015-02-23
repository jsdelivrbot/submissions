var s = document.getElementById("s");
var sec = document.getElementById("seconds");
var min = document.getElementById("minutes");
var hrs = document.getElementById("hours");
var player = document.getElementById("player");
var food = null;
var pause = true;
var shootout = false;
var game = false;
var bonus = 0;

var dist = function(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
};

var calcPoint = function(theta){
    var x = 50*Math.sin(theta);
    var y = 50*Math.cos(theta);
    return {
	x: x,
	y: y
    };
};

var calcTheta = function(x,y){
    var d = dist(0,50,x,y);
    var theta = Math.acos(1-((d*d)/5000.0));
    if(x<0) theta = 2*Math.PI-theta;
    return theta;
};

var moveSec = function(){
    var x = sec.getAttribute("x2")-200;
    var y = 200-sec.getAttribute("y2");
    var theta = calcTheta(x,y);
    var dTheta = Math.PI/30;
    var newPoint = calcPoint(theta+dTheta);
    sec.setAttribute("x2",newPoint.x+200);
    sec.setAttribute("y2",200-newPoint.y);
};
var moveMin = function(){
    var x = min.getAttribute("x2")-200;
    var y = 200-min.getAttribute("y2");
    var theta = calcTheta(x,y);
    var dTheta = Math.PI/(60*30);
    var newPoint = calcPoint(theta+dTheta);
    min.setAttribute("x2",newPoint.x+200);
    min.setAttribute("y2",200-newPoint.y);
};
var moveHrs = function(){
    var x = hrs.getAttribute("x2")-200;
    var y = 200-hrs.getAttribute("y2");
    var theta = calcTheta(x,y);
    var dTheta = Math.PI/(12*60*30);
    var newPoint = calcPoint(theta+dTheta);
    hrs.setAttribute("x2",newPoint.x+200);
    hrs.setAttribute("y2",200-newPoint.y);
};

var bullet = function(x,y,dx,dy){
    var b = document.createElementNS("http://www.w3.org/2000/svg","circle");
    b.setAttribute('cx',x);
    b.setAttribute('cy',y);
    b.setAttribute('r',5);
    b.setAttribute('class','bullet');
    b.setAttribute('dx',dx);
    b.setAttribute('dy',dy);
    s.appendChild(b);
};

var checkHandOverlap = function(){
    var sx = sec.getAttribute("x2");
    var sy = sec.getAttribute("y2");
    var mx = min.getAttribute("x2");
    var my = min.getAttribute("y2");
    var hx = hrs.getAttribute("x2");
    var hy = hrs.getAttribute("y2");
    var b=false;
    if(shootout || dist(sx,sy,mx,my)<2.6+bonus || dist(sx,sy,hx,hy)<2.6+bonus){
	var k = dist(0,0,sx-200.0,sy-200.0);
	bullet(sx,sy,(sx-200.0)/k,(sy-200.0)/k);
	b = true;
	if (shootout) shootout = false;
    }
    if(dist(mx,my,hx,hy)<2.6+bonus){
	if(b){
	    shootout = true;
	}
	else{
	    var k = dist(0,0,mx-200.0,my-200.0);
	    bullet(mx,my,(mx-200.0)/k,(my-200.0)/k);
	}
    }
};

var moveBullets = function(){
    var bullets = document.getElementsByClassName("bullet");
    for (var i=0; i<bullets.length; i++){
	var b = bullets[i];
	var newX = parseFloat(b.getAttribute('cx'))+parseFloat(b.getAttribute('dx'));
	var newY = parseFloat(b.getAttribute('cy'))+parseFloat(b.getAttribute('dy'));
	if(newX<-5 || newX>405 || newY<-5 || newY>405){
	    s.removeChild(b);
	}
	b.setAttribute('cx',newX);
	b.setAttribute('cy',newY);
    }
};

var updatePlayer = function(e){
//    if (game){
	var sRect = s.getBoundingClientRect();
	player.setAttribute('cx',parseFloat(e.x)-sRect.left);
	player.setAttribute('cy',parseFloat(e.y)-sRect.top);
//    }
};

var checkCollision = function(){
    var bullets = document.getElementsByClassName("bullet");
    for (var i=0; i<bullets.length; i++){
	var x1 = player.getAttribute('cx');
	var y1 = player.getAttribute('cy');
	var x2 = bullets[i].getAttribute('cx');
	var y2 = bullets[i].getAttribute('cy');
	if(dist(x1,y1,x2,y2)<15){
	    console.log("DIE");
	    s.innerHTML = '';
	    var t = document.createElementNS("http://www.w3.org/2000/svg","text");
	    t.setAttribute('x',0);
	    t.setAttribute('y',100);
	    t.setAttribute('font-size','100');
	    t.appendChild(document.createTextNode('Score: '+(bonus*10)));
	    s.appendChild(t);
	    pause = true;
	}
    }
};

var handleFood = function(){
    if(food==null){
	var f = document.createElementNS("http://www.w3.org/2000/svg","circle");
	var x = Math.random()*400;
	var y = Math.random()*400;
	while(dist(x,y,200,200)<60){
	    x = Math.random()*400;
	    y = Math.random()*400;
	}
	f.setAttribute('cx',x);
	f.setAttribute('cy',y);
	f.setAttribute('r',10);
	f.setAttribute('stroke','green');
	f.setAttribute('fill','green');
	food = f;
	s.appendChild(f);
    }else{
	var x1 = player.getAttribute('cx');
	var y1 = player.getAttribute('cy');
	var x2 = food.getAttribute('cx');
	var y2 = food.getAttribute('cy');
	if (dist(x1,y1,x2,y2)<20){
	    bonus+=0.1;
	    console.log(bonus);
	    s.removeChild(food);
	    food = null;
	}
    }
};

var go = function(){
    if (pause) return;
    moveSec();
    moveMin();
    moveHrs();
    checkHandOverlap();
    moveBullets();
    handleFood();
    checkCollision();
};

window.addEventListener("keydown",function(e){
    console.log(e.keyCode);
    switch(e.keyCode){
    case 32:
	//pause = false;
	pause = !pause;
	game = true;
	break;
    }
});

s.addEventListener("mousemove",updatePlayer);

window.setInterval(go,10);
