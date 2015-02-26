var circles = [];
var mouseX = 0;
var mouseY = 0;
 
var circle = function(size, color, x, y){
    var c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',size);
    c1.setAttribute('fill', color);
    return c1;
}

var s = document.getElementById("s");

var color = function(){
    var s = "#";
    s += parseInt(Math.random()*236 + 20).toString(16) + parseInt(Math.random()*236 + 20).toString(16) + parseInt(Math.random()*236 + 20).toString(16);
    return s;
}

for (var i = 0; i < 100; i++){
    c = circle(300 - (i*3), color(), 0, 0);
    circles.push(c);
}

var time = 10;
var update = function(){
    if (time <= 0){
	time = 10;
    }
    
    else{
	for (var i = 0; i < circles.length; i++){
	    var c = circles[i];
	    var cX = parseInt(c.getAttribute("cx"));
	    var cY = parseInt(c.getAttribute("cy"));
	    
	    c.setAttribute("cx", mouseX);
	    c.setAttribute("cy", mouseY);
	    
	    s.appendChild(c);
	}
	time--;
    }
	window.requestAnimationFrame(update);
}

var move = function(e){
    for (var i = circles.length-1; i > 1; i--){
	console.log("change");
	circles[i].setAttribute("fill", circles[c-1].getAttribute("fill"));
    }
}
window.onmousemove = function(e){
    mouseX = e.offsetX;
    mouseY = e.offsetY;
};

window.requestAnimationFrame(update);
s.addEventListener("mousemove", move);
