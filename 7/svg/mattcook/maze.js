var maze=document.getElementById("maze");
var objects=document.getElementsByClassName("char");
var pic=document.getElementById("pic");
var level=1;
var path=document.getElementsByTagName("circle");
var score=0;

var addEllipse = function(s,x,y,rx,ry,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('rx',rx);
    c1.setAttribute('ry',ry);
    c1.setAttribute('fill',c);
    
    s.appendChild(c1);
    
};

document.addEventListener("keydown",function(e) {
    console.log("detected key code"+e.keyCode);
    var currentcx=0;
    var currentcy=0;
    for(i=0; i<objects.length; i++) {
	currentcx=parseFloat(objects[i].getAttribute('cx'))
	currentcy=parseFloat(objects[i].getAttribute('cy'));
    }
    addEllipse(maze,currentcx,currentcy,2,2,'blue');
    score++;
    $('#t').html("BM Score="+score);
    console.log(score);
    var down=0;
    var right=0;
    if (e.keyCode == 37){
	right = -4;
    }
    if (e.keyCode==38){
	down=-4;
    }
    if (e.keyCode==39){
	right=4;
    }
    if (e.keyCode==40){
	down=4;
    }
    for(i=0; i<objects.length; i++) {
	objects[i].setAttribute('cx',currentcx+right);
	objects[i].setAttribute('cy',currentcy+down);
	console.log(parseFloat(objects[i].getAttribute('cx')));
	console.log(parseFloat(objects[i].getAttribute('cy')));
	if (level==1 && parseFloat(objects[i].getAttribute('cx'))>657){
	    level=2;
	    //console.log("woohoo");
	    pic.setAttribute('xlink:href',"http://www.uefap.com/images/maze.gif");
	    $("ellipse").remove();
	    objects[i].setAttribute('cx',20);
	    objects[i].setAttribute('cy',138);
	    
	    alert("Woohoo! Level 2");
	    
	}
	if (level==2 && parseFloat(objects[i].getAttribute('cy'))<19){
	    level=3;
	    //console.log("woohoo");
	    pic.setAttribute('xlink:href',"http://mazestoprint.com/hard/rectangle/hard24.jpg");
	    $("ellipse").remove();
	    objects[i].setAttribute('cx',70);
	    objects[i].setAttribute('cy',210);
	    
	    alert("Teehee! Level 3");
	    
	}
	if (level==3 && parseFloat(objects[i].getAttribute('cx'))>646){
	    alert("you have won! your score was "+score);
	}

	
}
    
   
});
