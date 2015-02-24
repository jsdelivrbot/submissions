var c = document.getElementById("c");
var ctx = c.getContext("2d");
var xcor = 200;
var ycor = 0;
var drawBall() {
    ctx.fillStyle="#009933";
    ctx.fillRect(10,500,10,100);
    ctx.fillRect(10,590,100,10);
    ctx.fillRect(100,500,10,100);

    ctx.fillStyle="#5200A3";
    ctx.fillRect(290,500,10,100);
    ctx.fillRect(290,590,100,10);
    ctx.fillRect(380,500,10,100);

    ctx.fillStyle="#ff0000";
    var img = new Image();
    img.src = "metal.jpg";
    img.onload = function() {
	ctx.drawImage(img,125,245,150,10);
    };


    ctx.beginPath();
    ctx.arc(xcor,ycor,10,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle="#ff0000";
    ctx.stroke();
    ctx.fill();
    while (ycor < 250) {
	ycor += 10;
    };
    requestAnimationFrame(drawBall);
};
drawBall();
