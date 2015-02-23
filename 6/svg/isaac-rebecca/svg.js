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