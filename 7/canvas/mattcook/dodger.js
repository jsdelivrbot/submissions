var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");

var createBlock = function(r,ctx) {
		return {
				x : getRandomInt(21,579),
				y : getRandomInt(21,579),
		                r : r,
 				ctx : ctx,
				dx : getRandomDirection(),
		    dy : getRandomDirection(),
				color : getRandomColor(),
				draw : function() {
				    ctx.fillStyle=this.color;
				    ctx.beginPath();
				    
				    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
				    ctx.fill();
				    ctx.stroke();
				},
				move : function() {
						this.x = this.x + 4*this.dx;
						this.y = this.y + 4*this.dy;
						if (this.x < 20 || this.x > 580){
								this.dx = this.dx * -1.001;
						}
						if (this.y < 20 || this.y > 580){

								this.dy = this.dy*-1.001;
						}
				}
		};
};

function getRandomDirection() {
    var dir=getRandomInt(0,1);
    if (dir ==0){
	dir=-1;
    }
    return dir;
}



function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var update = function(){
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);
		for (var i=0; i < blocks.length; i++){
				blocks[i].move();
				blocks[i].draw();
		}
		window.requestAnimationFrame(update);
}

var addBlock = function(e){
		var x = e.offsetX;
		var y = e.offsetY;
		var r = 5+Math.random()*40;
    
		blocks.push(createBlock(r,ctx));
		
};

$('#c').mousemove(function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//    $('#status').html(coord + "<br>" + hex);
    $('#status').html(blocks.length);
    $('#t').html("BD Score="+blocks.length);
    if (hex != "#ffffff"){
	console.log("off");
	var score=blocks.length;
	blocks=[];
	$('#status').html(0);
    $('#t').html("BD Score="+0);
	alert("You lost! Your score was " + score);
    }
});
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



c.addEventListener("click",addBlock);

var blocks = [];
window.requestAnimationFrame(update);
