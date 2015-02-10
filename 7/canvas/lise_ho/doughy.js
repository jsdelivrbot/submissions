var c = document.getElementById("c");
var ctx = c.getContext("2d");
var makeDough = function (x,y,w,h, ctx){
    return {
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	dx : 1,
	draw : function(){
	    ctx.drawImage(img[Math.random(4)],w,h);
	},
	move : function(){

	}
    };
};


var update = function(){

};

var addDough = function(e){
    //size of parent container
    var x = e.offsetX; 
    var y = e.offsetY;
    var w = 20 + Math.random(70);
    var h = 10 + Math.random(30);
    doughs.push(makeDough(x,y,w,h,ctx));
};


c.addEventListener("click",addDough);
/*
window.addEventListener("load",function(e){
myevent = setInterval(addDough,300);
});
*/
var doughs = [];
var pics = ["2xchoco.png","coconut.png","glazed.png","passion.jpg","pchoco.png","pink2.png"];
for (var i = 0; i < 4; i++){
    var don = document.createElement("img");
    don.src = "/static/"+pics[rand(pics.length-1)];
    doughs.add(don);
}

doughs.push(makeDough(50,100,30,15,ctx));
window.requestAnimationFrame(update);
