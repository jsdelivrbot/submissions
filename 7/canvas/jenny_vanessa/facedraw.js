var canvas = document.getElementById("canvas");
var clear = document.getElementById("button_clear");

var black = document.getElementById("button_black");
var brown = document.getElementById("button_brown");
var red = document.getElementById("button_red");
var blonde = document.getElementById("button_blonde");
var blue = document.getElementById("button_blue");

var ctx = canvas.getContext("2d");

var radius = 5;

var face1 = new Image();
face1.src = "http://www.beautyramp.com/wp-content/uploads/2012/07/round_face_tdnn9.jpg";


var draw = function (e) {
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, radius, 0,2*Math.PI);
    ctx.fill();
};

var clicked = function(e){
    e.preventDefault();
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY,
            15,0,2*Math.PI);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.stroke();
};

/*
var drawHair = function(e){
    e.preventDefault();
    ctx.moveTo(e.offsetX, e.offsetY)
    ctx.fillStyle = "#ffff00";
};
 */

var clear = function(e){
    e.preventDefault();
    ctx.drawImage(face1,0,0,400,480);
    ctx.beginPath();
};

//canvas.addEventListener("load",clear)
//canvas.addEventListener("click",draw)
canvas.addEventListener("click", clicked)
clear.addEventListener("click",clear)

canvas.addEventListener('mousemove', function(e) ){
    if( mouseDown ){
        draw(e);
    }
});
