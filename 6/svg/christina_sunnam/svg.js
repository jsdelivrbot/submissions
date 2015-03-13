var s = document.getElementById("s");
var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

var click = function(e){
    e.preventDefault();
    console.log("CLICK");
    var r = Math.random()*25;
    addCircle(e.offsetX,e.offsetY,r);
};
var addCircle = function(x,y,r){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    var color = getRandomColor()
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.setAttribute('r',r);
    c.setAttribute('fill',color);
    s.appendChild(c);
    console.log(s)
    console.log(color);
    console.log(c);
};
s.addEventListener('click',click);
