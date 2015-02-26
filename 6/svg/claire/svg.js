var moveShuffler = function(e) {
    e.preventDefault();
    console.log("moveShuffler");
    var newX = this.getAttribute("x") + e.offsetX;
    this.setAttribute("x",newX);
};


var setUp = function() {
    s = document.getElementById("s");
    //
    var ball = document.createElementNS("http://www.w3.org/2000/svg","circle");
    ball.setAttribute("cx","500");
    ball.setAttribute("cy","350");
    ball.setAttribute("r","7");
    ball.setAttribute("fill","black");
    s.appendChild(ball);
    //
    var shuffler = makeRect(s,450,600);
    shuffler.setAttribute("width","100");
    shuffler.setAttribute("height","20");
    shuffler.setAttribute("fill","black");
    shuffler.addEventListener('onmove', moveShuffler);
    s.appendChild(shuffler);
    //
    makeRect(s,10,10);
    makeRect(s,70,10);
    makeRect(s,130,10);
    makeRect(s,190,10);
    makeRect(s,250,10);
    makeRect(s,310,10);
    makeRect(s,370,10);
    makeRect(s,430,10);
    makeRect(s,490,10);
    makeRect(s,550,10);
    makeRect(s,610,10);
    makeRect(s,670,10);
    makeRect(s,730,10);
    makeRect(s,790,10);
    makeRect(s,850,10);
    makeRect(s,910,10);
    //
    makeRect(s,10,30);
    makeRect(s,70,30);
    makeRect(s,130,30);
    makeRect(s,190,30);
    makeRect(s,250,30);
    makeRect(s,310,30);
    makeRect(s,370,30);
    makeRect(s,430,30);
    makeRect(s,490,30);
    makeRect(s,550,30);
    makeRect(s,610,30);
    makeRect(s,670,30);
    makeRect(s,730,30);
    makeRect(s,790,30);
    makeRect(s,850,30);
    makeRect(s,910,30);
    //
    makeRect(s,10,50);
    makeRect(s,70,50);
    makeRect(s,130,50);
    makeRect(s,190,50);
    makeRect(s,250,50);
    makeRect(s,310,50);
    makeRect(s,370,50);
    makeRect(s,430,50);
    makeRect(s,490,50);
    makeRect(s,550,50);
    makeRect(s,610,50);
    makeRect(s,670,50);
    makeRect(s,730,50);
    makeRect(s,790,50);
    makeRect(s,850,50);
    makeRect(s,910,50);
};
    
var makeRect = function(s,x,y) {
    var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
    r.setAttribute("x",x);
    r.setAttribute("y",y);
    r.setAttribute("height","10");
    r.setAttribute("width","50");
    r.setAttribute("fill","blue");
    s.appendChild(r);
    return r; 
};
 

/*var changeGreen
var changeRed
var deleteRect
var move
*/


setUp();


