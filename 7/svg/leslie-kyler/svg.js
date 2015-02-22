
var makeCircle = function(s,x,y,r,c) {
	var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
	c1.setAttribute('cx',x);
	c1.setAttribute('cy',y);
	c1.setAttribute('r',r);
	c1.setAttribute('fill',c);
	s.appendChild(c1);
};

var clicked = function(e) {
	e.preventDefault();
	if (e.toElement != this) {return;}
	s = document.getElementById("s");
	var w = parseFloat(document.getElementById("width").value);
	
	var color;
	if(document.getElementById('color_red').checked) {color="red";}
	if(document.getElementById('color_green').checked) {color="green";}	
	if(document.getElementById('color_blue').checked) {color="blue";}

	if(document.getElementById('shape_circle').checked)
	{makeCircle(s,e.offsetX,e.offsetY,w/2,color);}
}





var s = document.getElementById("s");
s.addEventListener('click',clicked);
