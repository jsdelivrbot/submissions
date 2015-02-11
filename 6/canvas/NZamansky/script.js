var c = document.getElementById('c');
var ctx = c.getContext('2d');

var clear = function(){
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.fillRect(0,0,400,400);
    ctx.fillStyle = '#BBBBBB';
    ctx.fillRect(50,50,300,300);
    ctx.fillStyle = '#888888';
    ctx.fillRect(100,100,200,200);
    ctx.fillStyle = '#444444';
    ctx.fillRect(150,150,100,100);
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


var paddle = {
    x : 0 ,
    y : 0
};

var movePaddle = function(e){
    paddle.x=e.clientX;
    paddle.y=e.clientY;
};

c.addEventListener('mousemove',movePaddle);

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
	    if (this.z < 0){
		this.dz = this.dz * -1;
		this.z = this.z + this.dz;
	    }
	    if (this.z>0.9){
		if(this.dz>0 && Math.sqrt((this.x-(paddle.x-200))*(this.x-(paddle.x-200)) + (this.y-(paddle.y-200))*(this.y-(paddle.y-200)))<20){
		    this.dz = this.dz * -1;
		    this.z = this.z + this.dz;
		    this.dz = this.dz - 0.001;
		    this.dx = this.dx + Math.random(1)-0.5;
		    this.dy = this.dx + Math.random(1)-0.5;
		    score = score + 1;
		}
		else if (this.z>1){
		    ctx.fillStyle = '#000000';
		    ctx.fillRect(0,0,400,400);
		    ctx.fillStyle = '#FFFFFF';
		    ctx.font = '30px Times';
		    ctx.fillText('GAME OVER',120,190);
		    ctx.fillText('SCORE: '+score,150,240);
		    this.x = -400; this.y=-400; this.z=2; this.dx=0; this.dy=0; this.dz=0;
		}
	    }
	},
	draw : function(){
	    ctx.beginPath();
	    ctx.fillStyle = '#FFFFFF';
	    ctx.strokeStyle = '#000000';
	    ctx.arc(this.x*this.z+200, this.y*this.z+200, 15*this.z, 0, 2*Math.PI);
	    ctx.stroke();
	    ctx.fill();
	}
    }
};

var ball = makeBall(ctx);

var update = function(){
    clear();
    ctx.fillStyle = '#000000';
    ctx.font = '12px Times';
    ctx.fillText(score,20,10);
    ball.move();
    ball.draw();
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(paddle.x-20,paddle.y-20,20,20);
    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);
