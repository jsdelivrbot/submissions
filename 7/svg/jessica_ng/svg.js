var cClicked = function(e) {
    e.preventDefault();
    console.log("cClicked");
};

var addCircle = function(s,x,y,r,c,o) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    c1.setAttribute('opacity',o);
    c1.addEventListener('click',cClicked);
    s.appendChild(c1);
    
};

var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this) {return;}
    console.log("clicked");
    s = document.getElementById("s");
    var r = 5+30*Math.random();
    addCircle(s,e.offsetX,e.offsetY,r,'gold',"1.0");
};

var move = function() {
    var cs = document.getElementsByTagName("circle");
    for (var i=0;i<cs.length;i++) {
	var y = parseFloat(cs[i].getAttribute('cy'));
	cs[i].setAttribute('cy',y+4);
	var o = parseFloat(cs[i].getAttribute('opacity'));
	cs[i].setAttribute('opacity',o-0.05);
    }
    /*
    var dot = document.getElementById("dot");
    console.log(dot.getAttribute("cy"));
    s = document.getElementById("a");
    var y = parseFloat(dot.getAttribute('cy'));
    var x = parseFloat(dot.getAttribute('cx'));
    addCircle(s,x,y,"5",'gold',"1.0");
    console.log ("hi");
    */
};


t = setInterval(move,100);


var s = document.getElementById("s");
s.addEventListener('click',clicked);

