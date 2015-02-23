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
var enemies = function(){
    var cs = document.getElementsByTagName("circle");   
    if(cs.length < 30){
        if(Math.random() < .05){
            var x = 10 ;
            var y = 10 + 300*Math.random();
            addCircle(s,x,y,10,'red');
        }else if (Math.random() < .05){
            var x = 590 ;
            var y = 10 + 300*Math.random();
            addCircle(s,x,y,10,'red');
        }
    }
}

var update = function(e) {
    clicked(e);
}

var distance = function(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

var enemyMove = function(c){
    var cs = document.getElementsByTagName("circle");
    if(c.getAttribute("cx") < 300){
        c.setAttribute("cx",parseInt(c.getAttribute("cx")) + 1 + Math.random());
    }else{
        c.setAttribute("cx",c.getAttribute("cx") - Math.random());
    }
    if(c.getAttribute("cy") < 300){
        c.setAttribute("cy",parseInt(c.getAttribute("cy")) + 1 + Math.random());
    }else{
        c.setAttribute("cy",c.getAttribute("cy") - Math.random());
    }
}

var collisions = function(){
    var cs = document.getElementsByTagName("circle");
    var life = document.getElementById("life");
    var a = life.innerHTML;
    if(a <= 0){
        var text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x", 300);
        text.setAttribute("y", 50);
        text.setAttribute("fill", "red");
        text.setAttribute("font-size", 50);
        text.innerHTML = "YOU LOSE";
    }
    
    for (var i=0;i < cs.length; i++){
        if(cs[i].getAttribute('fill') == "green"){
            for (var j=0;j < cs.length; j++){
                if(distance(cs[i].getAttribute("cx"), 
                            cs[i].getAttribute("cy"),
                            cs[j].getAttribute("cx"),
                            cs[j].getAttribute("cy")) < 50 && i!=j){
                    cs[j].remove();
                    //var life = document.getElementById("life");
                    //var a = life.innerHTML;
                    life.innerHTML = a-1;
                }      
            }
        }else if(cs[i].getAttribute('fill') == "blue"){
            
        }else if(cs[i].getAttribute('fill') == "red"){
            enemyMove(cs[i]);
        }
        
    }
    enemies();
}
//////////////////////////
/*function mousedown(e){
    mousedown = true;
    console.log("asdasD");
    clicked(e);
    update();
}*/




/////////////////////////////
addCircle(s,300,300,40,'green');
var myevent;
myevent = setInterval(collisions,100);
s.addEventListener("click",update);

/*
var m = document.getElementById("go");
m.addEventListener("click",go);

var f = document.getElementById("follow");
f.addEventListener("click",mode2);
*/