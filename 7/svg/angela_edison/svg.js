var s = document.getElementById("s");
var img = new Image();
var width = 800;
var height = 800;
var score = 0;
var spawnTimer = 0;
var spawnIt = 30;
var MAX_HEALTH = 100;
var playerHealth = 100;
var skulls = [];
var s1 = document.getElementById("s1");

var scoreThing = function(){
    var sc = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sc.setAttributeNS(null,'x', '700');
    sc.setAttributeNS(null, 'y', '18');
    sc.setAttributeNS(null, 'font-size', '20px');
    sc.setAttributeNS(null, 'fill', "black");
    sc.textContent = "SCORE: "+score;
    document.getElementById('s').appendChild(sc);
}
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
scoreThing();


//removal of pirates via clicking
var removePirate = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    for (var i=0; i < skulls.length; i++){
	//console.log("skull x:"+skulls[i].x);
	//console.log("mouse x:"+x);
	if ((Math.abs(skulls[i].x - x) <= 60) && (Math.abs(skulls[i].y - y) <= 60)){ 
	    skulls[i].remove();
	    score = score + 1;
	} 
    }
}

s.addEventListener("click", removePirate);

//spawns a pirate
var spawnPirate = function(x,y) {
    return {
	x : x,
	y : y,
	dir: 0,
	jiggleTime: 20,
	jiggleCount: 0,
	dy: 5,
	dx: Math.random()+1,
	draw : function() {
	    var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
	    svgimg.setAttributeNS(null,'height','50');
	    svgimg.setAttributeNS(null,'width','50');
	    svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'pirate.gif');
	    svgimg.setAttributeNS(null,'x',this.x);
	    svgimg.setAttributeNS(null,'y',this.y);
	    svgimg.setAttributeNS(null, 'visibility', 'visible');
	    s.appendChild(svgimg);
	},
	remove : function(){
	    var index = skulls.indexOf(this);
	    skulls.splice(index, 1);
	},
	jiggle : function(){
	    if(this.jiggleCount == this.jiggleTime){
		if (this.dir == 0){
		    this.dir = 1;
		    this.dy = -5;
		}
		else {
		    this.dir = 0;
		    this.dy = 5;
		}
		this.y = this.y + this.dy;
		this.jiggleCount = 0;
		playerHealth = playerHealth - 1;
	    }
	    else{
		this.jiggleCount = this.jiggleCount + 1;
	    }
	},
	move : function() {

	    if (this.dir == 0){
		this.dir = 1;
		this.dy = -1;
	    }
	    else {
		this.dir = 0;
		this.dy = 5;
	    }

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

var update = function(){
    while (s.lastChild) {
	s.removeChild(s.lastChild);
    }
    if (playerHealth > 0){
	healthBar();
	scoreThing();
    
	for (var i = 0; i < skulls.length; i++){
	    if (skulls[i].y > height - 60){
		
		//make jiggle
		skulls[i].jiggle();
		skulls[i].draw();
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



var addPirate = function(e){
    if (playerHealth > 0){
	var x = Math.random()*width;
	var y = Math.random()*2;
	var newP = spawnPirate(x,y);
	newP.draw();
	skulls.push(newP);
    }
};

window.requestAnimationFrame(addPirate);
window.requestAnimationFrame(update);
