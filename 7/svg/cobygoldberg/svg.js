var addCircle = function(svg,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    svg.appendChild(c1);
};

var happen = function(e) {
    e.preventDefault();
    svg = document.getElementById('sv');
    addCircle(svg,e.offsetX,e.offsetY,10,'Red');
}

var resetScreen = function(e) {
    for (int i = 0; i < svg.childElementCount; i++){
	
    }
}

var svg = document.getElementById('sv');
svg.addEventListener('click', happen);
var reset = document.getElementById('reset');
reset.addEventListener('click', resetScreen)
