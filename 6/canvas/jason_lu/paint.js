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


var mousedown;

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

var blocks = [];
c.addEventListener("mousedown",mousedown);
c.addEventListener("mousemove",move);
c.addEventListener("mouseup",mouseup);

mousedown = false;
//blocks.push(makeBlock(10,10,10,10,ctx));
window.requestAnimationFrame(update);