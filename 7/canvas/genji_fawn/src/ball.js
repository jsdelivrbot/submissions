/*
 * x, y, dx, dy, color, xinit, yinit, isPlayer
 *
 */

Portal.Ball = function(x, y, color, r, isPlayer) {
	this.x 			= x			? x		: X_DEFAULT;
	this.x			= y			? y		: Y_DEFAULT;
	this.r 			= r			? r		: R_DEFAULT;
	this.color 		= color		? color	: C_DEFAULT;	
	this.isPlayer	= isPlayer	? isPlayer:false;
	
	var X_DEFAULT = Portal.width/2;
	var Y_DEFAULT = Portal.height/2;
	var R_DEFAULT = 10;
	var C_DEFAULT = "#0066FF";

};
