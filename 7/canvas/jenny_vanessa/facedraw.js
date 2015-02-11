var canvas = document.getElementById("canvas");
var clear = document.getElementById("button_clear");

var black = document.getElementById("button_black");
var brown = document.getElementById("button_brown");
var red = document.getElementById("button_red");
var blonde = document.getElementById("button_blonde");
var blue = document.getElementById("button_blue");

var ctx = canvas.getContext("2d");

var radius = 5;

var fillstyle = "#000000";

var face1 = document.createElement("img");
face1.src = "http://www.beautyramp.com/wp-content/uploads/2012/07/round_face_tdnn9.jpg";


//DRAWING AND RESETTING
var draw = function (e) {
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, radius, 0,2*Math.PI);
    ctx.fillStyle=fillstyle;
    ctx.fill();
};

var reset = function(e){
    console.log("clearing");
    ctx.drawImage(face1,0,0,400,480);
    ctx.beginPath();
};

//COLOR CHANGES
var changeColor = function(color){
    console.log("colorchange");
    fillstyle = color;
}

var setBlack = function(){
    changeColor("black");
}
var setBrown = function(){
    changeColor("brown");
}
var setRed = function(){
    changeColor("red");
}
var setBlonde = function(){
    changeColor("yellow");
}
var setBlue = function(){
    changeColor("blue");
}

face1.onload = reset;

canvas.addEventListener("click",draw)
clear.addEventListener("click",reset);


black.addEventListener("click", setBlack);
brown.addEventListener("click", setBrown);
red.addEventListener("click", setRed);
blonde.addEventListener("click", setBlonde);
blue.addEventListener("click", setBlue);

