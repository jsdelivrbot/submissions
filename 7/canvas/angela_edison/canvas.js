var c = document.getElementById("c");
var ctx = c.getContext("2d");
var img = new Image();
var width = 800;
var height = 800;
var score = 0;
/*

PLAN:
* Mouse in canvas --> sword
* Spawn (based on time; more and more over time/score)
* Score Counter
* Health bar / health tracker
* Kill (click once to kill; maybe twice if we have time)
* Movement
*GAME OVER SCREEN
*/
var MAX_HEALTH = 100;
var playerHealth = 90;

var healthBar = function(){
    ctx.fillStyle = "#000000"
    ctx.fillRect(width-(MAX_HEALTH*2+20),20,MAX_HEALTH*2, 25);
    if (playerHealth > 80){
	ctx.fillStyle = "#00FF00"//GREEN
    }    
    else if (playerHealth > 50){
	ctx.fillStyle = "#FFFF00"//GREEN
    }   
    else if (playerHealth > 0){
	ctx.fillStyle = "#FF0000"//RED
    }     
    ctx.fillRect(width-(MAX_HEALTH*2+20),20,playerHealth*2, 25);
}

var spawnPirate = function(x,y) {
    return {
	x : x,
	y : y,
	dy: Math.random(),
	dx: Math.random(),
	draw : function() {
	    var img = new Image();
	    img.src = "pirate.jpg";
	    ctx.drawImage(img, this.x, this.y);
	},
	remove : function(){
	    var index = skulls.indexOf(this);
	    skulls.splice(index, 1);
	},
	move : function() {
	    if (Math.random() > 0.5){
		this.x = this.x + Math.random();
	    }
	    else {
		this.x = this.x - Math.random();
	   }
	    this.y = this.y + Math.random();
	    if (this.x < 10 || this.x > width - 20){
		this.dx = this.dx * -1;
	    }
	}
    };
};

var update = function(){
    //redraw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,width,height);
    healthBar();
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
	window.requestAnimationFrame(update);
    }
}

var addPirate = function(e){
    var x = Math.random()*width;
    var y = 1;
    skulls.push(spawnPirate(x,y));    
    window.requestAnimationFrame(update);

};

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
}

c.addEventListener("click", removePirate);

var skulls = [];
skulls.push(spawnPirate(50,100));
skulls.push(spawnPirate(100,200));
window.requestAnimationFrame(update);

