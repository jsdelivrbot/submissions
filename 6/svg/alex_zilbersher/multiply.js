var s = document.getElementById("s");
var circles = document.getElementById("circles");

var click = function(e) {
    addCircle(e.offsetX, e.offsetY,0,0,1);
};

var addCircle = function(x,y,dx,dy,gen) {
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    var r = 0;
    if(gen==1){
	r = 30;
    }else if(gen==2){
	r = 25;
    }else if(gen==3){
	r = 20;
    }else if(gen==4){
	r = 15;
    }else if(gen==5){
	r = 10;
    }
    var color = colorGen(gen);
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.setAttribute('r',r);
    c.setAttribute('fill',color);
    c.setAttribute('dx',dx);
    c.setAttribute('dy',dy);
    c.setAttribute('gen',gen);//ie: generation
    s.appendChild(c);
    circles.innerHTML=parseInt(circles.innerHTML)+1;
};

var colorGen = function(gen){ //Color Generator for different generations
    if(gen==1){
	return "#CC0000";
    }else if(gen==2){
	return "#8A008A";
    }else if(gen==3){
	return "#0000FF";
    }else if(gen==4){
	return "#00CCFF";
    }else if(gen==5){
	return "#85FFAD";
    }else{
	return "#FFFFFF";
    }
}

var move = function() {
    var cs = document.getElementsByTagName("circle");
    for (var i=0;i<cs.length;i++) {
        var x = parseFloat(cs[i].getAttribute('cx'));
        var y = parseFloat(cs[i].getAttribute('cy'));
        var r = parseFloat(cs[i].getAttribute('r'));
        var dx = parseFloat(cs[i].getAttribute('dx'));
        var dy = parseFloat(cs[i].getAttribute('dy'));
        var gen = parseFloat(cs[i].getAttribute("gen"));
        if (r>0){
	    r--;
	    if (x-r<0 || x+r>600){
                dx = dx*-1;
            }
            if (y-r<0 || y+r>600){
                dy = dy*-1;
            }
	    x+=dx;
	    y+=dy;
	    cs[i].setAttribute('cx',x);
            cs[i].setAttribute('cy',y);
            cs[i].setAttribute('dx',dx);
            cs[i].setAttribute('dy',dy);
            cs[i].setAttribute('r',r);
	}else{
	    if(gen==1 || gen==3){
		addCircle(x+(r*2),y+(r*2),3,3,gen+1);
		addCircle(x-(r*2),y+(r*2),-3,3,gen+1);
		addCircle(x+(r*2),y-(r*2),3,-3,gen+1);
		addCircle(x-(r*2),y-(r*2),-3,-3,gen+1);
	    }else if(gen==2 || gen==4){
		addCircle(x,y+(r*2),0,5,gen+1);
		addCircle(x+(r*2),y,5,0,gen+1);
		addCircle(x,y-(r*2),0,-5,gen+1);
		addCircle(x-(r*2),y,-5,0,gen+1);
	    }
	    cs[i].remove();
	    circles.innerHTML=parseInt(circles.innerHTML)-1;
	    //cs[i].setAttribute('gen',6);
	}
    }
};

var myevent;
myevent = setInterval(move,50);
s.addEventListener('click',click);
