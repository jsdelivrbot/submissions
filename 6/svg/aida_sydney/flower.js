var s = document.getElementById("s");
var grass = document.createElementNS("http://www.w3.org/2000/svg", "rect");
grass.setAttribute('x',0);
grass.setAttribute('y',325);
    grass.setAttribute('width',400);
    grass.setAttribute('height',75);
    grass.setAttribute('fill',"#00cc00");
    s.appendChild(grass);
var index = 0;
var flowers = [];
var createFlower = function(){
	var f1= document.createElementNS("http://www.w3.org/2000/svg", "circle");
	f1.setAttribute('cx',200);
    f1.setAttribute('cy',250);
    f1.setAttribute('r',20);
    f1.setAttribute('fill',"#FF00FF");
    f1.setAttribute('name', String(index));
    s.appendChild(f1);
    var l1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l1.setAttribute('x1', 200);
    l1.setAttribute('x2', 200);
    l1.setAttribute('y1', 260);
    l1.setAttribute('y2', 350);
    l1.setAttribute("style","stroke:rgb(255,0,0);stroke-width:2");
    l1.setAttribute('name', String(index));
    s.appendChild(l1); 
    return {
        life:100,
        name: String(index),
        die: function() {
            var flower = document.getElementsByName(String(this.name));
            var circle = flower[0];
            var stem = flower[1];
            console.log("dying");
            circle.setAttribute('fill','#5B6262');
            stem.setAttribute('style','stroke:#5B6262;stroke-width:2'); 
            setTimeout(function() {
                console.log("dissapearing");
                flowers.splice(parseInt(this.name),1);
                circle.parentNode.removeChild(circle);
                stem.parentNode.removeChild(stem);
            }, 1000);
        },
        grow: function() {
            var flower = document.getElementsByName(String(this.name));
            // console.log(flower);
            var circle = flower[0];
            var stem = flower[1];
            circle.setAttribute('r', circle.getAttribute('r')*1.1);
            this.life -= 20;
            console.log(this.life);
            if (this.life <= 0) {
                this.die();
            };
        }
    };
    index++;
};

flowers[index] = createFlower()
var growFlowers = function() {
    for (var i=0; i < flowers.length; i++) {
        flowers[i].grow();
    };
}
window.setInterval(function() {
    growFlowers();}, 3000);