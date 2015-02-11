var c = document.getElementById("c");
var ctx = c.getContext("2d");

var getRandColor = function(){
    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i=0;i<6;i++){
	color += letters[Math.floor(Math.random()*letters.length)];
    }
    return color;
};
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
	dy: -2,
	clear: false,
	draw : function(){
	    //create donut image with circles
	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.R,0,2*Math.PI,false);
	    ctx.fillStyle= color;
	    ctx.fill();

	    ctx.beginPath();
	    ctx.arc(this.x,this.y,this.r,0,2*Math.PI,false);
	    ctx.fillStyle="white";
	    ctx.fill();
	    //ctx.drawImage(img[Math.random(4)],w,h);
	},
	move : function(){
	    this.y = this.y - this.dy;
	    if (this.y > 550 && Math.abs(snake.x-this.x)<10 ){
		//removeDough();
		ctx.fillStyle ="#ffffff";
		ctx.arc(this.x,this.y,this.R, 0, 2*Math.PI,false);
		ctx.beginPath();
		counter++;
		this.clear = true;
	    }else if(this.y >=580){
		this.clear = true;
	    }
	}
    };
};
var addDough = function(e){
    //size of parent container
    var x = e.offsetX; 
    var y = e.offsetY;
    console.log(y);
    var w = 20 + Math.random(70);
    var h = 10 + Math.random(30);
    doughs.push(makeDough(x,y,w,h,ctx,getRandColor()));
};

var makeSnake = function(x,y,ctx,img){
    return{
	x:x,
	y:y,
	ctx:ctx,
	dx:3,
	img:img,
	move:function(){
	    this.x += this.dx;
	    if (this.x<2 || this.x>575){
		this.dx *= -1;
	    }
	},
	draw:function(){
	    ctx.drawImage(this.img,this.x,this.y);
	    img.src ="static/thluffy.png";
	},
    }
};
var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    console.log(doughs);
    var del = [];
    for (var i=0; i<doughs.length; i++){
	doughs[i].move();
	if(!(doughs[i].clear)){
	    doughs[i].draw();
	}
	else{
	    del.push(i);
	}
    }
    for (var i=del.length-1; i>=0; i--){
	doughs.splice(del[i],1);
    }
    snake.move();
    snake.draw();

    ctx.font = "50px Arial Black";
    ctx.fillStyle = "purple";
    var stringy = "Thluffy ate " + counter + " DONUTS!!!"
    ctx.fillText(stringy,30,60);
    window.requestAnimationFrame(update);
};

c.addEventListener("click",addDough);

var counter = 0;
var img = new Image();
var doughs = [];
var snake = makeSnake(20+Math.floor(Math.random()*470),550,ctx,img);
//doughs.push(makeDough(50,100,30,15,ctx,getRandColor()));
window.requestAnimationFrame(update);
