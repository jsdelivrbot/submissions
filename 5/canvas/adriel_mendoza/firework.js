var c = document.getElementById("c");
var ctx = c.getContext("2d");

//make canvas black
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(500,0);
ctx.lineTo(500,500);
ctx.lineTo(0,500);
ctx.lineTo(0,0);
ctx.fillStyle = "#000000";
ctx.fill();
ctx.closePath();

//to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//delays the drawing of a line
function draw(x, y) {
	ctx.beginPath();
	ctx.moveTo(x,500);
	var counter = 1;
	var delay = setInterval(function(){
		ctx.lineTo(x,500 - (counter * ((500 - y) / 100)));
		ctx.stroke();
		counter++;
		if(counter > 100){
			clearInterval(delay);
		}
	}, 5);
	ctx.closePath();
}

//delays the explosion
//function explode(x, y) {
	//ctx.strokeStyle = getRandomColor();
	//ctx.beginPath();
	//var counter = 1;
	//var delay = setInterval(function(){
		//ctx.lineTo(500 - (counter * ((500 - x) / 100)),10 * Math.pow(3, 1/2) - (counter * ((10 * Math.pow(3, 1/2) - y) / 100)));
		//ctx.stroke();
		//counter++;
		//if(counter > 100){
			//clearInterval(delay);
		//}
	//}, 5);
	//ctx.closePath();
//}

var clicked = function(e){
	e.preventDefault();
	c.removeEventListener("click",clicked);
	on = false;

	ctx.strokeStyle = getRandomColor();

	//shoots firework
	draw(e.offsetX, e.offsetY);
	//firework explodes
	
	c.addEventListener("click",clicked);


	//still having difficulty preventing multiple clicks from happening
};

c.addEventListener("click",clicked);


