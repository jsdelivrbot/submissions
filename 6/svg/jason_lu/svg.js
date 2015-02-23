var s = document.getElementById("s");

/*
var cClicked = function(e) {
    e.preventDefault();
    console.log("cClicked");
    var c = this.getAttribute('fill');
    if (c=='red') {
        this.setAttribute('fill','green');
    } else if (c=='green'){
        this.setAttribute('fill','blue');
    } else {
        this.remove();
    }
};
*/

var addCircle = function(s,x,y,r,c) {
var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
c1.setAttribute('cx',x);
c1.setAttribute('cy',y);
c1.setAttribute('r',r);
c1.setAttribute('fill',c);
//c1.addEventListener('click',cClicked);
s.appendChild(c1);
};

var clicked = function(e) {
    e.preventDefault();
    //console.log("clicked");
    s = document.getElementById("s");
    var r = 10;
    addCircle(s,e.offsetX,e.offsetY,r,'blue');
};
/*
var follow = function() {
var cs = document.getElementsByTagName("circle");
for (var i=1;i<cs.length;i++) {
    cs[i].setAttribute('cx',cs[i-1].getAttribute('cx'));
    cs[i].setAttribute('cy',cs[i-1].getAttribute('cy')); 
}
};
*/
var update = function(e) {
    clicked(e);
}

//////////////////////////
/*function mousedown(e){
    mousedown = true;
    console.log("asdasD");
    clicked(e);
    update();
}*/




/////////////////////////////
addCircle(s,200,200,40,'green');

s.addEventListener("click",update);

/*
var m = document.getElementById("go");
m.addEventListener("click",go);

var f = document.getElementById("follow");
f.addEventListener("click",mode2);
*/