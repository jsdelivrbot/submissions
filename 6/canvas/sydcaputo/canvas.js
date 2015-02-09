

var c= document.getElementById("c");
var ctx = c.getContext("2d");



var clear = function(e){
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);
		ctx.beginPath();
};
c.addEventListener("click",clicked);
var b = document.getElementById("b");
b.addEventListener("click",clear);
