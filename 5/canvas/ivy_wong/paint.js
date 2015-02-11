var c = document.getElementById("c");
var ctx = c.getContext("2d");
var mouseDown = 0;

var paint = function(e){
    mouseDown = document.onmousedown;
    //if(mouseDown){
        e.preventDefault();
        coords.push(createPt(e.offsetX,e.offsetY,10,"#ff0000"));
        coords[coords.length-1].draw();
        console.log("Drawn.");
        //update();
    //}
};

var update = function(){
    clear();
    for(var i = 0; i < coords.length; i++){
        coords[i].draw();
    }
};

var clear = function(e){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,800,500);
    ctx.beginPath();
};

var createPt = function(x,y,size,color){
    return {
        x: x,
        y: y,
        size: size,
        color: color,
        draw: function(){
            ctx.fillStyle=this.color;
            ctx.moveTo(x,y);
            ctx.arc(x,y,size,0,2*Math.PI);
            ctx.fill();
        }
    };
};

var coords = [];

c.addEventListener("mousemove",paint);
var b = document.getElementById("b");
b.addEventListener("click",clear);
