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
    //rec.setAttribute("rx", 10); //round corners
    //rec.setAttribute("ry", 10);
    rec.setAttribute("width", w);
    rec.setAttribute("height", h);
    rec.setAttribute("fill", "blue");
    rec.setAttribute("stroke", "black");
    rec.setAttribute("stroke-width", "2");
    s.appendChild(rec);
}
var addPlayer = function(s,x,y){
    //temporary player is a circle for now
    var c = getRandColor();
    var cir = document.createElementNS("http://www.w3.org/2000/svg","circle");
    cir.setAttribute("cx",x);
    cir.setAttribute("cy",y);
    cir.setAttribute("r","20");
    cir.setAttribute("fill",c);
    s.appendChild(cir);

}
addPlayer(svg,30,250);
addBlock(svg,300,200,60,60);


var game = function(){
//    addBlock(svg, x,y,width,height);


}
