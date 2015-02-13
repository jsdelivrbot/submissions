var CSSCOLORS = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var circles = [];
function ayy(){

	
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, W, H);
	//style.opacity = '0.00002';
	//alert("hey");
	
}
var Circ = function(x,y, r, ctx) {
		return {
				x : x,
				y : y,
				r : r,
				ctx : ctx,
				color : "blue",
				draw : function() {
						
						ctx.arc(x,y, r,0,2 * Math.PI,false);
						ctx.fillStyle = this.color;
						ctx.fill();
						ctx.closePath();
				}
			}

};



function recolor(color) {
	//console.log(color);
	ctx.fillStyle=color;
	ctx.fill();
	ctx.closePath();
}
canvas.addEventListener('click', function(e) {

		//alert("ayy");
		//ctx.strokeStyle="blue";
		//ctx.stroke();

		circles.push(Circ(e.offsetX,e.offsetY,6,ctx));
		
		circles[circles.length-1].draw();
		
		if (circles.length > 0){
			var i=Math.floor(Math.random()*circles.length);
			var color=CSSCOLORS[i];
			recolor(color);
			//console.log(color);
		}
					 });


window.onload=ayy;
