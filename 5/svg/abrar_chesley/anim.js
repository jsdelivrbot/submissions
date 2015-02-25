var clickInt = 0;
var firstX;
var firstY;
var shape;
var col;
var makeShape = function(e) {
    if ( clickInt == 0 ) {
	startShape(e);
    }
    else {
	continueShape(e);
    }
}
var startShape = function(e) {
    var line = document.getElementById("line").checked;
    var circle = document.getElementById("circle").checked;
    var rect = document.getElementById("rect").checked;
    var polyline = document.getElementById("polyline").checked;
    var red = document.getElementById("red").checked;
    var white = document.getElementById("white").checked;
    var blue = document.getElementById("blue").checked;
    var green = document.getElementById("green").checked;
    var black = document.getElementById("black").checked;
    if (red) {
	col="red";
    }
    else if (white) {
	col="white";
    }
    else if (blue) {
	col="blue";
    }
    else if (green) {
	col="green";
    }
    else {
	col="black";
    }
    console.log(line);
    console.log(circle);
    var shape1;
    var x;
    if (line) {
	shape1="line";
	x="x1";
	y="y1";
    }
    else if (circle) {
	shape1="circle";
	x="cx";
	y="cy";
    }
    else if (rect) {
	shape1="rect";
	x="x";
	y="y";
    }
    else {
	shape1="line";
	x="x1";
	y="y1";
    }
    firstX = e.offsetX;
    firstY = e.offsetY;
    shape = document.createElementNS("http://www.w3.org/2000/svg", shape1);
    shape.setAttribute(x, e.offsetX);
    shape.setAttribute(y, e.offsetY);
    var s = document.getElementById("s");
    //s.appendChild(c);
    //s.appendChild(l);
    clickInt = clickInt + 1;
    //c1.setAttribute(
};
var showImage = function(input) {
    alert(input.value);
    i = document.getElementById("uploadImg");
    i.setAttributeNS("w3.org/1999/xlink", "xlink:href", input.value);
    i.setAttribute("width", "500");
    i.setAttribute("height", "500");
    alert(input.value);
}
var continueShape = function(e) {
    clickInt = 0;
    console.log("cont");
    var x = e.offsetX;
    var y = e.offsetY;
    var shape1 = shape.tagName;
    if (shape1=="line") {
	shape.setAttribute("x2", x);
	shape.setAttribute("y2", y);
	shape.setAttribute("style", "stroke: "+col+"; stroke-width: 1;");
	if (document.getElementById("polyline").checked) {
	    startShape(e);
	}
    }
    else if ( shape1=="circle" ) {
	var r = Math.sqrt(Math.pow(x-firstX, 2) + Math.pow(y-firstY, 2));
	console.log(Math.pow(x-firstX, 2) + Math.pow(y-firstY, 2));
	shape.setAttribute ( "r", r );
	shape.setAttribute( "fill", col );
    }
    else {
	var w = x-firstX;
	var h = y-firstY;
	if ( w < 0 ) {
	    shape.setAttribute("x", x);
	}
	if ( h < 0 ) {
	    shape.setAttribute("y", y);
	}
	shape.setAttribute("width", Math.abs(w));
	shape.setAttribute("height", Math.abs(h));
	shape.setAttribute("style", "fill: "+col+";");
    }
    var s = document.getElementById("s");
    s.appendChild(shape);
    console.log(shape.tagName);
};
var s = document.getElementById("s");
s.addEventListener("click", makeShape);
