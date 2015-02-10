var c = document.getElementById("c");
var start = document.getElementById("start");
var reset = document.getElemnetById("reset");
var ctx = c.getContext("2d");

var makePerson = function(x,y,,h,ctx) {
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	dx : 1,
	color : "#ff0000",
	draw : function() {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x,this.y,this.w,this.h);
	},
	//We have to change the way the people move
	//People must "bounce" off walls
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + 2*Math.random() - 1;
	    if (this.x < 20 || this.x > 580){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 20 || this.y > 580){
		this.y = 100+400*Math.random();
	    }
	},
	infect : function() {
	},
	checkInfection : function() {
	}
    };
};

var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    for (var i = 0; i < people.length; i++){
	people[i].move();
	people[i].draw();
    }
    window.requestAnimationFrame(update);
}

var addPerson = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 10+Math.random(20);
    var h = 20+Math.random(40);
    people.push(makePerson(x,y,w,h,ctx));
    
};

//c.addEventListener("click", addBlock);

var people = [];
//blocks.push(makeBlock(50,100,30,15,ctx));
//blocks.push(makeBlock(100,200,30,15,ctx));
window.requestAnimationFrame(update);
