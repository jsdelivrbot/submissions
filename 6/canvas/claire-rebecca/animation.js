var c = document.getElementById("c");
ctx = c.getContext("2d");

var mousedown = function(e){
    setInterval(draw(e), 1);
};

var draw = function(e){
    var x = e.offsetX;
    console.log(x);
    var y = e.offsetY;
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI)
    ctx.fillStyle ="ff0000";
    ctx.stroke();
    ctx.fill();
};



c.addEventListener("mousedown", mousedown)
