var c = document.getElementById("c");
var ctx = c.getContext("2d");
var b = document.getElementById("b");
var f = document.getElementById("f");
var s = document.getElementById("size");
var species = "a";
var feedMode = false;
var fishes = [];
var foods = [];
var fishSize = 50;
//Fishes locations is a 2D array of y values, with a list of fishes at that y value
//
var drawTank = function() {
	ctx.clearRect(0,0,500,500);
    ctx.fillStyle = "#00FFFF";
    ctx.fillRect(0,0,500,500);
    ctx.fillStyle = "#CD9B1D";
    ctx.fillRect(0,400,500,100);
};

var loadFishImage = function(fish) {
	var img = new Image();
	img.src = fish.species + '.png';
	img.onload = function() {
		ctx.drawImage(img,fish.x,fish.y,fish.w,fish.h);
	};
};
var loadFoodImage = function(food) {
	var img = new Image();
	img.src = 'food.png';
	img.onload = function() {
		ctx.drawImage(img,food.x,food.y, 30, 30);
	};
};
var makeFood = function(x,y) {
	return {
		x: x,
		y: y,
		draw: function() {
			loadFoodImage(this);
		},
		move: function() {
			this.y = this.y + 1;
			if(y==500) {
				foods.splice();
			}
		}
	};

};

var makeFish = function(x,y,w,h) {
	var dx = 1;
	if(species=="c") {
		dx = -1; 
	}
	console.log(species);
	return {
		x: x,
		y: y,
		w: w,
		h: h,
		dx: dx,
		//Each fish lives for 100 iterations, unless food is dropped into the tank.
		life: 1200,
		species: species,
		draw: function() {
			if(this.life <= 0) {
				fishes.shift();
			}
			loadFishImage(this);
			this.life = this.life - 1;
		},
		move: function() {

			this.x = this.x + this.dx;
			this.y = this.y + 2*Math.random() - 1;
			if (this.x == 250 + dx*250 ) { 
				this.x = 250 - dx*250; 
			};
		}
	};
};

var update = function() {
	drawTank();
	var i;
	for (i = 0; i < Math.max(foods.length, fishes.length); i++) {
		if(i < fishes.length) {
			var fish = fishes[i];
			fish.move();
			fish.draw();
			//fishesLocations[fish.y].push(fish);
		};
		if(i < foods.length){
			var food = foods[i];
			food.move();
			food.draw();
		};
	}; 
	// If I didn't include a small delay before updating the frame, the window would reset too quickly
	// and the fishes wouldn't be drawn. The loadImage function is definitely slow, I'm not sure if there
	// is a more efficient way to draw images. 
	setTimeout( function() {
		window.requestAnimationFrame(update);
	}, 70);
};

var clicked = function(e) {
	var x = e.offsetX;
	var y = e.offsetY;
	if (!feedMode) {
		fishSize = s.value;
		if(y<400) {
			var newFish = makeFish(x,y,fishSize,fishSize);
			fishes.push(newFish);
		};
	} else {
		var newFood = makeFood(x,y);
		foods.push(newFood)
		console.log(foods.length);
	};	
};

b.addEventListener("click", function(e) {
	species = e.target.value;
});
f.addEventListener("click", function() {
	feedMode = !feedMode;
});
c.addEventListener("click", clicked);
window.requestAnimationFrame(update);
