
var svg = document.getElementById("c");
var stripPX = function(pixc){
    return parseInt(pixc.slice(0,-2));
}
var svgStyle = window.getComputedStyle(svg);
var maxx = stripPX(svgStyle.width);
var maxy = stripPX(svgStyle.height);
//console.log(maxx,maxy);

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
	dx:-8,
	draw:function(){
	    rec.setAttribute("x", this.x);
	    rec.setAttribute("y", this.y);
	    rec.setAttribute("width", this.w);
	    rec.setAttribute("height", this.h);
	    //rect class in html file; all blocks should be of similar style
	     rec.setAttribute("class", "rect"); 
	    this.s.appendChild(rec);
	},
	move:function(){
	    //figure out algorithm to adjust movements of block
	    this.x += this.dx;
	    if (this.x+this.w < 0){
		//this.s.parentNode.removeChild(rec);   //if child is of screen, element is deleted from svg
		this.remove = true; // send boolean so we can remove this block from block list
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
	//0=moving along bottom, 1=switching to top, 2=moving along top, 3=switching to bottom
	state:0,
	draw:function(){
	    var c = getRandColor();

	    cir.setAttribute("cx",this.x);
	    cir.setAttribute("cy",this.y);
	    cir.setAttribute("r","20");
	    cir.setAttribute("fill",this.c);
	    this.s.appendChild(cir);
	},
	move:function(){
	   	if (this.state == 0) {
	   		this.y = maxy-15;
	   	}
	   	else if (this.state == 1) {
	   		this.y = this.y - this.dy;
	   		//fix if statements to detect blocks
	   		if (this.y < 15){
	   			this.state = 2;
	   		}
	   	}
	   	else if (this.state == 2) {
	   		this.y = 15;
	   	}
	   	else if (this.state == 3) {
	   		this.y = this.y + this.dy;
	   		//fix if statements to detect blocks
	   		if (this.y > maxy-15){
	   			this.state = 0;
	   		}
	   	}
	},
	node:cir,

    }
}

/* fix block AND player movement */
var player = addPlayer(svg,30,maxy-15);
var blocks = [];

var spawnBlock = function(s,x,y,w,h){
       blocks.push(buildBlock(s,x,y,w,h));
}
var flipGravity = function(e ){
    if (e.keyCode == 32){
	console.log("SpaceBar hit");
	//flip gravity of player here
	if (player.state == 0) {
		player.state = 1;
	}
	if (player.state == 2) {
		player.state = 3;
	}
//	spawnBlock(svg,20,40,60,60);
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
    // adds all blocks
    var removeindex = [];
    for (var i = 0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
	if (blocks[i].remove){
	    // push index to remove list if block is out of position
	    console.log("here",removeindex);
	    removeindex.push(i);
	}
	    //window.cancelAnimationFrame(update);
    }
    console.log(removeindex);
    //remove all removable blocks from block list
    for (var ind = removeindex.length; ind >0; ind--){
//	console.log(blocks);
	blocks.splice(removeindex[ind],1);
    }
      // console.log(blocks.length);
    window.requestAnimationFrame(update);
}


//Initialize everything below
var initialize = function(){
    window.addEventListener("load",function(e){
	var randy = Math.random()*50;
		spawnBlock(svg,maxx,maxy-randy,maxx,randy+10);
		spawnBlock(svg,maxx,0,maxx,60);
	
    });
}
/* pause screen doesnt work right now */
var pausescreen = function(e){
    //svg.removeEventListener("onmouseover",setmovingBlocks());
    window.cancelAnimationFrame(update);
    console.log("paused??");
//    document.removeEventListener("click",pausescreen);
    document.addEventListener("click",function(e){
	//window.requestAnimationFrame(update);
    });
}
var setmovingBlocks = function(e){
    console.log("here");
    setInterval(function(){
	var randy = Math.random()*100 +40;
	var randw = Math.random()*100 +50;
	var randw2 = Math.random()*100 +50;
	spawnBlock(svg,maxx,maxy-randy,randw,randy+0);
	spawnBlock(svg,maxx,0,randw2,60);
    },1000)
};
initialize();
svg.addEventListener("onmouseover",setmovingBlocks());
document.addEventListener("click",pausescreen);  // temporary... doesnt stop the animation
document.addEventListener("keyup",flipGravity);
window.requestAnimationFrame(update);
