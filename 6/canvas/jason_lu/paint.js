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
    var w = 10;
    var h = 10;
    blocks.push(makeBlock(x,y,w,h,ctx));
    update();
    console.log("ASDAS");
};


var update = function() {
    console.log(blocks.length);
    for (var i = 0; i < blocks.length; i++){
	blocks[i].draw();
    }
    
};

var myevent;
function startit(e) {
    myevent = setInterval(clicked(e),10);
}

function stopit() {
    window.clearTimeout(myevent);
}


var mousedown = false;

function mousedown(e){
    mousedown = true;
}

c.addEventListener("mousedown",mousedown);
c.addEventListener("mouseup",stopit);
var blocks = [];

blocks.push(makeBlock(10,10,10,10,ctx));
