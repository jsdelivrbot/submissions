var addCircle = function(s,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    c1.addEventListener('click',cClicked);
    s.appendChild(c1);
    
};

var clicked = function(e){
        e.preventDefault();
        if (e.offsetY < 50) {
            makeDrop(e.offsetX,e.offsetY);
        }
};

var move = function() {
    var cs = document.getElementsByTagName("circle");
    for (var i=0;i<cs.length;i++) {
				var x = parseFloat(cs[i].getAttribute('cx'));
				var y = parseFloat(cs[i].getAttribute('cy'));
				var r = parseFloat(cs[i].getAttribute('r'));
				x = x + 2*Math.random()-1;
				y = y + 2*Math.random()-1;
				r = r + 2*Math.random()-1;
				if (r<5) {r=20;}
				cs[i].setAttribute('cx',x);
				cs[i].setAttribute('cy',y);
				cs[i].setAttribute('r',r);
    }
};

var t =0;
var go = function() {
    if (t==0){
				t = setInterval(moveBlocks,100);
    } else {
				clearInterval(t);
				t=0;
    }
};

var makeBlock = function(x,y) {
    var b1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    b1.setAttribute('x',x);
    b1.setAttribute('y',y);
    b1.setAttribute('width',30);
    b1.setAttribute('height',15)
    b1.setAttribute('fill','red');
//    b1.setAttribute('velocity',{ x: 100, y: 100 });
    s.appendChild(b1);
};

var makeDrop = function(x,y) {
    var d1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    d1.setAttribute('x',x);
    d1.setAttribute('y',y);
    d1.setAttribute('width',10);
    d1.setAttribute('height',10)
    d1.setAttribute('fill','blue');
//    b1.setAttribute('velocity',{ x: 100, y: 100 });
    s.appendChild(d1);
}

var moveBlocks = function() {
    var bs = document.getElementsByTagName("rect");
    for (var i=0; i<bs.length; i++) {
        console.log("moving");
        var x = parseFloat(bs[i].getAttribute('x'));
        dx = x + 2 + Math.random();
        bs[i].setAttribute('cx',x+dx);
    }
};

var s = document.getElementById("s");
s.addEventListener('click',clicked);
var score = 0;
for (var x = 100; x < 600; x += 50){
    makeBlock(580*Math.random()+10,x);
}
go();