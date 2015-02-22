var media = document.getElementById("style-ts"),
	reset = document.getElementById("reset"),
	s = document.getElementById("svg"),
	animations = [],
	time = 0,
	interval;

var MEDIA_LENGTH = 41000;


/*   Animation object
 *
 *	shape
 *		String that identifies the type of svg object to insert.
 *
 *	start, end
 *		The start and end time of the animation, in milliseconds (multiples of 10).
 *
 *	init
 *		The initial attributes of the object, in JSON format.
 *
 *	animation
 *		JSON object. Keys are the shape values to change, values are single-variable functions.
 */
function Animation(shape, start, end, init, animation) {	
    var o = document.createElementNS("http://www.w3.org/2000/svg", shape);
	start = start?start:0;
	end = end?end:MEDIA_LENGTH;

	this.animate = function(time) {
		if (time==start) {
			for (attr in init) {
				o.setAttribute(attr, init[attr]);
			}
			s.appendChild(o);
		} else if( time >= start && time < end ) {
			for (attr in animation) {
				o.setAttribute(attr, animation[attr](time-start));
			}
		} else if( time == end) {
			this.destroy();
		}
	}

	this.destroy = function() { 
		s.removeChild(o); 

		var index;
		index = animations.indexOf(this);
		if( index>-1) {
			animations.splice(index, 1);
		}
	}
}

/* 
 * Reset/init function for the js code.
 * Create the animation code here.
 */
var init = function(initAnims) {
	time=0;
	clearInterval(interval);

	console.log(animations);
	while(s.hasChildNodes()) {
		s.removeChild(s.lastChild);
	}

	animations = [];

	// Callback to initialize the animations
	initAnims();

}

// built in animations
function burst(startx, starty, cx, cy, fill, r, k) {
	animations.push( new Animation("circle", startx, starty, {
		'cx'		: cx,
		'cy'		: cy,
		'fill'		: fill,
		'r'			: r
	}, {
		'r'			: function(t){ return Math.abs(r + (-Math.pow(t,2)+(cy-cx)*t)/k); } 
	}));
}
//500ms long bursts
function smallBurst(startx, cx, cy, fill) {
	burst(startx, startx+500, cx, cy, fill, 25, 20000);
}
function medBurst(startx, cx, cy, fill) {
	burst(startx, startx+500, cx, cy, fill, 50, 10000);
}
function lgBurst(startx, cx, cy, fill) {
	burst(startx, startx+500, cx, cy, fill, 100, 5000);
}


	medBurst(1100,250,500,'red'); 


var start = function(e) {
	e.preventDefault();

	init(function() {
		console.log("Initializing animations");
		///////////// Beats by Genji //////////////////////

		var tmp = 0;
		
		medBurst(1100,750,120,'red'); 
		medBurst(1700,750,360,'red'); 
		medBurst(2300,250,360,'red'); 
		medBurst(2900,250,120,'red'); 
		medBurst(3500,750,120,'red'); 
		medBurst(4100,750,360,'red'); 
		medBurst(4700,250,360,'red'); 
		medBurst(5300,250,120,'red'); 

	});


	media.currentTime = 0;
	media.play();
	go();
};

var go = function() {
	time = 0;

	interval = setInterval(function(){
		for (anim in animations) {
			animations[anim].animate(time);
		}
		time+=10;
		console.log("Time: "+time);
		
		if(time>=MEDIA_LENGTH) {
			clearInterval(interval);
			media.pause();
		}
	}, 10);
};

reset.addEventListener("click", start);
