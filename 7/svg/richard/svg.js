var s = document.getElementById("s");
var circles = []
var createCircle = function(x,y,r,f,g,dx,dy){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",String(x));
    c.setAttribute("cy",String(y));
    c.setAttribute("r",String(r));
    c.setAttribute("fill",f);
    c.addEventListener("click",clickIt);
    s.appendChild(c);
    var d = {
	c : c,
	dx: dx,
	dy: dy,
	g : g
    }
    circles.push(d);
    return d;
}
var clickIt = function(e){
    var c = this.setAttribute("r",String(this.getAttribute("r")+1));
}
    
createCircle(300,300,10,"#000000",0,0,0);
