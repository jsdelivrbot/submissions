
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
	
	// /* Create the player sprite, a blue circle. */
	// Portal.sprites.createBall(
	// 	20, 100,
	// 	"#0000FF",
	// 	3,
	// 	1, 1, 
	// 	false
	// );

	for (i = 0; i < 20; i ++) {
		Portal.sprites.createBall(Math.random() * 200 + 50, Math.random() * 100 + 25,"#0000FF", 3, 1, 1, false);
	}
};
		

