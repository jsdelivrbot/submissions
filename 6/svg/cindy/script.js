var m_x = 0;
var m_y = 0;
var current_color = 'red';
var exp_ctr = 0;

var addCircle = function() {
    s = document.getElementById("svg");
    var x = Math.floor(800*Math.random());
    var y = Math.floor(500*Math.random());
    var vel_x = 0;
    var vel_y = 0;
    var r = 5+30*Math.random();
    var f = current_color;

    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.setAttribute('r',r);
    c.setAttribute('fill','red');
    c.setAttribute('stroke','black');
    c.bounce = false;
    c.b_ctr = 0;
    c.addEventListener('mousemove',mouse);
    c.addEventListener('click',dist);
    c.addEventListener('click',boom);
    svg.appendChild(c);
};

var mouse = function(e) {
    m_x = parseFloat(e.offsetX);
    m_y = parseFloat(e.offsetY);
};

var move = function() {
    var cs = document.getElementsByTagName("circle"); 
    for (var i=0;i<cs.length;i++) {
	var x = parseFloat(cs[i].getAttribute('cx'));
	var y = parseFloat(cs[i].getAttribute('cy'));
	var r = parseFloat(cs[i].getAttribute('r'));
	var vel_x = 0;
	var vel_y = 0;

	if (Math.abs(m_x-x) != 0) {

	    if ( cs[i].getAttribute('bounce') == "true" ) {
		if (cs[i].getAttribute('vel_x') != 0) {
		    vel_x = parseFloat(cs[i].getAttribute('vel_x'));
		}
		else {
		    vel_x = -(((m_x-x)/(Math.abs(m_x-x))*2)+Math.random());
		    cs[i].setAttribute('vel_x', vel_x);
		}
	    }
	    else {
		vel_x = ((m_x-x)/(Math.abs(m_x-x)));
		cs[i].setAttribute('vel_x', 0);
	    }
	}

	if (Math.abs(m_x-x) == 0) {
	    if ( cs[i].getAttribute('bounce') == "true" ) {
		var rand = Math.random();
		var add = 0;
		if ( rand = 0 ) { add = 0; } 
		else { add = 4; }

		if (cs[i].getAttribute('vel_x') != 0) {
		    vel_x = parseFloat(cs[i].getAttribute('vel_x'));
		}
		else {
		    vel_x = -((Math.random()*2-add)+Math.random());
		    cs[i].setAttribute('vel_x', vel_x);	
		}
	    }
	}
	
	if (Math.abs(m_y-y) != 0) {

	    if ( cs[i].getAttribute('bounce') == "true" ) {
		if (cs[i].getAttribute('vel_y') != 0) {
		    vel_y = parseFloat(cs[i].getAttribute('vel_y'));
		}
		else {
		    vel_y = -(((m_y-y)/(Math.abs(m_y-y))*2)+Math.random());
		    cs[i].setAttribute('vel_y', vel_y);	
		}
	    }
	    else {
		vel_y = ((m_y-y)/(Math.abs(m_y-y)));
		cs[i].setAttribute('vel_y', 0);
	    }
	}

	if (Math.abs(m_y-y) == 0) {
	    if ( cs[i].getAttribute('bounce') == "true" ) {
		var rand = Math.random();
		var add = 0;
		if ( rand = 0 ) { add = 0; } 
		else { add = 4; }

		if (cs[i].getAttribute('vel_y') != 0) {
		    vel_y = parseFloat(cs[i].getAttribute('vel_y'));
		}
		else {
		    vel_y = -((Math.random()*2-add)+Math.random());
		    cs[i].setAttribute('vel_y', vel_y);	
		}
	    }	    
	}

	if ( x > 800 ) {
	    vel_x = (-vel_x)/vel_x;
	    cs[i].setAttribute('bounce', false);	
	    cs[i].setAttribute('b_ctr', 10);	
	    }	
	if ( x < 0 ) {
	    vel_x = vel_x/vel_x;
	    cs[i].setAttribute('bounce', false);
	    cs[i].setAttribute('b_ctr', 10);	
	}
	if ( y > 500 ) {
	    vel_y = (-vel_y)/vel_y;
	    cs[i].setAttribute('bounce', false);
	    cs[i].setAttribute('b_ctr', 10);	
	    }
	if ( y < 0 ) {
	    vel_y = vel_y/vel_y;
	    cs[i].setAttribute('bounce', false);
	    cs[i].setAttribute('b_ctr', 10);	
	}

	cs[i].setAttribute('cx',x+vel_x);

	cs[i].setAttribute('cy',y+vel_y);

    }
};

var dist = function() {

    currentcolor = '#'+Math.floor(Math.random()*16777215).toString(16);

    var cs = document.getElementsByTagName("circle"); 

    for (var i=0;i<cs.length;i++) {
	x = cs[i].getAttribute('cx');
	y = cs[i].getAttribute('cy');

	if ( Math.sqrt(Math.pow(m_x-x,2) + Math.pow(m_y-y,2) ) < 100 ) {
	    cs[i].setAttribute('bounce', true);

	    cs[i].setAttribute('fill', currentcolor);
	}
    }
};

var boom = function() {
/*    s = document.getElementById("svg");
    var x = m_x;
    var y = m_y;
    var r = 100;
    var f = current_color;

    var e = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
    e.setAttribute('cx',x);
    e.setAttribute('cy',y);
    e.setAttribute('rx',r);
    e.setAttribute('ry',r);
    e.setAttribute('fill',f);
    e.setAttribute('stroke','black');
    svg.appendChild(e);
*/
};

window.setInterval(move,25);
var cs = document.getElementsByTagName("circle"); 
if (cs.length < 50) {
    window.setInterval(addCircle,1000);
}

var s = document.getElementById("svg");
s.addEventListener('mousemove',mouse);
s.addEventListener('click',dist);
s.addEventListener('click',boom);
