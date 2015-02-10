var c = document.getElementById('c');
var ctx = c.getContext('2d');

var clear = function(){
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,400,400);
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(400,400);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(400,0);
    ctx.lineTo(0,400);
    ctx.stroke();
};


var score = 0;

var makeBall = function(ctx) {
    return {
	x : 0 ,
	y : 0 ,
	z : 0 ,
	dy : Math.random()*5-2.5 ,
	dx : Math.random()*5-2.5 ,
	dz : 0.001,
	ctx:ctx,
	move : function(){
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    this.z = this.z + this.dz;
	    if (this.x < -200 || this.x > 200){
		this.dx = this.dx * -1;
	    }
	    if (this.y < -200 || this.y > 200){
		this.dy = this.dy * -1;
	    }
	    if (this.z < 0 || this.z > 1){
		this.dz = this.dz * -1;
		this.z = this.z + this.dz;
	    }
	},
	draw : function(){
	    ctx.beginPath();
	    ctx.fillStyle = '#FFFFFF';
	    ctx.strokeStyle = '#000000';
	    ctx.arc((this.x+200)*this.z, (this.y+200)*this.z, 15*this.z, 0, 2*Math.PI);
	    ctx.stroke();
	    ctx.fill();
	}
    }
};

var ball = makeBall(ctx);

var paddle = {
    x : 0 ,
    y : 0
};

var movePaddle = function(e){
    paddle.x=e.clientX;
    paddle.y=e.clientY;
};

c.addEventListener('mousemove',movePaddle);

var update = function(){
    clear();
    ball.move();
    ball.draw();
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(paddle.x-20,paddle.y-20,20,20);
    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);
