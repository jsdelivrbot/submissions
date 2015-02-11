var c = document.getElementById("c");
var ctx = c.getContext("2d");

//var yellow = "#FFFF00"
//var red = "#FF0000"
//var blue = "#0000FF"

var clicked = function(e){
    e.preventDefault();
    ctx.beginPath();
    ctx.arc(e.offsetX,e.offsetY,
	    15,0,2*Math.PI);
    ctx.fillStyle="#ff0000";
    ctx.stroke();
    ctx.fill();
};

var clear = function(e){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    ctx.beginPath();
    
};

var rotate = function(e){
	//startPath();
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(150, 30, 100, 100);  
    ctx.translate(200, 80); // translate to rectangle center 
                          // x = x + 0.5 * width
                          // y = y + 0.5 * height
    ctx.rotate((Math.PI/180)*25); // rotate
    ctx.translate(-200, -80); // translate back
	endPath();
    //ctx.fillRect(50,20,100,50);
    //ctx.beginPath();
    //ctx.fillRect(150,150,150,300);
    //ctx.translate(canvas.width/2,canvas.height/2)
    //ctx.rotate(90*Math.PI/180);
    //ctx.stroke();
    //ctx.fillRect(0,0,300,300);
};

function randomize(){
  for (var i=0;i<20;i++){
    for (var j=0;j<20;j++){
 //     ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i*Math.random(100)) + ',' +
 //                      Math.floor(255-42.5*j) + ',0)';
        ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*j*Math.random(100)) + ',' +
                        Math.floor(255-42.5*i*Math.random(100)) + ',' + Math.floor(255-42.5*j*i*Math.random(100)) + ')';
      ctx.fillRect(j*25,i*25,25,25);
    }
  }
}

//var isDrawing;

//c.onmousedown = function(e) {
//  isDrawing = true;
//  ctx.moveTo(e.clientX, e.clientY-100);
//};
//c.onmousemove = function(e) {
//  if (isDrawing) {
//    ctx.lineTo(e.clientX, e.clientY-100);
//    ctx.stroke();
//  }
//};
//c.onmouseup = function() {
//  isDrawing = false;
//};

c.addEventListener("click",clicked);
var b = document.getElementById("b");
b.addEventListener("click",clear);
var d = document.getElementById("d");
d.addEventListener("click",rotate);
//e.addEventListener("click", color);
var f = document.getElementById("f");
f.addEventListener("click", randomize);
//var g = document.getElementById("g");
//g.addEventListener("mousedown", draw)
