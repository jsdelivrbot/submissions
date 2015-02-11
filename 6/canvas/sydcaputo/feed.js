var c= document.getElementById("c");
var ctx = c.getContext("2d");



var setup = function(){
   	var img = new Image();
    img.src = 'dog.png';
    img.onload = function() {
		ctx.drawImage(img,230,450, 60, 60);
    }
};

var makeTreat = function(x,y,w,h,ctx){
		return {
				x : x,
				y : y,
				w : w,
				h : h,
				ctx : ctx,
				color : "#FFB266";
				dx : 1,
				draw : function() {
						ctx.fillStyle = this.color;
						ctx.fillRect(this.x,this.y,this.w,this.h);
				},
				move : function() {
						this.y = this.y + 5
						if (this.y >=450){
								
						}
				}
						
				
		};
};


	'''var x = 250;
	var y = 100;
	ctx.fillRect(x,y,15,10);
	while (this.y <= 450){
		this.y = this.y + 5;
	}
	window.requestAnimationFrame(makeTreat);'''
}

 

 
setup();
var t = document.getElementById("t");
t.addEventListener("click",makeTreat);
