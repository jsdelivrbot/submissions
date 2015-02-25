var link = "http://www.w3.org/2000/svg";

var clicked = function(e) {
    
    e.preventDefault();
    if (e.toElement!=this) {return;}    
    s = document.getElementById("s");
    var l = 5+30*Math.random();
    var w = 5+30*Math.random();
    addRect(s,e.offsetX,e.offsetY,l,w,'red');
};

var addRect = function(a,x,y,l,w,f) {
    var rect = document.createElementNS(link, 'rect');
    rect.setAttribute('x',x);
    rect.setAttribute('y',y);
    rect.setAttribute('height',w);
    rect.setAttribute('width',l);
    rect.setAttribute('fill','#'+Math.round(0xffffff * Math.random()).toString(16));
    rect.addEventListener("click",rClicked);
    a.appendChild(rect);
};

var rClicked = function(e) {
    e.preventDefault();
    var a = this.getAttribute('width');
    var h = this.getAttribute('height');
    this.setAttribute('width',a*1.5);
    this.setAttribute('height',h*1.5);
    if (a*2 > 200 || h*2 > 200)
	this.remove();
}


var s = document.getElementById("s");
s.addEventListener('click',clicked);