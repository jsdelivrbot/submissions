var changeColor = function(ball){
    ball.setAttribute('fill', '#'+Math.floor(Math.random()*16777215).toString(16));
}

var clicked2 = function(e){
    e.preventDefault();
    console.log("clicked2");
    this.setAttribute('fill','#'+Math.floor(Math.random()*16777215).toString(16));
}

var addCircle = function(b, x, y, r, c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    c1.addEventListener('click',clicked2);
    b.appendChild(c1);
};

var clicked = function(e){
    e.preventDefault();
    if (e.toElement!=this){return;}
    console.log("clicked")
    b = document.getElementById("block");
    var r = 5+35*Math.random();
    addCircle(b,e.offsetX,e.offsetY,r,'#'+Math.floor(Math.random()*16777215).toString(16));
}
var change = function(){
    var cs = document.getElementsByTagName("circle");
    for (var i=0; i<cs.length; i++){
	changeColor(cs[i]);
    }
}

var t = 0;

var clickButt = function(e){
    e.preventDefault();
    if (t==0){
	t = setInterval(change, 100);
    } else {
	clearInterval(t);
	t = 0;
    }
};
    


var b = document.getElementById("block");
b.addEventListener('click',clicked);

var button = document.getElementById("butt");
button.addEventListener("click", clickButt);
