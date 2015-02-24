var s = document.getElementById("s");


var getRandomColor = function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var addCircle = function(s,x,y) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r', "8");
    c1.setAttribute('fill',getRandomColor());
    c1.setAttribute('stroke', "black");
    c1.setAttribute('stroke-width', "1");
    var dx = Math.random() * 10 - 5;
    var dy =  Math.random() * 10 - 5;
    c1.setAttribute('dx', dx);
    c1.setAttribute('dy', dy);
    s.appendChild(c1);
};


for (var i = 0; i < 50; i ++ ) {
    addCircle (s, Math.random() * 640, Math.random() * 480);
}




var move = function () {
    console.log("moving");
    var cs = document.getElementsByTagName("circle");
    for (var i=0;i<cs.length;i++) {
        var thisC = cs[i];
        var x = parseInt(thisC.getAttribute('cx'));
        var dx = parseInt(thisC.getAttribute('dx'));
        if (x > 640 || x < 0) {
            dx *= -1;
            thisC.setAttribute('dx', dx);
        }
        thisC.setAttribute('cx', x + dx);
        
        var y = parseInt(thisC.getAttribute('cy'));
        var dy = parseInt(thisC.getAttribute('dy'));
        if (y > 480 || y < 0) {
            dy *= -1;
            thisC.setAttribute('dy', dy);
        }
        thisC.setAttribute('cy', y + dy);
    }
    window.requestAnimationFrame(move);
}

window.requestAnimationFrame(move);

//s.addEventListener('click', move);