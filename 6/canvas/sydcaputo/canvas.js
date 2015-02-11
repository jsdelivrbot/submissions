

var c= document.getElementById("c");
var ctx = c.getContext("2d");

#ctx.fillRect(x,y,h,w)

var setup = function(){
	ctx.beginPath();
   	var img = new Image();
    img.src = 'dog.jpeg';
    img.onload = function() {
		ctx.drawImage(img, 0,0);
    }
};
setup();
#c.addEventListener("click",clicked);
#var b = document.getElementById("b");
#b.addEventListener("click",clear);
