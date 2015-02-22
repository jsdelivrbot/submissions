var s = document.getElementById("s");
console.log("HELLO")
var createFlower = function(){
	var f1= document.createElementNS("http://www.w3.org/2000/svg", "circle");
	f1.setAttribute('cx',200);
    f1.setAttribute('cy',250);
    f1.setAttribute('r',20);
    f1.setAttribute('fill',"#FF00FF");
    s.appendChild(f1);
    var l1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l1.setAttribute('x1', 200);
    l1.setAttribute('x2', 200);
    l1.setAttribute('y1', 263);
    l1.setAttribute('y2', 400);
    l1.setAttribute("style","stroke:rgb(255,0,0);stroke-width:2");
    s.appendChild(l1); 
};


var growFlower = function(speed, flower){
	flower.setAttribute('r', flower.getAttribute("r")*speed);
}
createFlower();