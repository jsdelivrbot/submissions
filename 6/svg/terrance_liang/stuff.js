var colors = ["#1abc9c","#95a5a6","#f1c40f","#f39c12",
	      "#2ecc71","#8e44ad","#ecf0f1","#d35400",
	      "#3498db","#bdc3c7","#e74c3c","#27ae60",
	      "#9b59b6","#c0392b","#e67e22","#2980b9",
	      "#34495e","#2c3e50","#16a085","#7f8c8d"];

var changeColor = function(ball){
    ball.setAttribute('fill',colors[parseInt(Math.random()*16)]);
};

var changeSpecColor = function(ball,color){
    ball.setAttribute('fill',color);
}

var bounce = function(ball,color){
    var x = parseFloat(ball.getAttribute('cx'));
    var y = parseFloat(ball.getAttribute('cy'));
    var dx = parseFloat(ball.getAttribute('dx'));
    var dy = parseFloat(ball.getAttribute('dy'));
    dx = dx * -1;
    dy = dy * -1;
    x = x + dx;
    y = y + dy;
    ball.setAttribute('dx',dx);
    ball.setAttribute('dy',dy);
    ball.setAttribute('cx',x);
    ball.setAttribute('cy',y);
    if (color == "single"){
	changeColor(ball);
    }
    else{
	changeSpecColor(ball,color);
    }
};

var addCircle = function(x,y,r){
    var ball = document.createElementNS("http://www.w3.org/2000/svg","circle");
    ball.setAttribute('cx',x);
    ball.setAttribute('cy',y);
    ball.setAttribute('r',r);
    ball.setAttribute('dx',(Math.random()*12)-6);
    ball.setAttribute('dy',(Math.random()*12)-6);
    ball.setAttribute('fill',colors[parseInt(Math.random()*16)]);
    ball.addEventListener('mouseover',cClicked);
    balls.appendChild(ball);
};

var clicked = function(e){
    e.preventDefault();
    if (e.toElement != this){
	return;
    }
    var bs = document.getElementsByTagName("circle");
    if (bs.length < 20){
	addCircle(e.offsetX,e.offsetY,20);
    }
};

var clear = function(e){
    var bs = document.getElementsByTagName("circle");
    while (bs.length > 0){
	balls.removeChild(bs[bs.length-1]);
    }
};
	
var cClicked = function(e){
    e.preventDefault();
    bounce(this,"single");
}

var move = function(e) {
    var bs = document.getElementsByTagName("circle");
    for (var i=0; i<bs.length;i++){
	var x = parseFloat(bs[i].getAttribute('cx'));
	var y = parseFloat(bs[i].getAttribute('cy'));
	var dx = parseFloat(bs[i].getAttribute('dx'));
	var dy = parseFloat(bs[i].getAttribute('dy'));
	if (x < 10 || x > 990){
	    dx = dx * -1;
	    bs[i].setAttribute('dx',dx);
	    changeColor(bs[i]);
	}
	if (y < 10 || y > 490){
	    dy = dy * -1;
	    bs[i].setAttribute('dy',dy);
	    changeColor(bs[i]);
	}
	x = x + dx;
	y = y + dy;
	bs[i].setAttribute('cx',x);
	bs[i].setAttribute('cy',y);
	for (var j=0; j<bs.length; j++){
	    var bx = parseFloat(bs[j].getAttribute('cx'));
	    var by = parseFloat(bs[j].getAttribute('cy'));
	    if ((x!=bx && y!=by) && (x<bx+15 && x>bx-15) && (y<by+15 && y>by-15)){
		var newi = parseInt(Math.random()*16);
		bounce(bs[i],colors[newi]);
		bounce(bs[j],colors[newi]);
		break;
	    }
	}
    }
};

var update = function(e){
    move(e);
    window.requestAnimationFrame(update);
};

var balls = document.getElementById("trippy");
balls.addEventListener("click",clicked);
var butt = document.getElementById("butt");
butt.addEventListener("click",clear);
window.requestAnimationFrame(update);
