var s = document.getElementById("s");
var sec = document.getElementById("seconds");
var min = document.getElementById("minutes");
var hrs = document.getElementById("hours");

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
    //console.log(dist(sx,sy,mx,my));
    if(dist(sx,sy,mx,my)<2.6){
	var k = dist(0,0,sx-200.0,sy-200.0);
	bullet(sx,sy,(sx-200.0)/k,(sy-200.0)/k);
	//console.log(((sx-200.0)/k)+','+((sy-200.0)/k));
	//console.log(k);
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

var go = function(){
    moveSec();
    moveMin();
    moveHrs();
    checkHandOverlap();
    moveBullets();
};
/*
window.setInterval(moveSec,100);
window.setInterval(moveMin,100);
window.setInterval(moveHrs,100);
window.setInterval(moveBullets,100);
 */
window.setInterval(go,10);
