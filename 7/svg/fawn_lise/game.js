var svg = document.getElementById("c");

var getRandColor = function(){
    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i=0;i<6;i++){
	color += letters[Math.floor(Math.random()*letters.length)];
    }
    return color;
};

var addBlock = function(s,x,y,w,h){
    console.log(x,y);
    var c = getRandColor();

    var rec = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rec.setAttribute("x", x);
    rec.setAttribute("y", y);
    rec.setAttribute("width", w);
    rec.setAttribute("height", h);
    rec.setAttribute("fill", getRandColor());
    rec.setAttribute("stroke", "black");
    rec.setAttribute("stroke-width", "2");

    
//    rec.setAttribute("x", "100");
    
    s.appendChild(rec);

}


addBlock(svg,300,200,60,60);
