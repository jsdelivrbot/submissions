var c = document.getElementById("c");
var ctx = c.getContext("2d");
var makeDough = function (x,y,w,h,ctx, color){
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	color : color,
	ctx : ctx,
	r: 8,
	R: 16,
	dy : -1,
	clear: false,
	draw : function(){
	    //create donut image with circles
	  //  console.log("here");
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.R, 0, 2*Math.PI,false);
	    ctx.fillStyle= color;
	    ctx.fill();

	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.r, 0, 2*Math.PI,false);
	    ctx.fillStyle="white";
	    ctx.fill();
	    //ctx.drawImage(img[Math.random(4)],w,h);
	},
	move : function(){
	    this.y = this.y - this.dy;
	    if (this.y > 550){
//		console.log("low");
		//removeDough();
		ctx.fillStyle ="#ffffff";
		ctx.arc(this.x,this.y,this.R, 0, 2*Math.PI,false);
		ctx.beginPath();
		this.clear = true;
	    }
	}
    };
};
var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    var del = [];
    for (var i=0; i<doughs.length; i++){
	doughs[i].move();
	if(!doughs[i].clear){
	    doughs[i].draw();
	}
	else{
	    del.push(i);
	}
    }
    for (var i = del.length-1; i>0; i--){
	console.log("cleared");
	doughs.splice(del[i],1);
    }
    window.requestAnimationFrame(update);
};

var addDough = function(e){
    //size of parent container
    var x = e.offsetX; 
    var y = e.offsetY;
    var w = 20 + Math.random(70);
    var h = 10 + Math.random(30);
    doughs.push(makeDough(x,y,w,h,ctx,getRandColor()));
};

var getRandColor = function(){
    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i=0;i<6;i++){
	color += letters[Math.floor(Math.random()*letters.length)];
    }
    console.log(color);
    return color;
};

c.addEventListener("click",addDough);

/*
window.addEventListener("load",function(e){
myevent = setInterval(addDough,300);
});
*/
var doughs = [];
doughs.push(makeDough(50,100,30,15,ctx,getRandColor()));
window.requestAnimationFrame(update);
