var svg = document.getElementById("c");
var stripPX = function(pixc){
    return parseInt(pixc.slice(0,-2));
}
var svgStyle = window.getComputedStyle(svg);
var maxx = stripPX(svgStyle.width);
var maxy = stripPX(svgStyle.height);
var pmaxy = maxy-20;
var pminy = 20;
var nopause = false;
var gamecount = 0; // 0 for start screen, 20 for pause msg, 100 for losing screen
var score = 0;
var getRandColor = function(){
    var letters = "0123456789ABCDE".split(''); //removed f so that the color of text and player will never be white
    var color = "#";
    for (var i=0;i<6;i++){
	color += letters[Math.floor(Math.random()*letters.length)];
    }
    return color;
};

var spawnBlock = function(s,x,y,w,h){
       blocks.push(buildBlock(s,x,y,w,h));
}
var buildBlock = function(s,x,y,w,h){
    var rec = document.createElementNS("http://www.w3.org/2000/svg","rect");
    var remove = false;
    return {
	x:x,
	y:y,
	w:w,
	h:h,
	s:s,
	dx:-6,
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
	    this.x += this.dx;
	    if (this.x+this.w <= 0){
		this.remove = true; // send boolean so we can remove this block from block list
	    }
	    if (this.w == 0){
		console.log(this.x, this.w);
	    }
	},
	remove:remove,
	node:rec,
    }
}
var addPlayer = function(s,x,y){
    var cir = document.createElementNS("http://www.w3.org/2000/svg","circle");
    var charwidth = 40+10; //2*radius + offset pixel (left)
    var c = getRandColor();
    return {
	s:s,
	x:x,
	y:y,
	rad:20,
	dy:8,
	c:c,
	//0=moving along bottom, 1=switching to top, 2=moving along top, 3=switching to bottom, 4=falling downward(losing stage), 5= falling upward (losing stage)
	state:3,
	draw:function(){
	    cir.setAttribute("cx",this.x);
	    cir.setAttribute("cy",this.y);
	    cir.setAttribute("r",this.rad);
	    cir.setAttribute("fill",this.c);
	    this.s.appendChild(cir);
	},
	move:function(){
	    if (this.state == 0) {
		var i = 1;
		if (blocks[0].y !=0){
		    i = 0;
		}//else, by default, the block we should check should be the other one
		if (this.y >= pmaxy){ // specifically blocks alternate in this setup - top,bottom,top,bottom,etc
		    if (blocks[i].x > charwidth){
			this.state = 4;
		    }else{
			this.y = pmaxy;
		    }
		}
	    }
	    if (this.state == 1) {
	   	this.y = this.y - this.dy;
	   	if (this.y < pminy){
		    this.state = 2;
		}
	    }
	    else if (this.state == 2) {
		var i = 1;
		if (blocks[0].y == 0){
		    i = 0;
		}//else, by default, the block we should check should be the other one
		if (this.y <= pminy){
		    if (blocks[i].x > charwidth){
			this.state = 5;
		    }else{
			this.y = pminy;
		    }
		}
	    }
	    else if (this.state == 3) {
		this.y = this.y + this.dy;
		if (this.y > pmaxy){
	   	    this.state = 0;
		}
	    }
	    else if (this.state == 4){
		this.y = this.y + this.dy;
		if (this.y - this.rad >= maxy){
		    endscreen();
		}
	    }
	    else if (this.state == 5){
		this.y = this.y - this.dy;
		if (this.y + this.rad <= 0){
		    endscreen();
		}
	    }
	},
	node:cir,
	
    }
}
var flipGravity = function(e){
    if (e.keyCode == 32 && nopause){
	//flip gravity of player here
	if (player.state == 0) {
		player.state = 1;
	}
	if (player.state == 2) {
		player.state = 3;
	}
    }
}
var clearscreen = function(){
    var fnode = svg.firstChild;
    while(fnode){
	svg.removeChild(fnode);
	fnode = svg.firstChild;
    }
}
var endscreen = function(){
    window.cancelAnimationFrame(update);
    svg.removeEventListener("onmouseover",setmovingBlocks());
    blocks = [];
    clearscreen();
    nopause= false;
    gamecount = 100;
    initialize();    
}
var resume = function(e){
    nopause= true;
    document.addEventListener("click",pausescreen); 
    gamecount = 20;

    window.requestAnimationFrame(update);
}
var pausescreen = function(e){
    svg.removeEventListener("onmouseover",setmovingBlocks());
    window.cancelAnimationFrame(update);
    nopause= !nopause;
}
var setmovingBlocks = function(e){
    setInterval(function(){
	var randw = 500;
	if (blocks.length > 0){
	    var b = blocks[blocks.length-1];
	    if (b.x+b.w-150 < maxx){
		if (b.y == 0){
		    spawnBlock(svg,maxx,maxy-60,randw+0,60);
		}else{
		    spawnBlock(svg,maxx,0,randw,60);
		}
	    }
	}
    },700);
};

var update = function(){
    //clear screen by clearing svg
    clearscreen();
    //player action
    player.move();
    player.draw();
    // adds all blocks
    var removeindex = [];
    for (var i = 0; i < blocks.length; i++){
    	blocks[i].move();
    	blocks[i].draw();
	if (blocks[i].x <= 30) {
    	    //upper
    	    if (blocks[i].y < maxy / 2) {
    		pminy = blocks[i].h + 20;
    	    }
    	    else {
    		pmaxy = maxy - blocks[i].h - 20;
    	    }
    	}
	if (blocks[i].remove){
	    // push index to remove list if block is out of position
	    removeindex.push(i);
	}
    }
    //remove all removable blocks from block list
    for (var ind = removeindex.length; ind>0; ind--){
	blocks.splice(removeindex[ind],1);
	score++;
    }
    document.getElementById("s").innerHTML= score;
    if (nopause){
	document.removeEventListener("click",resume); 
	window.requestAnimationFrame(update);
    }else{
	document.removeEventListener("click",pausescreen);
	var txt = document.createElementNS("http://www.w3.org/2000/svg","text");
	var textNode= document.createTextNode("PAUSED | |");
	txt.setAttribute("x",maxx/3);
	txt.setAttribute("y",maxy/2);
	txt.setAttribute("font-size","1.3em");
	txt.setAttribute("fill",getRandColor());
	if (gamecount == 20){
	    textNode.nodeValue = "PAUSED ||";
	    txt.appendChild(textNode);
	    svg.appendChild(txt);
	}else if (gamecount == 0){
	    textNode.nodeValue = " CLICK TO START!!!";
	    txt.appendChild(textNode);
	    svg.appendChild(txt);
	    gamecount = 20; // since game has started, start pausing msg
	}
	document.addEventListener("click",resume);
    }
}

//Initialize the screen: called at start and after losing
var initialize = function(){
    var randy= Math.random()*50;
    var randwid = Math.random()*(maxx);
    spawnBlock(svg,100,maxy-60,maxx,60)
    spawnBlock(svg,300,0,maxx,60);
    player = addPlayer(svg,30,maxy/2,blocks);
    svg.addEventListener("onmouseover",setmovingBlocks());
    document.addEventListener("keyup",flipGravity);
  
    var txt = document.createElementNS("http://www.w3.org/2000/svg","text");
    var textNode= document.createTextNode("CLICK TO START!!! ");
    txt.setAttribute("x",maxx/4);
    txt.setAttribute("y",maxy/2);
    txt.setAttribute("font-size","1.3em");
    txt.setAttribute("fill",getRandColor());
    if (gamecount <1){
	textNode.nodeValue = "CLICK TO START!!! ";
    }
    else if (gamecount == 100){
	if (score <10){
	    textNode.nodeValue = " YOU LOST. CLICK TO START AGAIN!!!! ";
	}else if(score <30){
	    txt.setAttribute("x",maxx/24);
	    txt.setAttribute("y",maxy/3);
	    textNode.nodeValue = " YOU'RE AWESOME BUT YOU STILL LOST. CLICK TO PLAY AGAIN!!!! ";
	}else {
	    txt.setAttribute("x",maxx/22);
	    txt.setAttribute("y",maxy/3);
	    textNode.nodeValue = " YOU HAVE OFFICIALLY BECOME ADDICTED TO GRAVITY JUMP. CLICK TO PLAY AGAIN!!!! ";
	}
	
	score = 0;
    }
    txt.appendChild(textNode);
    svg.appendChild(txt);
 }
//we start off on pause
var blocks = [];
var player;
initialize();
document.addEventListener("click",resume);  
window.requestAnimationFrame(update);

