/*
 * x, y, dx, dy, color, xinit, yinit, isPlayer
 *
 */

Portal.Ball = function(x, y, color, r, vx, vy, isPlayer) {
	this.x 			= x			? x		: X_DEFAULT;
	this.y			= y			? y		: Y_DEFAULT;
	this.r 			= r			? r		: R_DEFAULT;
	this.vx 		= vx		? vx	: R_DEFAULT;
	this.vy			= vy		? vy	: R_DEFAULT;
	this.color 		= color		? color	: C_DEFAULT;	
	this.isPlayer	= isPlayer	? isPlayer:false;
	
	var X_DEFAULT = Portal.width/2;
	var Y_DEFAULT = Portal.height/2;
	var R_DEFAULT = 10;
	var C_DEFAULT = "#0066FF";
	var VX_DEFAULT = 0;
	var VY_DEFAULT = 0;

	this.draw = function(ctx) {	
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	this.update = function() {
		this.x += this.vx;
		this.y += this.vy;
	}
};
