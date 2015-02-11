var a_canvas = document.getElementById("a");
var a_context = a_canvas.getContext("2d");

// Dimensions 500 x 500 - for reference.

function init() {

	// Perform a reset:

	a_canvas.height = a_canvas.height;

	// Filling the space with ruled grey lines.

	a_context.beginPath(); 
	
	// Vertical
	for(var x = 0.5; x < a_canvas.width; x += 10) {
		a_context.moveTo(x, 0);
		a_context.lineTo(x, a_canvas.height);
	}

	// Horizontal
	for(var y = 0.5; y < a_canvas.height; y += 10) {
		a_context.moveTo(0, y);
		a_context.lineTo(a_canvas.width, y);
	}

	// Draw those in
	a_context.strokeStyle = "#eee";
	a_context.stroke();

	// Axes

	a_context.beginPath(); 

	// Y-axis
	a_context.moveTo(((a_canvas.width / 2) + 0.5), 0);
	a_context.lineTo(((a_canvas.width / 2) + 0.5), a_canvas.height);

	// X-axis
	a_context.moveTo(0, (a_canvas.height / 2) + 0.5)
	a_context.lineTo(a_canvas.width, (a_canvas.height / 2) + 0.5)

	// Filling in
	a_context.strokeStyle = "#000";
	a_context.stroke();
}

// Uses Silent Matt's JavaScript Expression Evaluator
// https://github.com/silentmatt/js-expression-eval/tree/master

// Generates a graph
function input() {
	//a_context.fillRect(50, 25, 150, 100);

	function_input = document.getElementsByName("function")[0].value;
	console.log(function_input);

	//console.log(Parser.evaluate(function_input, { x: n}));

	a_context.beginPath(); 

	// http://www.paulirish.com/2009/random-hex-color-code-snippets/
	random_hex_color = '#'+Math.floor(Math.random()*16777215).toString(16);


	// function_x is the function value x 
	// this_x_coord is the canvas coordinate value x
	for(var function_x = -50; function_x < 50; function_x += 1) {
		//-50 to 50
		//0 to 100
		// 0 to 500

		canvas_x_coord = (function_x + 50) * 5 + 0.5;

		if (canvas_x_coord == 0.5) {
			function_y = Parser.evaluate(function_input, { x: function_x});
			canvas_y_coord = a_canvas.height - (function_y + 50) * 5 + 0.5;
			a_context.moveTo(canvas_x_coord, canvas_y_coord)
		}

		function_y = Parser.evaluate(function_input, { x: function_x});
		canvas_y_coord = a_canvas.height - (function_y + 50) * 5 + 0.5;
		a_context.lineTo(canvas_x_coord, canvas_y_coord)

		console.log('---');
		console.log("CoordX: " + canvas_x_coord + ", " + "CoordY: " + canvas_y_coord);
		console.log("TrueX: " + function_x + ", " + "TrueY: " + function_y);

		a_context.strokeStyle = random_hex_color;
		a_context.stroke();		
		//a_context.moveTo(x, 0);
		//a_context.lineTo(x, a_canvas.height);
	}
}

init();