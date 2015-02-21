var svg = document.getElementById("c");
var stripPX = function(pixc){
    return parseInt(pixc.slice(0,-2));
}
var svgStyle = window.getComputedStyle(svg);
var maxx = stripPX(svgStyle.width);
var maxy = stripPX(svgStyle.height);
console.log(maxx,maxy);

var getRandColor = function(){
    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i=0;i<6;i++){
	color += letters[Math.floor(Math.random()*letters.length)];
    }
    return color;
};

var buildBlock = function(s,x,y,w,h){
    var rec = document.createElementNS("http://www.w3.org/2000/svg","rect");
    var remove = false;
    return {
	x:x,
	y:y,
	w:w,
	h:h,
	s:s,
	dx:30,
	draw:function(){
	   // console.log(this.x,this.y);
	    
	    rec.setAttribute("x", this.x);
	    rec.setAttribute("y", this.y);
	    //rec.setAttribute("rx", 10); //round corners
	    //rec.setAttribute("ry", 10);
	    rec.setAttribute("width", this.w);
	    rec.setAttribute("height", this.h);
	    //rect class in html file; all blocks should be of similar style
	    rec.setAttribute("class", "rect"); 
	    this.s.appendChild(rec);
	},
	move:function(){
	    //figure out algorithm to adjust movements of block
	    this.x += this.dx;
	    console.log(maxx, this.x);
	    
	    if (x >= maxx){
		this.s.removeChild(rec);
		remove = true;
		
	    }
	    
	},
	remove:remove,
	node:rec,

    }
}
var addPlayer = function(s,x,y){
    //temporary player is a circle for now
    var cir = document.createElementNS("http://www.w3.org/2000/svg","circle");
    return {
	s:s,
	x:x,
	y:y,
	dy:6,
	draw:function(){
	    var c = getRandColor();

	    cir.setAttribute("cx",this.x);
	    cir.setAttribute("cy",this.y);
	    cir.setAttribute("r","20");
	    cir.setAttribute("fill",this.c);
	    this.s.appendChild(cir);
	},
	move:function(){
	  //figure out algorithm to adjust movements of block
	    if (this.y <15 || this.y > maxy-15){
		this.dy *= -1;
	    }
	    this.y = this.y + this.dy;	
	   // console.log(this.y);
	},
	node:cir,

    }
}

/* fix block AND player movement */
var player = addPlayer(svg,30,250);
var blocks = [];

var spawnBlock = function(s,x,y,w,h){
    //console.log("listening");
    blocks.push(buildBlock(s,x,y,w,h));
}
var flipGravity = function(e ){
    if (e.keyCode == 32){
	console.log("SpaceBar hit");
	//flip gravity of player here
	spawnBlock(svg,20,40,60,60);
    }
}
var update = function(){
    //clear screen by clearing svg
    var fnode = svg.firstChild;
    while(fnode){
	svg.removeChild(fnode);
	fnode = svg.firstChild;
    }
    //player action
    player.move();
    player.draw();
    //console.log(player);
    // adds all blocks
    var removeindex = [];
    for (var i = 0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
	if (blocks[i].remove){
	    console.log("removable");
	    removeindex.push(i);
	}
    }
//bug here -> blocks not removing themselves when they go off screen 
    for (var ind = removeindex.length-1; ind >=0; ind--){
	blocks.splice(removeindex[ind]);
    }
    //console.log("animation now");
console.log(blocks.length);
    window.requestAnimationFrame(update);
}
spawnBlock(svg,20,270,60,60);
//document.addEventListener("click",spawnBlock(svg,20,40,60,60));  // <- doesnt work but doesnt matter

document.addEventListener("keyup",flipGravity);

window.requestAnimationFrame(update);
