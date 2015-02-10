var pic = document.getElementById('pics');
var picx = pic.getContext("2d");
var image1 = new Image();
var image2 = new Image();
var image3 = new Image();
var image4 = new Image();
image1.src='1afraid.jpeg'
image2.src='1happy.jpg'
image3.src='1sad.jpg'
image4.src='1angry.jpg'
image1.onload = function(){
    picx.drawImage(image1,0,0,355,355);};
image2.onload = function(){
    picx.drawImage(image2,0,360,355,355);};
image3.onload = function(){
    picx.drawImage(image3,360,0,355,355);};
image4.onload = function(){
    picx.drawImage(image4,360,360,355,355);};

var clicked = function(e){};
pic.addEventListener("click",clicked);



    
