var c = document.getElementById("c");
var ctx = c.getContext("2d");

var coords = [];
var mouseDown = false;

var currColor = "#ff0000";
var currSize = 6;

var onMouseDown = function(e){
    mouseDown = true;
    ctx.beginPath();
};

var onMouseUp = function(e){
    mouseDown = false;      
};

var inc = function(){
    currSize += 5;
    console.log("Current brush size: " + currSize);
};

var dec = function(){
    currSize -= 5; 
    if(currSize < 1){
        currSize = 1;   
    }
    console.log("Current brush size: " + currSize);
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
    coords = [];
};

var createPt = function(x,y,size,color){
    return {
        x: x,
        y: y,
        size: size,
        color: color
    };
};

//index is the index of the pt you want to draw
var draw = function(index){
    pt = coords[index];
    ctx.lineWidth=pt.size;
    ctx.strokeStyle=pt.color;
    if(index==0){
        ctx.moveTo(pt.x,pt.y);
    } else{
        prev = coords[index-1];
    }
    ctx.lineTo(pt.x,pt.y);
    ctx.stroke();
    console.log("Drawnn"); 
};

var paint = function(e){
    if(mouseDown){
        e.preventDefault();
        coords.push(createPt(e.offsetX,e.offsetY,currSize,currColor));
        draw(coords.length-1);
    }
};

var changeColor = function(e){
    currColor = e.target.id;
    console.log("Current color: " + currColor);
};

c.addEventListener("mousemove",paint);
c.addEventListener("mousedown",onMouseDown);
c.addEventListener("mouseup",onMouseUp);

var clr = document.getElementById("clear");
var szup = document.getElementById("size-up");
var szdown = document.getElementById("size-down");
var colors = document.getElementById("colors");

clr.addEventListener("click",clear);
szup.addEventListener("click",inc);
szdown.addEventListener("click",dec);
colors.addEventListener("click",changeColor);

