var c = document.getElementById("c");
var ctx = c.getContext("2d");
var img = new Image();
var width = 800;
var height = 800;
var score = 0;
var spawnTimer = 0;
var spawnIt = 10;
var MAX_HEALTH = 100;
var playerHealth = 100;
var skulls = [];

//health bar display based on current health
var healthBar = function(){
    ctx.fillStyle = "#000000"
    ctx.fillRect(width-(MAX_HEALTH*2+20),20,MAX_HEALTH*2, 25);
    if (playerHealth > 80){
	ctx.fillStyle = "#00FF00"//GREEN
    }    
    else if (playerHealth > 50){
	ctx.fillStyle = "#FFFF00"//YELLOW
    }   
    else if (playerHealth > 0){
	ctx.fillStyle = "#FF0000"//RED
    }     
    ctx.fillRect(width-(MAX_HEALTH*2+20),20,playerHealth*2, 25);
}

//score
var scoreThing = function(){
    ctx.font="20px Georgia";
    ctx.fillText("SCORE: " + score, 20, 40);
}

//game over screen (when health = 0)
var gameOVAAAAA = function(){
    ctx.fillStyle="#ff0000";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle="#000000";
    ctx.font="100px Georgia";
    ctx.fillText("GAME",250,250);
    ctx.fillText("OVER",250,370);
    ctx.fillText("NOOB!",250,490);
    ctx.fillText("Score: " + score,220,610);
}

//spawning pirates!!
var spawnPirate = function(x,y) {
    return {
	x : x,
	y : y,
	dy: Math.random()+1,
	dx: Math.random()+1,
	draw : function() {
	    var img = new Image();
	    img.src = "pirate.gif";
	    ctx.drawImage(img, this.x, this.y);
	},
	remove : function(){
	    var index = skulls.indexOf(this);
	    skulls.splice(index, 1);
	},
	move : function() {
	    if (Math.random() > 0.5 && this.x < width - 10){
		this.x = this.x + this.dx;
	    
	    }
	    else if(this.x>10){
		this.x = this.x - this.dx;
	    }
	    this.y = this.y + this.dy;
	    if (this.x < 10 || this.x > width - 10){
		this.dx = this.dx * -1;
	    }
	    //console.log("x = " + x);
	    //console.log("y = " + y);
	}
    };
};

var update = function(){
    if (playerHealth > 0){
	
	//redraw background
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,width,height);
	for (var i=0; i < skulls.length; i++){
	    if (skulls[i].y > height - 10){
		//make disappear
		playerHealth = playerHealth - 1;
		skulls[i].remove();
	    }
	    else {
		skulls[i].move();
		skulls[i].draw();
	    }
	}
	if (spawnTimer != spawnIt){
	    spawnTimer = spawnTimer + 1;
	}
	else{
	    skulls.push(spawnPirate(Math.random() * 760 + 10,0));
	    spawnTimer = 0;
	}
	healthBar();
	scoreThing();
    }
    else{
	gameOVAAAAA();
    }
    window.requestAnimationFrame(update);
}

var addPirate = function(e){
    var x = Math.random()*width;
    var y = 1;
    skulls.push(spawnPirate(x,y));    
    window.requestAnimationFrame(addPirate);
};

//removal of pirates via clicking
var removePirate = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    for (var i=0; i < skulls.length; i++){
	console.log("skull x:"+skulls[i].x);
	console.log("mouse x:"+x);
	if ((Math.abs(skulls[i].x - x) <= 50) && (Math.abs(skulls[i].y - y) <= 50)){ 
	    skulls[i].remove();
	} 
    }
    score = score + 1;
}

c.addEventListener("click", removePirate);
window.requestAnimationFrame(update);

