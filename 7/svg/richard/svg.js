var s = document.getElementById("s");
var circles = []
var player = 0;
var frames = 0;
var mouseOverIt = function(e){
    if ((parseInt(player.getAttribute("cx")) + parseInt(player.getAttribute("r")) + 1 < 600 && parseInt(player.getAttribute("cx")) - parseInt(player.getAttribute("r")) - 1 > 0)
	&&
	(parseInt(player.getAttribute("cy")) + parseInt(player.getAttribute("r")) + 1 < 600 && parseInt(player.getAttribute("cy")) - parseInt(player.getAttribute("r")) - 1 > 0)){
    player.setAttribute("r",parseInt(player.getAttribute("r"))+1);
    }
}
//var createCircle = function(x,y,r,f,g,dx,dy){
var createCircle = function(x,y,r,f,g,t){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",String(x));
    c.setAttribute("cy",String(y));
    c.setAttribute("r",String(r));
    c.setAttribute("fill",f);
    c.addEventListener("mouseover",function(e){
	player = this;
    });
    c.addEventListener("mouseout",function(e){
	player = 0;
    });
    s.appendChild(c);
    var d = {
	c : c,
	//dx: dx,
	//dy: dy,
	t : t,
	g : g,
	move : function(e){
	    //console.log("Wtf");
	    // if (parseInt(this.c.getAttribute("cx")) + parseInt(this.c.getAttribute("r")) > 600 || parseInt(this.c.getAttribute("cx")) - parseInt(this.c.getAttribute("r")) < 0){
	    // 	this.dx = this.dx * -1;
	    // }
	    // if (parseInt(this.c.getAttribute("cy")) + parseInt(this.c.getAttribute("r")) > 600 || parseInt(this.c.getAttribute("cy")) - parseInt(this.c.getAttribute("r")) < 0){
	    // 	this.dy = this.dy * -1;
	    // }
	    // this.c.setAttribute("cx",parseInt(this.c.getAttribute("cx"))+this.dx);
	    // this.c.setAttribute("cy",parseInt(this.c.getAttribute("cy"))+this.dy); 
	    if (parseInt(this.c.getAttribute("cx")) + parseInt(this.c.getAttribute("r")) >= 600 || parseInt(this.c.getAttribute("cx")) - parseInt(this.c.getAttribute("r")) <= 0){
		if (this.t <= Math.PI && this.t >= 0){
		    this.t = Math.PI - this.t;
		}
		else{
		    this.t = Math.PI*3-this.t;
		}
		if (parseInt(this.c.getAttribute("cx")) + parseInt(this.c.getAttribute("r")) >= 600){
		    this.c.setAttribute("cx",600-parseInt(this.c.getAttribute("r")));
		}
		else{
		    this.c.setAttribute("cx",this.c.getAttribute("r"));
		}
	    }
	    if (parseInt(this.c.getAttribute("cy")) + parseInt(this.c.getAttribute("r")) >= 600 || parseInt(this.c.getAttribute("cy")) - parseInt(this.c.getAttribute("r")) <= 0){
		this.t = 2*Math.PI - this.t;
		if (parseInt(this.c.getAttribute("cy")) + parseInt(this.c.getAttribute("r")) >= 600){
		    this.c.setAttribute("cy",600-parseInt(this.c.getAttribute("r")));
		}
		else{
		    this.c.setAttribute("cy",this.c.getAttribute("r"));
		}
	    }
		
	    this.c.setAttribute("cx",Math.round(parseInt(this.c.getAttribute("cx")) + Math.cos(this.t)*5));
	    this.c.setAttribute("cy",Math.round(parseInt(this.c.getAttribute("cy")) - Math.sin(this.t)*5));
	    //this.c.setAttribute("cx",parseInt(this.c.getAttribute("cx"))+1);
	}
    }
    circles.push(d);
    return d;
}

var update = function(e){
    frames++;
    if (player != 0){
	mouseOverIt();
    }
    if (frames % 2 == 0){
	for (var i = 0; i < circles.length; i++){
	    circles[i].move();
	}
    }
    window.requestAnimationFrame(update);
}

//createCircle(300,300,10,"#000000",0,1,1);
createCircle(300,300,10,"#000000",0,Math.PI/3);
window.requestAnimationFrame(update);
