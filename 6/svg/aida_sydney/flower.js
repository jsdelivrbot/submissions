var s = document.getElementById("s");
var index = 0;
var flowers = [];
var createFlower = function(){
	var f1= document.createElementNS("http://www.w3.org/2000/svg", "circle");
	f1.setAttribute('cx',200);
    f1.setAttribute('cy',300);
    f1.setAttribute('r',20);
    f1.setAttribute('fill',"#FF00FF");
    f1.setAttribute('name', String(index));
    s.appendChild(f1);
    var l1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l1.setAttribute('x1', 200);
    l1.setAttribute('x2', 200);
    l1.setAttribute('y1', 300);
    l1.setAttribute('y2', 400);
    l1.setAttribute("style","stroke:rgb(255,0,0);stroke-width:2");
    l1.setAttribute('name', String(index));
    s.appendChild(l1); 
    return {
        name: String(index),
        grow: function() {
            var flower = document.getElementsByName(String(this.name));
            // console.log(flower);
            var circle = flower[0];
            var stem = flower[1];
            circle.setAttribute('r', circle.getAttribute('r')*1.1);
        }
    };
    index++;
};

var flower1 = createFlower();
flowers.push(flower1);
var growFlowers = function() {
    for (var i=0; i < flowers.length; i++) {
        flowers[i].grow();
    };
}
window.setInterval(function() {
    growFlowers();}, 3000);