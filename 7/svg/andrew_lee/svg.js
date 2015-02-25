var disappear = function(){
    this.remove();
};

var addCircle = function(x,y,r){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.setAttribute('r',r);
    c.setAttribute('fill', "hsl(" + Math.random() * 360 + ",100%,50%)");
    c.addEventListener('click',disappear);
    s.appendChild(c);
};

var move = function(){
    var circles = document.getElementsByTagName("circle");
    for (var i = 0;i<circles.length;i++){
    var x = Math.random() * 1000;
//parseFloat(circles[i].getAttribute('cx'));
    var y = Math.random() * 500;
//parseFloat(circles[i].getAttribute('cy'));
/*    var dx = Math.random()*10;
    var dy = Math.random()*10;
    if(x+dx>1000 || x + dx < 0)
        dx = -dx;
	if(y+dy > 500 || y+dy<0)
	    dy = -dy;
	    x += dx;
	    y += dy;
*/
	    circles[i].setAttribute('cx',x);
	    circles[i].setAttribute('cy',y);
    }
}

var t=0;
var start = function(){
    for (var i = 0;i<50;i++){
	addCircle(Math.random()*1000,Math.random()*500,Math.random()*30);
    }
    if (t==0){
	t=setInterval(move,1000);
    } else {
	clearInterval(t);
	t=0;
    }
};

var st = document.getElementById("Start");
st.addEventListener("click",start);
