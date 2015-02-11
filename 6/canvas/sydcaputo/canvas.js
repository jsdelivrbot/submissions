

var c= document.getElementById("c");
var ctx = c.getContext("2d");

#ctx.fillRect(x,y,h,w)

var setup = function(){
   	var img = new Image();
    img.src = 'dog.png';
    img.onload = function() {
		ctx.drawImage(img,50,50);
    }
};
setup();
