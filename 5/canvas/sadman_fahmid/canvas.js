var c = document.getElementById("board");
var ctx = c.getContext("2d");

function getMousePos(c, e) {
	var rect = c.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

ctx.beginPath();
ctx.lineWidth=2;
	
c.addEventListener("click", function(e){
	var mousePos = getMousePos(c, e);
	console.log(mousePos.x + ', ' + mousePos.y)

	ctx.lineTo(mousePos.x, mousePos.y);
	ctx.stroke();
	ctx.fillStyle="red";
	ctx.fill();
})

document.getElementById("clear").onclick = function clear(){
	ctx.clearRect(0,0,500,500);
};