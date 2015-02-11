
/*
 *   __________________ __________________________  .____     
 *   \______   \_____  \\______   \__    ___/  _  \ |    |    
 *    |     ___//   |   \|       _/ |    | /  /_\  \|    |    
 *    |    |   /    |    \    |   \ |    |/    |    \    |___ 
 *    |____|   \_______  /____|_  / |____|\____|__  /_______ \
 *                      \/       \/                \/        \/
 *
 *       A basic simulation by Genji Noguchi and Fawn Wong
 *
 */




/*
 * The main object that encompasses all the other components.
 * 
 * May hold basic constants for the game.
 *
 */
var Portal = {};

/*
 * Main draw function that calls all the other draw functions
 *
 */
Portal.draw = function(ctx) {
	Portal.world.draw(ctx);
	Portal.sprites.draw(ctx);
}

Portal.init = function() {
	
	/* Create the player sprite, a blue circle. */
	Portal.sprites.createBall(
		Portal.world.width/2,
		Portal.world.height/2,
		"#0000FF",
		20,
		true
	);

};
		

