var canvas = document.getElementById("canvas");
var ctx = c.getContext("2d");

var makeThings = function(x,y,w,h,ctx){
    return{
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ff0000" //we wont need color eventually
	dx : 1,
	draw : function(){
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move: function(){
	    // add the moving functionality that we want it to have
	}
    };
};

var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i=0; i<pictures.length; i++){
	pictures[i].move();
	pictures[i].draw();
    }
    window.requestAnimationFrame(update);
};

c.addEventListener("click", clicked);
var pictures = [];
// need to push the pictures we want to use
window.requestAnimationFrame(update);
    
