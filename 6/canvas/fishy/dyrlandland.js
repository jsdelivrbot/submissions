var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas);

var jon_alfReady = false;
var jon_alfImage = new Image();
jon_alfImage.onload = function () {
    jon_alfReady = true;
};
jon_alfImage.src = "static/jon_alf.png";
var jon_alf = {};

var mikeReady = false;
var mikeImage = new Image();
mikeImage.onload = function () {
    mikeReady = true;
};
mikeImage.src = "static/mike.png";
var mike = {};

var topherReady = false;
var topherImage = new Image();
topherImage.onload = function () {
    topherReady = true;
};
topherImage.src = "static/topher.png";
var topher = {};

var samReady = false;
var samImage = new Image();
samImage.onload = function () {
    samReady = true;
};
samImage.src = "static/sam.png";
var sam = {};

var yuliaReady = false;
var yuliaImage = new Image();
yuliaImage.onload = function () {
    yuliaReady = true;
};
yuliaImage.src = "static/yulia.png";
var yulia = {};

var thluffyReady = false;
var thluffyImage = new Image();
thluffyImage.onload = function () {
    thluffyReady = true;
};
thluffyImage.src = "static/thluffy.png";
var thluffy = {};

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

var reset = function () {
    playMP3();
    jon_alf.x = canvas.width / 2;
    jon_alf.y = canvas.height / 2;
    mike.x = 32 + (Math.random() * (canvas.width - 64));
    mike.y = 32 + (Math.random() * (canvas.height - 64));
    topher.x = 32 + (Math.random() * (canvas.width - 64));
    topher.y = 32 + (Math.random() * (canvas.height - 64));
    sam.x = 32 + (Math.random() * (canvas.width - 64));
    sam.y = 32 + (Math.random() * (canvas.height - 64));
    yulia.x = 32 + (Math.random() * (canvas.width - 64));
    yulia.y = 32 + (Math.random() * (canvas.height - 64));
    thluffy.x = 32 + (Math.random() * (canvas.width - 64));
    thluffy.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function () {
    if (87 in keysDown) { // Player holding up
	if (jon_alf.y>0){
	jon_alf.y -= 10;
	document.getElementById("message").innerHTML="An Interactive Plaything by Fish Milnikiewicz";}
    }
    if (83 in keysDown) { // Player holding down
	if (jon_alf.y<345){
	jon_alf.y += 10;
	document.getElementById("message").innerHTML="An Interactive Plaything by Fish Milnikiewicz";}
    }
    if (65 in keysDown) { // Player holding left
	if (jon_alf.x>0){
	jon_alf.x -= 10;
	document.getElementById("message").innerHTML="An Interactive Plaything by Fish Milnikiewicz";}
    }
    if (68 in keysDown) { // Player holding right
	if (jon_alf.x<745){
	jon_alf.x += 10;
	document.getElementById("message").innerHTML="An Interactive Plaything by Fish Milnikiewicz";}
    }
    if (jon_alf.x <= (mike.x + 32) && mike.x <= (jon_alf.x + 32) && jon_alf.y <= (mike.y + 32) && mike.y <= (jon_alf.y + 32)){
	document.getElementById("message").innerHTML="I flooded the school lol";
    }
    if (jon_alf.x <= (topher.x + 32) && topher.x <= (jon_alf.x + 32) && jon_alf.y <= (topher.y + 32) && topher.y <= (jon_alf.y + 32)){
	document.getElementById("message").innerHTML="I look a lot like Jesus";
    }
    if (jon_alf.x <= (sam.x + 32) && sam.x <= (jon_alf.x + 32) && jon_alf.y <= (sam.y + 32) && sam.y <= (jon_alf.y + 32)){
	document.getElementById("message").innerHTML="I own 273 t-shirts";
    }
    if (jon_alf.x <= (yulia.x + 32) && yulia.x <= (jon_alf.x + 32) && jon_alf.y <= (yulia.y + 32) && yulia.y <= (jon_alf.y + 32)){
	document.getElementById("message").innerHTML="I like to ride my unicycle";
    }
    if (jon_alf.x <= (thluffy.x + 32) && thluffy.x <= (jon_alf.x + 32) && jon_alf.y <= (thluffy.y + 32) && thluffy.y <= (jon_alf.y + 32)){
	document.getElementById("message").innerHTML="BLARRRRRRRGH";
    }
    mike.y+=randomReal(-1,1);
    topher.y+=randomReal(-1,1);
    sam.y+=randomReal(-1,1);
    yulia.y+=randomReal(-1,1);
    thluffy.y+=randomReal(-1,1);
};

var render = function () {
    if (jon_alfReady) {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(jon_alfImage, jon_alf.x, jon_alf.y);
    }
    if (mikeReady) {
	ctx.drawImage(mikeImage, mike.x, mike.y);
    }
    if (topherReady) {
	ctx.drawImage(topherImage, topher.x, topher.y);
    }
    if (samReady) {
	ctx.drawImage(samImage, sam.x, sam.y);
    }
    if (yuliaReady) {
	ctx.drawImage(yuliaImage, yulia.x, yulia.y);
    }
    if (thluffyReady) {
	ctx.drawImage(thluffyImage, thluffy.x, thluffy.y);
    }
};

var main = function () {
    update();
    render();
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

function playMP3(){
    document.getElementById("garden.mp3").play();
}

function randomReal(xmin,xmax) { return Math.random() * (xmax - xmin) + xmin;}

reset();
main();




