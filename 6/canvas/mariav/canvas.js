var c = document.getElementById("c");
var ctx = c.getContext("2d");

ctx.fillStyle="#000000";
ctx.rotate(20*Math.PI/180);
ctx.fillRect(125,245,150,10);

ctx.fillStyle="#009933";
ctx.fillRect(0,500,10,100);
ctx.fillRect(0,590,100,10);
ctx.fillRect(90,500,10,100);

ctx.fillStyle="#5200A3";
ctx.fillRect(300,500,10,100);
ctx.fillRect(300,590,100,10);
ctx.fillRect(390,500,10,100);

ctx.beginPath();
ctx.arc(200,235,10,0,2*Math.PI);
ctx.closePath();
ctx.fillStyle="#000000";
ctx.stroke();
ctx.fill();
