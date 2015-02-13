var addRect = function(svg,x, y, width, height, fill){
    var r1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    r1.setAttribute('x',x)
    r1.setAttribute('y',y)
    r1.setAttribute('width',width)
    r1.setAttribute('height',height)
    r1.setAttribute('fill',fill)
    r1.addEventListener('click', clicked)
    svg.appendChild(r1)
}
var clicked = function(e) {
    e.preventDefault();
    if (e.toElement!=this) {return;}
    console.log("clicked");
    s = document.getElementsByClassName("svg");
    var x = Math.floor(Math.random() * 400)
    var y = Math.floor(Math.random() * 400)
    addRect(svg,x,y,20,40,'red');
};
var svg = document.getElementsByClassName('svg');
svg.addEventListener('click', clicked);
