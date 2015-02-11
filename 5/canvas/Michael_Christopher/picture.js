var pic = document.getElementById('pics');
var picx = pic.getContext("2d");
var image1 = new Image();
var image2 = new Image();
var image3 = new Image();
var image4 = new Image();
image1.src='1afraid.jpeg';
image2.src='2happy.jpg';
image3.src='3sad.jpg';
image4.src='4angry.jpg';

current = 1;
draw(image1,image2,image3,image4);
function draw (x,y,z,h){
    x.onload = function(){
	picx.drawImage(x,0,0,355,355);};
    y.onload = function(){
	picx.drawImage(y,0,360,355,355);};
    z.onload = function(){
	picx.drawImage(z,360,0,355,355);};
    h.onload = function(){
	picx.drawImage(h,360,360,355,355);};
};


var clicked = function(e){
    var image1 = new Image();
    var image2 = new Image();
    var image3 = new Image();
    var image4 = new Image();
    if (current > 4)
	current = 0;
    if (current == 1){
	console.log('a');
	image1.src = '2afraid.jpg';
	image2.src = '3happy.jpg';
	image3.src = '4sad.jpg';
	image4.src = '1angry.jpg'; }
    if (current == 2){
	image1.src = '3afraid.jpg';
	image2.src = '4happy.jpg';
	image3.src = '1sad.jpg';
	image4.src = '2angry.jpg'; }
    if (current == 3){
	image1.src = '4afraid.jpg';
	image2.src = '1happy.jpg';
	image3.src = '2sad.jpg';
	image4.src = '3angry.jpg'; }
    if (current == 4){
	image1.src = '1afraid.jpeg';
	image2.src = '2happy.jpg';
	image3.src = '3sad.jpg';
	image4.src = '4angry.jpg'; }
    current += 1; 
    draw(image1,image2,image3,image4);
};
pic.addEventListener("click",clicked);



    
