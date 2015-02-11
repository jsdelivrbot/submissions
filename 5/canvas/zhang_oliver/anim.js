var c = document.getElementById("c");
var b = document.getElementById("b");
var ctx = c.getContext("2d");
var blocks = [];
var redBlocks = 0;
var notRedBlocks = 0;

var makeBlock = function(x,y,w,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ff0000",
	dx : 3 * Math.random(),
	dy : 3 * Math.random(),
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.x < 10 || this.x > 580){
		this.dx = this.dx * -1;
		this.color = "#0000ff";
	    }
	    if (this.y < 20 || this.y > 580){
		this.dy = this.dy * -1;
		this.color = "#00ff00";
	    }
	},
	getColor : function() {
	    return this.color;
	}
						
	
    };
};

/*var updateScore = function() {
    for (var i = 0; i < blocks.length; i++){
        blocks[i].move();
        blocks[i].draw();
        if (blocks[i].color == "#ff0000"){
            redBlocks++;
            //console.log(redBlocks);                                                       \
                                                                                             
            score1.innerHTML = redBlocks;
            if (redBlocks > maxRedBlocks) {
                maxRedBlocks = redBlocks;
                score3.innerHTML = maxRedBlocks;
            }

        }
        //console.log(blocks[i].color);                                                      
    }

    }*/

var update = function() {
    var score1 = document.getElementById("redBlocks");
    var score2 = document.getElementById("notRedBlocks");
    var score3 = document.getElementById("maxRedBlocks");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i = 0; i < blocks.length; i++){
	blocks[i].move();
	blocks[i].draw();
	if (blocks[i].color == "#ff0000"){
            redBlocks++;
            //console.log(redBlocks);                                                        
            score1.innerHTML = redBlocks;
            if (redBlocks > maxRedBlocks) {
                maxRedBlocks = redBlocks;
                score3.innerHTML = maxRedBlocks;
            }

        }
	//console.log(blocks[i].color);
	}
    /*for (block in blocks) {
	//console.log(block.color);
	if (block.color == "#ff0000"){
	    redBlocks++;
	    //console.log(redBlocks);
	    score1.innerHTML = redBlocks;
	    if (redBlocks > maxRedBlocks) {
		maxRedBlocks = redBlocks;
		score3.innerHTML = maxRedBlocks;
	    }
		
	}
	/*else{
	    notRedBlocks++;
	    score2.innerHTML = notRedBlocks;
	    }
	    }*/
    window.requestAnimationFrame(update);
    
};

var clear = function(e){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    ctx.beginPath();
    blocks = [];
    maxRedBlocks = 0;
    redBlocks = 0;
    notRedBlocks = 0;
};

var clicked = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 10+Math.random()*40;
    var h = 10+Math.random()*20;
    blocks.push(makeBlock(x,y,w,h,ctx));
};

c.addEventListener("click",clicked);
b.addEventListener("click",clear);
//blocks.push(makeBlock(50,100,30,15,ctx));
//blocks.push(makeBlock(100,200,30,15,ctx));
window.requestAnimationFrame(update);
						
