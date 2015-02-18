var svg = document.getElementById("c");

var getRandColor = function(){
    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i=0;i<6;i++){
	color += letters[Math.floor(Math.random()*letters.length)];
    }
    return color;
};

var buildBlock = function(s,x,y,w,h){
    return {
	x:x,
	y:y,
	w:w,
	h:h,
	s:s,
	draw:function(){
	    console.log(this.x,this.y);
	    var rec = document.createElementNS("http://www.w3.org/2000/svg","rect");
	    rec.setAttribute("x", this.x);
	    rec.setAttribute("y", this.y);
	    //rec.setAttribute("rx", 10); //round corners
	    //rec.setAttribute("ry", 10);
	    rec.setAttribute("width", this.w);
	    rec.setAttribute("height", this.h);
	    rec.setAttribute("class", "rect"); //rect class in html file; all blocks should be of similar style
	    this.s.appendChild(rec);
	},
	move:function(){
	    //figure out algorithm to adjust movements of block
	}
    }
}
var addPlayer = function(s,x,y){
    //temporary player is a circle for now
    return {
	s:s,
	x:x,
	y:y,
	dy:3,
	draw:function(){
	    var c = getRandColor();
	    var cir = document.createElementNS("http://www.w3.org/2000/svg","circle");
	    cir.setAttribute("cx",this.x);
	    cir.setAttribute("cy",this.y);
	    cir.setAttribute("r","20");
	    cir.setAttribute("fill",this.c);
	    this.s.appendChild(cir);
	},
	move:function(){
	  //figure out algorithm to adjust movements of block
	    if (this.y <3 || this.y >455){
		this.dy*= -1;
	    }
	    this.y = this.y + this.dy;	
	    console.log(this.y);
	}
    }
}




/* animation not updating -> add clear screen and finish animationframe */


var update = function(){
    //clear screen
    
    var blocks = [];
    var player = addPlayer(svg,30,250);
    player.move();
    player.draw();
    console.log(player);
    buildBlock(svg,300,200,60,60).draw();
    
}
window.requestAnimationFrame(update);
