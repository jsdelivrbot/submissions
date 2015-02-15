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

//spawns a pirate
var spawnPirate = function(x,y) {
    return {
	x : x,
	y : y,
	dy: Math.random()+1,
	dx: Math.random()+1,
	draw : function() {
	    var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
	    svgimg.setAttributeNS(null,'height','50');
	    svgimg.setAttributeNS(null,'width','50');
	    svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'pirate.gif');
	    svgimg.setAttributeNS(null,'x',x);
	    svgimg.setAttributeNS(null,'y',y);
	    svgimg.setAttributeNS(null, 'visibility', 'visible');
	    svgimg.addEventListener('click', pClicked);
	    s.appendChild(svgimg);
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
	}
    };
};


var pClicked = function(e){
    e.preventDefault();
    console.log("clicked a pirate!");
}

var addPirate = function(e){
    var x = Math.random()*width;
    var y = Math.random()*height;
    var newP = spawnPirate(x,y);
    newP.draw();
    skulls.push(newP);    
    window.requestAnimationFrame(addPirate);
};

var p1 = spawnPirate(100,100);
p1.draw();
window.requestAnimationFrame(addPirate);
