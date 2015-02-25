var addCircle = function(svg,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    svg.appendChild(c1);
};

var happen = function(e) {
    var nodes = svg.childNodes;
    var y = 0;
    for (var i = 1; i <= svg.childElementCount; i++){
	if ((Math.abs(e.offsetX - nodes[i].cx.animVal.value) < 10) && (Math.abs(e.offsetY - nodes[i].cy.animVal.value) < 10)){
	    svg.removeChild(nodes[i]);
	    y = 1;
	};
    };
    if (y == 0){
	e.preventDefault();
	svg = document.getElementById('sv');
	addCircle(svg,e.offsetX,e.offsetY,10,'Red');
    };
}

var resetScreen = function(e) {
    while (svg.lastChild && (svg.childElementCount != 0)) {
	svg.removeChild(svg.lastChild);
    }
}


var svg = document.getElementById('sv');
svg.addEventListener('click', happen);
var reset = document.getElementById('reset');
reset.addEventListener('click', resetScreen);
