var media = document.getElementById("style-ts"),
	reset = document.getElementById("reset"),
	timber = document.getElementById("timber"),
	s = document.getElementById("svg"),
	s1 = document.getElementById("svg1"),
	wave1 = document.getElementById("wave1"),
	streak1 = document.getElementById("streak1"),
	streak2 = document.getElementById("streak2"),
	glow1 = document.getElementById("glow1"),
	glow2 = document.getElementById("glow2"),
	two = document.getElementById("two"),
	redglow = "#FF5050",
	redglow2 = "#FF0808",
	color_r = 15,
	color_g = 20,
	offset = 18,
	animations = [],
	time = 0,
	colors = [
		'green',
		'blue',
		'yellow',
		'orange',
		'white',
		'black'],
	interval;

var MEDIA_LENGTH = 18800;


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
function Animation(shape, start, end, init, animation, text) {
	var o = document.createElementNS("http://www.w3.org/2000/svg", shape);
	start = start?start:0;
	end = end?end:MEDIA_LENGTH;
	var BUFFER = 15;
	s.appendChild(s1);

	this.animate = function(time) {

		if ( Math.abs(time-start)<BUFFER) {
			for (attr in init) {
				o.setAttribute(attr, init[attr]);
			}
			if (shape == 'text'){
				var node = document.createTextNode(text);
				o.appendChild(node);
			}
			s.appendChild(o);

		} else if( time >= start && time < end ) {
			for (attr in animation) {
				o.setAttribute(attr, animation[attr](time-start));
			}
		} else if( Math.abs(time-end)<BUFFER ) {
			this.destroy();
		}
	}

	this.destroy = function() {

		//console.log(s);
		//console.log(o);
		try{
			s.removeChild(o);
		} catch (err) {}
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

	media.currentTime = 0;
	media.play();
	go();
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
function smBurst(startx, cx, cy, fill) {
	burst(startx, startx+200, cx, cy, fill, 15, 20000);
}
function mdBurst(startx, cx, cy, fill) {
	burst(startx, startx+500, cx, cy, fill, 50, 10000);
}
function lgBurst(startx, cx, cy, fill) {
	burst(startx, startx+500, cx, cy, fill, 100, 5000);
}

function pushText(text, begin, end){
	var anim = new Animation("text", begin, end, {

		'x': 400,
		'y': 250,
		'theta': 0,
		'fill': 'green',
		'font-size': '20px',
		'text-anchor': 'middle',
		'font-family': '"Architects Daughter", "Tangerine", "Avant Garde", sans-serif',
		'transform': 'rotate(0) scale(0)' //I feel so bad for doing this
	}, {
		//'x': function(t){ return 100 + (t/100)},
		//'y': function(t){ return 100 + (t/100)},
		'transform': function(t){
			var factor = t/10000 + 1;
			var newx = 450 * (factor-1);
			var newy = 500 * (factor-1);
			return 'rotate(' +  t/100 + ' 400 250) ' + 'translate(-' + newx + ', -' + newy + ') ' +  'scale(' + factor +')';
				},
				'fill': function(t){ return 'rgb(' + Math.floor(Math.random()*100 + 127) + ', ' + Math.floor(t/10+ 70)  + ', ' + Math.floor(Math.random()*100 + 127) + ')'}
	}, text);
	return anim;
}

var randColor = function(){
	var randNum = Math.random() * colors.length;
	return colors[Math.floor(randNum)];
}

var start = function(e) {
	e.preventDefault();

	init(function() {
		console.log("Initializing animations");
		///////////// Beats by Genji //////////////////////

		console.log(s1);
		s1.style.zIndex = "-100";

		for(var i=0; i<7; i++) {
			// Main beats
			var mainBeatColor = randColor();
			lgBurst(1100+(i*2300),600,120,mainBeatColor);
			mdBurst(1700+(i*2300),600,380,mainBeatColor);
			mdBurst(2300+(i*2300),200,380,mainBeatColor);
			mdBurst(2900+(i*2300),200,120,mainBeatColor);

			// Offbeats
			smBurst(1400+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(1550+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(2000+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(2150+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(2600+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(2750+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(2900+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(3200+(i*2300),Math.random()*800,Math.random()*500,randColor());
			smBurst(3350+(i*2300),Math.random()*800,Math.random()*500,randColor());
		}

		//////////// Lyrics by Max ////////////////////////
		animations.push(pushText('~Cause You got that James Dean day dream look in your eye', 0, 4700));
		animations.push(pushText('~And I got that red lip classic thing that you like', 4750, 9100));
		animations.push(pushText('~And when we go crashing down, we come back every time', 9150, 13510));
		animations.push(pushText('~Cause we never go out of style', 13710, 15900));
		animations.push(pushText('~We never go out of style', 16100, 17890));
		/*
		   animations.push(pushText('You got that long hair, slicked back, white t-shirt.', 18010, 22610));
		   animations.push(pushText('And I got that good girl faith and a tight little skirt,', 22680, 26950));
		   animations.push(pushText('And when we go crashing down, we come back every time.', 27000, 31070));
		   animations.push(pushText('Cause we never go out of style', 31120, 33500));
		   animations.push(pushText('We never go out of style.', 33630, 35800));
		   });
		   */
	});
};


var log = function(e) {
	e.preventDefault();
	//console.log("Time: " + time);
	//console.log("Animations stored: " + animations.length);
};


var go = function() {
	time = 0;
	color_r = 15,
	color_g = 20,
	offset = 18,

	interval = setInterval(function(){
		for (anim in animations) {
			animations[anim].animate(time);
		}
		time+=10;
		//console.log("Time: "+time);

		if(time % 6000 == 0){
			color_r+=3;
			color_g+=2;
			offset-=4;
			console.log(wave1);
			wave1.setAttribute("offset",offset + "%");
			wave1.setAttribute("stop-color","#"+color_r + color_g+"48");
		}

		if(time % 1100 == 0){
			console.log(streak1);
			streak1.setAttribute("stop-color", redglow);
			streak2.setAttribute("stop-color", redglow2);
			glow1.setAttribute("stop-color", redglow);
			glow2.setAttribute("stop-color", redglow2);
			//two.setAttribute("fill", "");
			//two.setAttribute("style", "");
		}

		if(time % 1100 == 0 && time % 2200 != 0){
			console.log(streak1);
			streak1.setAttribute("stop-color", "#1063ca");
			streak2.setAttribute("stop-color", "#1ced75");
			glow1.setAttribute("stop-color", "#49F191" );
			glow2.setAttribute("stop-color", "#1ced75");
			//two.setAttribute("fill", "url(#streak)");
			//two.setAttribute("style", "filter: url(#blur1);");
		}

		if(time>=MEDIA_LENGTH) {
			clearInterval(interval);
			media.pause();
		}
	}, 10);
};

reset.addEventListener("click", start);
timber.addEventListener("click", log);
