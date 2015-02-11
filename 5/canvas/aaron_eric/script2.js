var c = document.getElementById("c");
var ctx = c.getContext("2d");

var arms = 
  ["ヽ","ﾉ","ι","ง","┌","┘","╯","╮","╭","¬","ᕙ","ᕗ","ᕕ","ᕗ","|","つ","っ","ლ "," ლ","ᕦ","ᕤ","乁","ㄏ","凸","ᓄ","୧","୧ "," ୧","୨"," ୨","୨ ","~",""];

var sides = 
  ["(",")","( "," )","༼","༽","༼ "," ༽","ʕ","ʔ","ʕ "," ʔ","[","]","[ "," ]"];

var eyes = 
    ["°","º","⚆","ಠ","ಥ","ຈ","@","Ὸ","☉","●","ʘ","◕","◔","◉","Ɵ͆","Ɵ","•","•̀","•́","⎚","σ","ರೃ","☢","☑","╯","╰","◥▶","◀◤","´","｀","ʘ̚","＾","☯","☭","✪","♥","■","˘","▀̿̿","▀̿","▣","'","'́"," ͒"," ͒","ᑊ"];

var brows = 
  [ "͡","͝","͠", "̿"," ",""];

var mouths = 
  [" ͜ʖ","ʖ"," ͜ʖ͡","~͜ʖ~","╭͜ʖ╮","Ĺ̯̿̿","ل͟","ل͜","⌣","□","ᴥ","౪","◞౪◟","益","ｰ","-","_","▽","(oo)","Д","◡","﹏","ᐛ","▾","ヮ","∀","╾","3","~"," ~ ","┐","∠"," ⌂","⌂","ᘩ","o"," o "];

var parts = [0,2,0,0,0,0,0,3,1];

var makeDonger = function(x,y,size,ctx,parts){
    return {
	x : x,
	y : y,
	font : size+"px Comic Sans MS",
	text : arms[parts[0]]+sides[parts[1]]+eyes[parts[2]]+brows[parts[3]]+mouths[parts[4]]+brows[parts[5]]+eyes[parts[6]]+sides[parts[7]]+arms[parts[8]],
	ctx : ctx,
	dx : 1,

	draw : function() {
	    ctx.fillStyle="#000000";
	    ctx.font = this.font;
	    ctx.fillText(this.text,this.x,this.y);
	    ctx.stroke();
	},
	move : function() {
	    this.x = this.x + this.dx;
	    this.y = this.y + 2*Math.random() -1;
	    if (this.x < 0){
		this.dx = Math.abs(this.dx);
	    }
	    if (this.x > c.width-330){
		this.dx = Math.abs(this.dx) * -1;
	    }
	    if (this.y < 20 || this.y > c.height-20){
		this.y = 100 + 400*Math.random();
	    }
	}
    };
};


var update = function() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle="#ffffff";
    ctx.lineWidth = 5;
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle="#000000";
    ctx.font = "30px Comic Sans MS";
    ctx.textAlign="center";
    ctx.fillText(arms[parts[0]]+sides[parts[1]]+eyes[parts[2]]+brows[parts[3]]+mouths[parts[4]]+brows[parts[5]]+eyes[parts[6]]+sides[parts[7]]+arms[parts[8]],window.innerWidth/2,window.innerHeight*1/8);
    for (var i = 0; i < 9; i++) {
	ctx.rect(i*window.innerWidth/9,window.innerHeight*8/10,window.innerWidth/10,window.innerHeight/10);
	var p
	if ( i == 0 || i == 8)
	    p = arms;
	else if (i == 1 || i == 7)
	    p = sides;
	else if (i == 2 || i == 6)
	    p = eyes;
	else if (i == 3 || i == 5)
	    p = brows;
	else if (i == 4)
	    p = mouths;
	ctx.fillText(p[parts[i]],window.innerWidth/15+i*window.innerWidth/9,window.innerHeight*8.7/10);
	ctx.stroke();
    }
    ctx.stroke();
    for (i = 0; i < dongers.length; i++){
	dongers[i].move();
	dongers[i].draw();
    }
    window.requestAnimationFrame(update);
};


var clicked = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    if (y > window.innerHeight*8/10) {
	var i = Math.floor(9*x/window.innerWidth);
	var p;
	if (i == 0 || i == 8)
	    p = arms;
	else if (i == 1 || i == 7)
	    p = sides;
	else if (i == 2 || i == 6)
	    p = eyes;
	else if (i == 3 || i == 5)
	    p = brows;
	else if (i == 4)
	    p = mouths;
	if (parts[i] >= p.length-1)
	    parts[i] = 0;
	else
	    parts[i]++;
    }
    else {
	x = Math.min(e.offsetX,c.width-330);
	var d = makeDonger(x,y,69,ctx,parts);
	dongers.push(d);
    }
}; 


var dongers = [];
window.onload = update();
c.addEventListener("click",clicked);
window.requestAnimationFrame(update);
