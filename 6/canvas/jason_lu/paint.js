var c = document.getElementById("c");
var ctx = c.getContext("2d");

var makeBlock = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ff0000",
	dx : 1,
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	}	
	
    };
};


var clicked = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 3*size;
    var h = 3*size;
    blocks.push(makeBlock(x,y,w,h,ctx));
    //update();
    //console.log("ASDAS");
};


var update = function() {
    //console.log(blocks.length);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);  
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;    
    for (var i = 0; i < blocks.length; i++){
        blocks[i].draw();
        //ctx.moveTo(blocks[i-1]["x"],blocks[i-1]["y"]);
        //ctx.lineTo(blocks[i]["x"],blocks[i]["y"]);
        //ctx.closePath();
        //ctx.stroke();
    }
        
};




function mousedown(e){
    mousedown = true;
    clicked(e);
    update();
}

function move(e){
    if (mousedown){
        clicked(e);
        update();
    }
}

function mouseup(e) {
    mousedown = false;
}

//Change size

function small(){
    size = 1;
}

function medium(){
    size = 2;
}

function large(){
    size = 10;
}

function clear(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);  
    blocks = [];
}

var blocks = [];
var mousedown;
var size = 2;


c.addEventListener("mousedown",mousedown);
c.addEventListener("mousemove",move);
c.addEventListener("mouseup",mouseup);

var s = document.getElementById("s");
s.addEventListener("click",small);
var m = document.getElementById("m");
m.addEventListener("click",medium);
var l = document.getElementById("l");
l.addEventListener("click",large);
var e = document.getElementById("e");
e.addEventListener("click",clear);

mousedown = false;
//blocks.push(makeBlock(10,10,10,10,ctx));
window.requestAnimationFrame(update);