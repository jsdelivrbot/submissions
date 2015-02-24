var shapes = [];
var texts = [];
var t =0;
var s = document.getElementById("s");

var addCircle = function(x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    shapes.push(c1);
    s.appendChild(c1);
};
var addText = function(x,y,content,color,fontsize){
    var t1=document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t1.setAttribute('x', x-(content.length*fontsize/5));
    t1.setAttribute('y', y+(content.length*fontsize/5));
    t1.setAttribute('font-size', fontsize);
    t1.setAttribute('fill', color);
    t1.textContent = content;
    texts.push(t1);
    s.appendChild(t1);
}
var go = function(e) {
    e.preventDefault();
    if (t==0){
	t = setInterval(move,100);
    } else {
	clearInterval(t);
	t=0;
    }
};
var move = function(){
    var sync = false;
    for(var i =0; i<shapes.length;i++){
	var newsize=parseInt(shapes[i].getAttribute('r'))+5;
	if(newsize > 225){
	    newsize=5;
	    if(i == shapes.length-1){
		sync=true;
	    }
	}
	shapes[i].setAttribute('r',newsize);
    }
    for(var i = 0; i<texts.length;i++){
	var newsize= parseInt(texts[i].getAttribute('font-size'))+4;
	if(newsize*texts[i].textContent.length/5 > 225){
	    newsize=5;
	}
	if(sync){
	    newsize=5;
	}
	var newx=297-((newsize*texts[i].textContent.length)/5);
	var newy=235+((newsize*texts[i].textContent.length)/5);
	texts[i].setAttribute('font-size',newsize);
	texts[i].setAttribute('x',newx);
    }
    sync=false;
};
var g = document.getElementById("go");
g.addEventListener("click",go);
for(var i =50; i>=5;i--){
    switch(i%7){
	case 1 : color = "orange"
	break;
	case 2 : color = "yellow"
	break;
	case 3 : color = "green"
	break;
	case 4 : color = "blue"
	break;
	case 5 : color = "indigo"
	break;
	case 6 : color = "violet"
	break;
	default:
	color="red"
    }	
    addCircle(300,225,i*5,color);
}
addText(300,235,"Hello!","white",5);
