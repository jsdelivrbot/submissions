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
	var enteredPortal = false;

	this.draw = function(ctx) {	
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	this.update = function() {

		if (!enteredPortal)
			this.insertCollisions();
		this.updatePosition();
	}

	/* Wall collision detecting */
	this.insertCollisions = function() {
		if (this.y > Portal.world.portalHeight && this.y < (Portal.world.height * 0.5) + Portal.world.portalHeight ) {
			if (this.x + this.vx + this.r > Portal.world.width) {
				console.log("hello");
				Portal.sprites.createBall(this.r, this.y, this.color, this.r, this.vx, this.vy, this.isPlayer);
				enteredPortal = true;
				return;
			}
			if (this.x + this.vx + this.r < 0) {
				console.log("hello");
				Portal.sprites.createBall(Portal.world.width, this.y, this.color, this.r, this.vx, this.vy, this.isPlayer);
				enteredPortal = true;
				return;
			}
		}
		else {
			if(this.x + this.vx + this.r > Portal.world.width ||
				this.x + this.vx - this.r < 0) {
				this.vx *= -1;
			}
			if( this.y + this.vy + this.r > Portal.world.height || 
					this.y + this.vy - this.r < 0 ) {
				this.vy *= -1;
			}
		}
	}

	/* Update positions */
	this.updatePosition = function() {
		if (enteredPortal) {
			if (this.x < r * -1 || this.x > Portal.world.width + r) {
				this.vx = 0;
				this.vy = 0;
			}
		}
		this.x += this.vx;
		this.y += this.vy;
	}

};
