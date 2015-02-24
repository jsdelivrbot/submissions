var items = 0;
var clock = 0;
var maxItems=15;
var bomb = false;
var play = true;
var score=0;

var update = function(b) { 
    var sc = document.getElementById("score");
    sc.innerHTML = score;
};
    
var makeFruit = function() {
    var num = Math.floor(Math.random() * (4-0));
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","image");
    if (num==0){
	c1.setAttributeNS('http://www.w3.org/1999/xlink','href',"apple.png");
	c1.setAttribute("id","apple");
    }
    if (num==1) {
	c1.setAttributeNS('http://www.w3.org/1999/xlink','href',"banana.png");
	c1.setAttribute("id","banana");
    }
    if (num==2){
	c1.setAttributeNS('http://www.w3.org/1999/xlink','href',"watermelon.png");
	c1.setAttribute("id","watermelon");
    }
    if (num==3){
	c1.setAttributeNS('http://www.w3.org/1999/xlink','href',"bomb.png");
	c1.setAttribute("id","bomb");
    }
    if (num==4){
	c1.setAttributeNS('http://www.w3.org/1999/xlink','href',"grape.png");
	c1.setAttribute("id","grape");
    }
    c1.setAttribute("height","70px");
    c1.setAttribute("width","70px");
    c1.setAttribute('x',Math.random()*400);
    c1.setAttribute('y',Math.random()*400);
    c1.addEventListener('click',cClicked);
    if (play==true){
	if (items>maxItems){ 
	    play=false;
	    window.alert("too slow...total score is " + score);
	}
	else { 
	    s.appendChild(c1);
	    items++;
	}
    }
    update();
}

var cClicked = function(e) { 
    e.preventDefault();
    console.log("cClicked");
    var type = this.getAttribute("id");
    if (type=="bomb"){ 
	bomb=true;
	play=false;
	window.alert("you clicked on a bomb...total score is " + score);
    }
    this.remove();
    items--;
    score++;
    update();
}

var t=0;
var go = function(e) { 
    e.preventDefault();
    if (play==true){
	if (t==0){
	    t= setInterval(makeFruit,500);
	}
	else { 
	    clearInterval(t);
	    t=0;
	}
    }
}

var s = document.getElementById("s");
var g = document.getElementById("go");
g.addEventListener("click",go);
