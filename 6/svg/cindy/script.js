var m_x;
var m_y;
var current_color = 'red';
var exp_ctr = 0;

var addCircle = function() {
    s = document.getElementById("svg");
    var x = 800*Math.random();
    var y = 500*Math.random();
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
    m_x = e.offsetX;
    m_y = e.offsetY;
};

var move = function() {
    var cs = document.getElementsByTagName("circle"); 
    for (var i=0;i<cs.length;i++) {
	var x = parseFloat(cs[i].getAttribute('cx'));
	var y = parseFloat(cs[i].getAttribute('cy'));
	var r = parseFloat(cs[i].getAttribute('r'));

	if (Math.abs(m_x-x) != 0) {
/*	    if (cs[i].getAttribute('b_ctr') < 100 && cs[i].getAttribute('bounce') ) {
		x = x - parseFloat((m_x-x)/(Math.abs(m_x-x)));		
		cs[i].setAttribute('b_ctr', cs[i].getAttribute('b_ctr') + 1);
	    }
	    else {*/
		x = x + parseFloat((m_x-x)/(Math.abs(m_x-x)));
/*		cs[i].setAttribute('b_ctr', 0);
	    }
*/	}

	if (Math.abs(m_y-y) != 0) {
/*	    if (cs[i].getAttribute('b_ctr') < 100 && cs[i].getAttribute('bounce') ) {
		y = y - parseFloat((m_y-y)/(Math.abs(m_y-y)));		
	    }
	    else {
*/		y = y + parseFloat((m_y-y)/(Math.abs(m_y-y)));
/*	    }
*/	}
	
	if (r<5) {r=20;}


	cs[i].setAttribute('cx',x);
	cs[i].setAttribute('cy',y);
	cs[i].setAttribute('r',r);
	
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
};

window.setInterval(move,50);
var cs = document.getElementsByTagName("circle"); 
if (cs.length < 50) {
    window.setInterval(addCircle,5000);
}

var s = document.getElementById("svg");
s.addEventListener('mousemove',mouse);
s.addEventListener('click',dist);
s.addEventListener('click',boom);
