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
				console.log(o);
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
var init = function() {
	time=0;
	clearInterval(interval);

	for(anim in animations) {
		console.log(animations[anim]);
		animations[anim].destroy();
	}

	animations = [];
	animations.push( new Animation("circle", 0, 3000, {
		'cx'		: 50,
		'cy'		: 50,
		'fill'		: 'green',
		'r'			: 50
	}, {
		'cx'		: function(t){ return 300 + (t/100) },
		'cy'		: function(t){ return 300 + (t/100) }	
	}));
}

var start = function(e) {
	e.preventDefault();

	init();
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
