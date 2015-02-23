var s = document.getElementById("s");

var addCircle = function(s,x,y,r,c) {
var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
c1.setAttribute('cx',x);
c1.setAttribute('cy',y);
c1.setAttribute('r',r);
c1.setAttribute('fill',c);
s.appendChild(c1);
};

var clicked = function(e) {
    e.preventDefault();
    s = document.getElementById("s");
    var r = 10;
    var score = document.getElementById("score");
    var b = score.innerHTML;
    if(b >= 20 && e.offsetX < 450 && e.offsetX > 150 && e.offsetY < 450 && e.offsetY > 150 ){
        score.innerHTML = parseInt(b)-20;
        addCircle(s,e.offsetX,e.offsetY,r,'blue');
    }
};

var enemies = function(){
    var cs = document.getElementsByTagName("circle");   
    if(cs.length < 50){
        if(Math.random() < .01){
            var x = 10 ;
            var y = 10 + 300*Math.random();
            addCircle(s,x,y,10,'red');
        }else if (Math.random() < .01){
            var x = 590 ;
            var y = 10 + 300*Math.random();
            addCircle(s,x,y,10,'red');
        }else if (Math.random() < .01){
            var x = 10 + 300*Math.random();
            var y = 10 ;
            addCircle(s,x,y,10,'red');
        }else if (Math.random() < .01){
            var x = 10 + 300*Math.random();
            var y = 590 ;
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
    var score = document.getElementById("score");
    var b = score.innerHTML;
    score.innerHTML = parseInt(b)+1;
    if(a <= 0){
        var text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x", 200);
        text.setAttribute("y", 50);
        text.setAttribute("fill", "red");
        text.setAttribute("font-size", 50);
        text.innerHTML = "YOU LOSE";
        s.appendChild(text);
    }else{
    
        for (var i=0;i < cs.length; i++){
            if(cs[i].getAttribute('fill') == "green"){
                for (var j=0;j < cs.length; j++){
                    if(distance(cs[i].getAttribute("cx"), 
                                cs[i].getAttribute("cy"),
                                cs[j].getAttribute("cx"),
                                cs[j].getAttribute("cy")) < 50 && j>1){                       
                        cs[j].remove();       
                        if(cs[j].getAttribute("fill") == "red"){
                            life.innerHTML = a-1;
                        }
                    }      
                }
            }else if(cs[i].getAttribute('fill') == "blue"){
                for (var j=0;j < cs.length; j++){
                    if(distance(cs[i].getAttribute("cx"), 
                                cs[i].getAttribute("cy"),
                                cs[j].getAttribute("cx"),
                                cs[j].getAttribute("cy")) < 20 && i!=j && cs[j].getAttribute("fill")=="red"){
                        cs[i].remove();
                        cs[j].remove();
                    }
                }
            }else if(cs[i].getAttribute('fill') == "red"){
                enemyMove(cs[i]);
            }
            
        }
        enemies();
    }
}




/////////////////////////////
addCircle(s,300,300,40,'green');
addCircle(s,300,300,150,"#00ffff");
var cs = document.getElementsByTagName("circle");
cs[1].setAttribute("fill-opacity",0.3);
var myevent;
myevent = setInterval(collisions,100);
s.addEventListener("click",update);

