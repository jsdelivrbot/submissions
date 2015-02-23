
var makeCircle = function(s,x,y,r,c) {
	var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
	c1.setAttribute('cx',x);
	c1.setAttribute('cy',y);
	c1.setAttribute('r',r);
	c1.setAttribute('fill',c);
	s.appendChild(c1);
};

var makeSquare = function(s,x,y,r,c){
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    c1.setAttribute('x',x-r);
    c1.setAttribute('y',y-r);
    c1.setAttribute('width', r*2);
    c1.setAttribute('height',r*2);
    c1.setAttribute('fill',c);
    s.appendChild(c1);
}

var makeTriangle = function(s,x,y,r,c){
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","polyline");
    c1.setAttribute('points', "" + (x-r) + "," + y + " " + (x+r) + "," + y + " " + x + "," + (y-(r*2)));
    c1.setAttribute('fill',c);
    s.appendChild(c1);
}

var makeStar = function(s,x,y,r,c){
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","polygon");
    c1.setAttribute('points', "" + x + "," + (y-r) + " " + (x-(r*.7)) + "," + (y+r) + " " + (x+r) + "," + (y-(r*.3)) + " " + (x-r) + "," + (y-(r*.3)) + " "  + (x+(r*.7)) + "," + (y+r));
    c1.setAttribute('fill',c);
    s.appendChild(c1);
    }
		

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement != this) {return;}
    var w = parseFloat(document.getElementById("width").value);
    if (isNaN(w)) {
	alert("Please enter a valid width.");
	return;
    }
    s = document.getElementById("s");
    
    var color;
    color = "#" + document.getElementById("color").value;

    if(document.getElementById('shape_circle').checked)
    {makeCircle(s,e.offsetX,e.offsetY,w/2,color);}
    if(document.getElementById('shape_square').checked){
	makeSquare(s,e.offsetX,e.offsetY,w/2,color);
	}
    if(document.getElementById('shape_triangle').checked){
	makeTriangle(s,e.offsetX,e.offsetY,w/2,color);
    }
    if(document.getElementById('shape_star').checked){
	makeStar(s,e.offsetX,e.offsetY,w/2,color);
}

}

var clear = function(e) {
    svg = document.getElementById("s");
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
	}
}




var s = document.getElementById("s");
s.addEventListener('click',clicked);
var s = document.getElementById("c");
c.addEventListener('click',clear);
