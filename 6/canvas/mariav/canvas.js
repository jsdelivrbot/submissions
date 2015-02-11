var c = document.getElementById("c");
var ctx = c.getContext("2d");



ctx.beginPath();
ctx.arc(50,10,10,0,2*Math.PI);
ctx.closePath();
ctx.fillStyle="#0000ff";
ctx.stroke();
ctx.fill();
