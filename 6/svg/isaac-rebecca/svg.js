// SVG to draw on
var svg = d3.select("svg");


// Function to make array of stars
function range(start, stop){
  var a=[start], b=start;
  while(b<stop){
  	b += 1;
  	a.push(b);
  };
  return a;
};


// Make the array of stars
var stars = range(0, 500).map(
    function() {
        return {
            cx: Math.random() * 700 , 
            cy: Math.random() * 675 
        } 
    });

// Append each circle in stars to SVG
for (var i = 0; i < stars.length; i++) {
    svg.insert("circle", "image")
    .attr("cx", stars[i].cx)
    .attr("cy", stars[i].cy)
    .attr("r", 1)
    .style("fill", "white")
    .style("stroke", "black")
    .style("stroke-width", 1);
};

var clickedjz = function(e){
    console.log("jz");

 svg.insert('rect')
    .attr("x", "700")
    .attr('y', "30")
    .attr('height','645')
    .attr('width','500')
    .attr('fill','white');

    svg.insert("image")
	.attr("x", "700")
	.attr("y","0")
	.attr("width", "500")
	.attr("height","675")
	.attr("xlink:href","jz.png");
    
}


var jz = document.getElementById("jz");
jz.addEventListener('click',clickedjz);

var clickedb = function(e){
    console.log('brown');

 svg.insert('rect')
    .attr("x", "700")
    .attr('y', "30")
    .attr('height','645')
    .attr('width','500')
    .attr('fill','white');

    svg.insert("image")
	.attr("x", "700")
	.attr("y","0")
	.attr("width", "500")
	.attr("height","675")
	.attr("xlink:href","brown.png");
}

var brown = document.getElementById("brown");
brown.addEventListener('click',clickedb);

var clickeddw = function(e){
    console.log('dw');

    svg.insert('rect')
	.attr("x", "700")
	.attr('y', "30")
	.attr('height','645')
	.attr('width','500')
	.attr('fill','white');
    
    svg.insert("image")
	.attr("x", "700")
	.attr("y","0")
	.attr("width", "500")
	.attr("height","675")
	.attr("xlink:href","dw.png");
}

var dw = document.getElementById("dw");
dw.addEventListener('click',clickeddw);

var clickedk = function(e){
    console.log('k');

    svg.insert('rect')
	.attr("x", "700")
	.attr('y', "30")
	.attr('height','645')
	.attr('width','500')
	.attr('fill','white');
    
    svg.insert("image")
	.attr("x", "700")
	.attr("y","0")
	.attr("width", "500")
	.attr("height","675")
	.attr("xlink:href","k.png");
}

var k = document.getElementById("k");
k.addEventListener('click',clickedk);

var clickedt = function(e){
    console.log('thluffy');
    
    svg.insert('rect')
	.attr("x", "700")
	.attr('y', "30")
	.attr('height','645')
	.attr('width','500')
	.attr('fill','white');
    
    svg.insert("image")
	.attr("x", "700")
	.attr("y","0")
	.attr("width", "500")
	.attr("height","675")
	.attr("xlink:href","thluffy.png");
}

var thluffy = document.getElementById("thluffy");
thluffy.addEventListener('click', clickedt);

var clickedz = function(e){
    console.log('z');
    
    svg.insert('rect')
	.attr("x", "700")
	.attr('y', "30")
	.attr('height','645')
	.attr('width','500')
	.attr('fill','white');

    svg.insert("image")
	.attr("x", "700")
	.attr("y","0")
	.attr("width", "500")
	.attr("height","675")
	.attr("xlink:href","z.png");
}

var z = document.getElementById('z');
z.addEventListener('click', clickedz);

var clear = function(e){
    svg.insert('rect')
	.attr("x", "700")
	.attr('y', "30")
	.attr('height','645')
	.attr('width','500')
	.attr('fill','white');
}

var c1 = document.getElementById('c1');
c1.addEventListener('click',clear);
