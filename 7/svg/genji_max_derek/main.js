var media = document.getElementById("style-ts"),
	reset = document.getElementById("reset"),
        timber = document.getElementById("timber"),
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
function Animation(shape, start, end, init, animation, text) {	
    var o = document.createElementNS("http://www.w3.org/2000/svg", shape);
	start = start?start:0;
	end = end?end:MEDIA_LENGTH;
    
	this.animate = function(time) {
		if (time==start) {
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
				//console.log(o);
			}
		} else if( time >= end) {
			this.destroy();
		}
	}

	this.destroy = function() { 

	    
	        console.log(o);
	    
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

var pushText = function(text, begin, end){
        var anim = new Animation("text", begin, end, {

	'x': 400,
	'y': 250,
	'theta': 0,
	'fill': 'green',
	'font-size': '20px',
	'text-anchor': 'middle',
	'font-family': 'sans-serif',
	'transform': 'rotate(0) scale(0)' //I feel so bad for doing this
    }, {
	//'x': function(t){ return 100 + (t/100)},
	//'y': function(t){ return 100 + (t/100)},
	'transform': function(t){ 
	    var factor = t/10000 + 1
	    var newx = 450 * (factor-1)
	    var newy = 500 * (factor-1)
	    //translate(-centerX*(factor-1), -centerY*(factor-1))
	    return 'rotate(' +  t/100 + ' 400 250) ' + 'translate(-' + newx + ', -' + newy + ') ' +  'scale(' + factor +')'}
	
    }, text)
    return anim
}

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
    /*
    animations.push( new Animation("text", 0,4700, {

	'x': 400,
	'y': 250,
	'theta': 0,
	'fill': 'green',
	'font-size': '20px',
	'text-anchor': 'middle',
	'font-family': 'sans-serif',
	'transform': 'rotate(0) scale(0)' //I feel so bad for doing this
    }, {
	//'x': function(t){ return 100 + (t/100)},
	//'y': function(t){ return 100 + (t/100)},
	'transform': function(t){ 
	    var factor = t/10000 + 1
	    var newx = 450 * (factor-1)
	    var newy = 500 * (factor-1)
	    //translate(-centerX*(factor-1), -centerY*(factor-1))
	    return 'rotate(' +  t/100 + ' 400 250) ' + 'translate(-' + newx + ', -' + newy + ') ' +  'scale(' + factor +')'}
	
    }, 'Cause You got that James Dean day dream look in your eye'));
    
    animations.push( new Animation("text", 4750, 9100, {

	'x': 400,
	'y': 250,
	'theta': 0,
	'fill': 'green',
	'font-size': '20px',
	'text-anchor': 'middle',
	'font-family': 'sans-serif',
	'transform': 'rotate(0) scale(0)' //I feel so bad for doing this
    }, {
	//'x': function(t){ return 100 + (t/100)},
	//'y': function(t){ return 100 + (t/100)},
	'transform': function(t){ 
	    var factor = t/10000 + 1
	    var newx = 450 * (factor-1)
	    var newy = 500 * (factor-1)
	    //translate(-centerX*(factor-1), -centerY*(factor-1))
	    return 'rotate(' +  t/100 + ' 400 250) ' + 'translate(-' + newx + ', -' + newy + ') ' +  'scale(' + factor +')'}
	
    }, 'And I got that red lip classic thing that you like'));

    animations.push( new Animation("text", 9150, 13510, {

	'x': 400,
	'y': 250,
	'theta': 0,
	'fill': 'green',
	'font-size': '20px',
	'text-anchor': 'middle',
	'font-family': 'sans-serif',
	'transform': 'rotate(0) scale(0)' //I feel so bad for doing this
    }, {
	//'x': function(t){ return 100 + (t/100)},
	//'y': function(t){ return 100 + (t/100)},
	'transform': function(t){ 
	    var factor = t/10000 + 1
	    var newx = 450 * (factor-1)
	    var newy = 500 * (factor-1)
	    //translate(-centerX*(factor-1), -centerY*(factor-1))
	    return 'rotate(' +  t/100 + ' 400 250) ' + 'translate(-' + newx + ', -' + newy + ') ' +  'scale(' + factor +')'}
	
    }, 'And when we go crashing down, we come back every time.'));

    */
    animations.push(pushText('Cause You got that James Dean day dream look in your eye', 0, 4700));
    animations.push(pushText('And I got that red lip classic thing that you like', 4750, 9100));
    animations.push(pushText('And when we go crashing down, we come back every time', 9150, 13510));

    animations.push(pushText('Cause we never go out of style', 13710, 15900));
    animations.push(pushText('We never go out of style', 16100, 17890));
    animations.push(pushText('You got that long hair, slicked back, white t-shirt.', 18010, 22610));
    animations.push(pushText('And I got that good girl faith and a tight little skirt,', 22680, 26950));
    animations.push(pushText('And when we go crashing down, we come back every time.', 27000, 31070));
    animations.push(pushText('Cause we never go out of style', 31120, 33500));
    animations.push(pushText('We never go out of style.', 33630, 35800));





}

var start = function(e) {
	e.preventDefault();

	init();
	media.currentTime = 0;
	media.play();
	go();
};


var log = function(e) {
	e.preventDefault();
        console.log("Time: " + time);
};


var go = function() {
	time = 0;

	interval = setInterval(function(){
		for (anim in animations) {
			animations[anim].animate(time);
		}
		time+=10;
		//console.log("Time: "+time);
		
		if(time>=MEDIA_LENGTH) {
			clearInterval(interval);
			media.pause();
		}
	}, 10);
};

reset.addEventListener("click", start);
timber.addEventListener("click", log);
