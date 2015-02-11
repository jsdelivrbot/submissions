var vendorUrl = window.URL || window.webkitURL;
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var radius=0;
var savedVideo= document.getElementById("saved");

var video = document.getElementById("video");
navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getMedia({
    video: true,
    audio: false,
}, function(stream) {
    video.src =vendorUrl.createObjectURL(stream);
    video.play();
}, function(error){
    //an error occured
});


document.getElementById('capture').addEventListener("click",function(){
    ctx.drawImage(video,0,0,700,500);
    savedVideo.src = canvas.toDataURL('image/png')
});



document.getElementById('submit').addEventListener("click",function(){
    var imgsrc = document.getElementById('url').value;    
    var img = new Image();
    ctx.drawImage(img,0,0,700,500);
    img.src = imgsrc;
});
 


var lipstick = document.getElementById("lipstick");
var eyeshadow = document.getElementById("eyeshadow");
var blush = document.getElementById("blush");
var eyeliner = document.getElementById("eyeliner");

var myState= this;
var clear = document.getElementById("clear");
var mouseDown = 0;
document.body.onmousedown = function() { 
    ++mouseDown;
}
document.body.onmouseup = function() {
    --mouseDown;
}
window.onload = function() {
    ctx.fillStyle ="rgba(0, 100, 255, 0)";
    
};


draw = function (e) { 
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, radius, 0,2*Math.PI);
    ctx.fill();
}

lipstick.addEventListener("click",function(e){
    ctx.fillStyle ="rgba(255, 0, 0, 0.03)";
    radius= 7;
    //console.log("Hello World!");
});

eyeshadow.addEventListener("click",function(e){
    ctx.fillStyle ="rgba(0, 100, 255, 0.03)";
    radius =5;
    //console.log("Hello World!");
});

blush.addEventListener("click",function(e){
    ctx.fillStyle ="rgba(200, 0, 0, 0.008)";
    radius =20;
    //console.log("Hello World!");
});

eyeliner.addEventListener("click",function(e){
    ctx.fillStyle ="rgba(0, 0, 0, 0.4)";
    radius =1.5;
    //console.log("Hello World!");
});


canvas.addEventListener('mousemove', function(e) {
    if (mouseDown){
	//console.log("drag");
	draw(e);
    }
});
clear.addEventListener("click", function() {
    ctx.drawImage(savedVideo,0,0,700,500);
    
});
