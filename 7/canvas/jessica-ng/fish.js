
var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");

ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.fillRect (0, 0, 600, 600);

ctx.beginPath();
ctx.strokeStyle = "white";
ctx.fillStyle = "white";
ctx.arc(300, 300, 300, 0, Math.PI*2);
ctx.stroke();
ctx.fill();
ctx.closePath();

var clicked = function(e){
    e.preventDefault();
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY,
	    15,0,2*Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke(); 
};
var clear = function(e) { 
    e.preventDefault();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.fillRect (0, 0, 600, 600);

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.arc(300, 300, 300, 0, Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

};
//fish = new Image();
//fish.src = "fish2.png";
//ctx.drawImage (fish, 300, 300);
/*
  var ripple = function (x, y, ctx) {
  return {
  x : x, 
  y : y,
  ctx : ctx,
  d : 5, 
  draw : function() {
  ctx.strokeStyle = "black";
  ctx.arc(this.x, this.y, 5, 0, Math.PI*2);
  ctx.stroke();
  };
  move : function() {
  d = d + 1;
  ctx.arc(this.x, this.y, d, 0, Math.PI*2);
  ctx.stroke();
  };
  };
  };

  var makeBlock = function(x,y,w,h,ctx) {
  return {
  x : x,
  y : y,
  w : w,
  h : h,
  ctx : ctx,
  dx : 1,
  color : "#000000",
  draw : function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.w,this.h);
  },
  move : function() {
  this.x = this.x + this.dx;
  this.y = this.y + 2*Math.random() - 1;
  if (this.x < 20 || this.x > 580){
  this.dx = this.dx * -1;
  }
  if (this.y < 20 || this.y > 580){
  this.y = 100+400*Math.random();
  }
  }
  };
  };

  var update = function(){
  //ctx.fillStyle = "#000000";
  //ctx.fillRect(0,0,600,600);

  for (var i=0; i < blocks.length; i++){
  blocks[i].move();
  //blocks[i].draw();
  }
  window.requestAnimationFrame(update);
  };

  var addRipple = function(e){
  var x = e.offsetX;
  var y = e.offsetY;
  var w = 20+Math.random(40);
  var h = 10+Math.random(20);
  blocks.push(ripple(x,y,ctx));
  
  };

*/
c.addEventListener("click", clicked);
b.addEventListener("click",clear)

//var blocks = [];
//blocks.push(ripple(50,100,30,15,ctx));
//blocks.push(makeBlock(100,200,30,15,ctx));
//window.requestAnimationFrame(update);
