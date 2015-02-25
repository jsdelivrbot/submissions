var s = document.getElementById("s");

var cClicked = function(e) {
    e.preventDefault();
    console.log(this);
    var rad = parseInt(this.getAttribute('r'),10);
    if (rad > 2) {
	var x = parseInt(this.getAttribute('cx'),10);
	var y = parseInt(this.getAttribute('cy'),10); 

	var s1 = addCircle(s,x-(rad/2),y-(rad/2),rad/2);
	var s2 = addCircle(s,x-(rad/2),y+(rad/2),rad/2);
	var s3 = addCircle(s,x+(rad/2),y+(rad/2),rad/2);
	var s4 = addCircle(s,x+(rad/2),y-(rad/2),rad/2);
	this.remove();
    }
};

var addCircle = function(s,x,y,r) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    var xpos = ((x/r) - 1)/2;
    var ypos = ((y/r) - 1)/2;
    var pix = pics[Math.log(256/r)/Math.log(2)][xpos + ypos*256/r];
    var rval = '';//this should be factored
    var gval = '';
    var bval = '';
    if (pix[0] < 16)
	rval+='0';
    if (pix[1] < 16)
	rval+='0';
    if (pix[2] < 16)
	rval+='0';
    rval += pix[0].toString(16);
    gval += pix[1].toString(16);
    bval += pix[2].toString(16);
    var color='#'+rval+gval+bval;
    c1.setAttribute('fill',color);
    c1.addEventListener('mouseover',cClicked);
    s.appendChild(c1);
    
};

/*var update = function() {
    var circles = s.children;
    for (var i = 0; i < circles.length; i++){
	var rad = parseInt(circles[i].getAttribute('r'),10);
	var x = parseInt(circles[i].getAttribute('cx'),10);
	var y = parseInt(circles[i].getAttribute('cy'),10); 
	circles[i].setAttribute('r',rad*1.005.toString())
    }
    window.requestAnimationFrame(update);
};*/

var c = addCircle(s,256,256,256);
//window.requestAnimationFrame(update);