var init = function() {
    var clickInt = 0;
    var firstX;
    var firstY;
    var shape;
    var col;
    var light;
    var lightLine = function(e) {
	//console.log(dot);
	var cool = document.getElementById("cool").checked;
	console.log("cool: " + cool);
	if (light && !cool) {
	    light.remove();
	}
	if (firstX && firstX != "undefined") {
	    console.log("firstX: " + firstX);
	    light = document.createElementNS("http://www.w3.org/2000/svg", "line");
	    light.setAttribute("x1", firstX);
	    light.setAttribute("y1", firstY);
	    light.setAttribute("x2", e.offsetX);
	    light.setAttribute("y2", e.offsetY);
	    light.setAttribute("style", "stroke: black; stroke-width: 1;");
	    document.getElementById("s").appendChild(light);
	}
	/*var c = document.createElementNS("http://www.w3.org/2000/svg", "line");
	c.setAttribute("x1", 5);
	c.setAttribute("y1", 5);
	c.setAttribute("x2", 0);
	c.setAttribute("y2", 0);
	c.setAttribute("style", "stroke: black; stroke-width: 1;");
	//c.setAttribute("fill", "red");
	document.getElementById("s").appendChild(c);*/
    }
    var makeShape = function(e) {
	//alert("x: " + e.offsetX + "y: " + e.offsetY);
	/*dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	dot.setAttribute("cx", e.offsetX);
	dot.setAttribute("cy", e.offsetY);
	dot.setAttribute("r", 1);
	//dot.setAttribute("style", "stroke: black; stroke-width: 1;");
	document.getElementById("s").appendChild(dot);*/
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
	else {//polyline
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
	light.remove();
	console.log(firstX);
	if (shape1=="line") {
	    /*if (!document.getElementById("polyline").checked) {
		makeShape(e);
	    }*/
	    shape.setAttribute("x2", x);
	    shape.setAttribute("y2", y);
	    shape.setAttribute("style", "stroke: "+col+"; stroke-width: 1;");
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
	//alert(shape.getAttribute("x2"));
	s.appendChild(shape);
	if (document.getElementById("polyline").checked) {
	    startShape(e);
	}
	console.log(shape.tagName);
	firstX=undefined;
    };
    var s = document.getElementById("s");
    s.addEventListener("click", makeShape);
    s.addEventListener("mousemove", lightLine);
};
