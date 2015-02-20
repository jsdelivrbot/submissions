var s = document.getElementById("s");
var img = new Image();
var width = 800;
var height = 800;
var score = 0;
var spawnTimer = 0;
var spawnIt = 10;
var MAX_HEALTH = 100;
var playerHealth = 100;
var skulls = [];
var s1 = document.getElementById("s1");


var healthBar = function(){
    while (s1.lastChild) {
	s1.removeChild(s1.lastChild);
    }
    var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttributeNS(null, 'x', 0);
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'height', '60');
    rect.setAttributeNS(null, 'width', playerHealth*8);
    if (playerHealth > 65){	
	rect.setAttributeNS(null, 'fill', 'green');
    }
    else if (playerHealth > 30){
	rect.setAttributeNS(null, 'fill', 'yellow');
    }
    else if (playerHealth > 0) {
	rect.setAttributeNS(null, 'fill', 'RED');
   }
    document.getElementById('s1').appendChild(rect);
}
healthBar();

//spawns a pirate
var spawnPirate = function(x,y) {
    return {
	x : x,
	y : y,
	dir: 0,
	dy: 3,
	dx: Math.random()+1,
	draw : function() {
	    var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
	    svgimg.setAttributeNS(null,'height','50');
	    svgimg.setAttributeNS(null,'width','50');
	    svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'pirate.gif');
	    svgimg.setAttributeNS(null,'x',this.x);
	    svgimg.setAttributeNS(null,'y',this.y);
	    svgimg.setAttributeNS(null, 'visibility', 'visible');
	    svgimg.addEventListener('click', pClicked);
	    s.appendChild(svgimg);
	},
	remove : function(){
	    var index = skulls.indexOf(this);
	    skulls.splice(index, 1);
	},
	jiggle : function(){
	    if (this.dir == 0){
		this.dir = 1;
		this.dy = -1;
	    }
	    else {
		this.dir = 0;
		this.dy = 1;
	    }
	},
	move : function() {
/*
	    if (this.dir == 0){
		this.dir = 1;
		this.dy = -1;
	    }
	    else {
		this.dir = 0;
		this.dy = 3;
	    }
*/
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
	}
    };
};

var pClicked = function(e){
    e.preventDefault();
    console.log("clicked a pirate!");
    playerHealth = playerHealth - 10;
    if (playerHealth > 0)
	healthBar();
    else { 
	//draw game over screen
	while (s1.lastChild) {
	    s1.removeChild(s1.lastChild);
	}
	while (s.lastChild) {
	    s.removeChild(s.lastChild);
	}
    }
}


var update = function(){
    for (var i = 0; i < skulls.length; i++){
	if (skulls[i].y > height - 10){
	    //make disappear
	    playerHealth = playerHealth - 1;
	    //make jiggle
	    skulls[i].jiggle();
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
  
    window.requestAnimationFrame(update);
}



var addPirate = function(e){
    if (playerHealth > 0){
	var x = Math.random()*width;
	var y = Math.random()*2;
	var newP = spawnPirate(x,y);
	newP.draw();
	skulls.push(newP);    
	window.requestAnimationFrame(addPirate);
    }
};

window.requestAnimationFrame(addPirate);
window.requestAnimationFrame(update);
