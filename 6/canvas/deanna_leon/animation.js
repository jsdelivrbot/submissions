var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

// images are all the images we have, pictures are what images we already put
// on the canvas (functionality stuff in update() for loop

//images: Benedict, Paul, Anna, Keka, Deanna, Alex, Shantanu, Yihua, Ayumi,
//Ishman, Jake, Tobias, Paolo, Nathan, Jeremy, Henry, Leon, Cat
var place = 0;
var images = ["https://scontent-a-lga.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/943410_592118480851550_769474604_n.jpg?oh=28e1e3769e762191c4e0ec0ceaaabeea&oe=555B243D", "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-ash2/v/t1.0-9/481256_3383360669728_1761970758_n.jpg?oh=a645708a83ca35ca21025e484cd937d1&oe=554F495F&__gda__=1435765729_353a5aa3fea3d1a823c38a2f184b7312", "https://scontent-b-lga.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/418806_515456365147498_1557933748_n.jpg?oh=f23ee801b167a569ebef54f2ca27061e&oe=556274A7", "https://scontent-a-lga.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1381638_593198080738126_1344665637_n.jpg?oh=274017fbc138e66e9d812aebe1d76330&oe=5549EE07", "https://scontent-b-lga.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/301693_4998088184707_1379076512_n.jpg?oh=3de5e030fab24debb2b60ec12d72a4ef&oe=5563674A", "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xap1/v/t1.0-9/1175734_507351089348485_1451938684_n.jpg?oh=b8407c7071fa0bf7326945f2db3cada7&oe=5558ACFE&__gda__=1431764951_cce9bb2de715b4f6a8b506b72f8080b1","https://scontent-a-lga.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/7709_391844834280905_1193951767_n.jpg?oh=167f3324af058c023ea615223c86eea4&oe=555C3F98", "https://scontent-b-lga.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/1426739_10202898849215472_2014088569_n.jpg?oh=90453a2a0398d6e21869ef54f3303ab6&oe=554F1539", "https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/t31.0-8/s960x960/1094011_491952747548536_527976267_o.jpg",  "https://scontent-a-lga.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1395329_10200482942786121_427674639_n.jpg?oh=a4990a88c5e780ee8e99998a857b1d4a&oe=5594812B","https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xap1/v/t1.0-9/10260014_680701695309173_6026663409915081292_n.jpg?oh=e694c46deb1f414b8a1293ca48769b7c&oe=55964840&__gda__=1431057820_99c43c51b3435d4b559b5346c0e2aa26", "https://scontent-a-lga.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/1965043_1571621059719051_3706027791339470441_n.jpg?oh=93b89126d4ee570b901b4bf377efa982&oe=55963941", "https://scontent-b-lga.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1619647_688559091208414_1140754180_n.jpg?oh=69afe1ea6a1d533ebc10bfa629b642b3&oe=555D45AF", "https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/10552362_540970686003956_8764549495498916234_n.jpg?oh=e5eae60ffc8c2425eba257fb4197d6c9&oe=5555871C&__gda__=1432037269_4d000ac105e1b6255e8681b11c5cf580", "https://scontent-a-lga.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/1924776_1396651150601915_1377893913_n.jpg?oh=2cc6f78ac8adbb93fb35f5fd09da2b72&oe=5591EA64", "https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/255750_383016961812627_859779901_n.jpg?oh=b7140e2d35b13998646ff740144e4f53&oe=55505ECB&__gda__=1432597621_149e335f70b1451b709d590c39fce8e7", "https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/1622681_710861005674910_2700161250578397259_n.jpg?oh=0d0c91e60ce461d0a712421c7d41e2e7&oe=554E9D4D&__gda__=1430959216_86b693ed8928e52f887d75533ff5d8f3","http://i.huffpost.com/gen/964776/thumbs/o-CATS-KILL-BILLIONS-facebook.jpg"];

var pictures = [];
console.log("fuck this");

var makeThing = function(x,y,w,h,ctx, place){
    return{
	x : x,
	y : y,
	w : w,
	h : h,
	ctx : ctx,
	color : "#ff0000", //we wont need color eventually
	dx : 1,
	dy : 1,
	place : place,
	ctx : ctx,
	draw : function(){
	    var img = new Image();
	    img.src = images[this.place];
	    ctx.drawImage(img, this.x, this.y, this.w, this.h);
//	    img.addEventListener("load", function(){
//		canvas.drawImage(img, x, y, w, h); //this is bad
//	    });	
	},
	move: function(){
	    console.log("getting there");
	    this.x = this.x + this.dx;
	    this.y = this.y + this.dy;
	    if (this.x < 1 || this.x > 545){
		this.dx = this.dx * -1;
	    }
	    if (this.y < 1 || this.y > 550){
		this.dy = this.dy * -1;
	    }
	}
    };
};

var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    console.log("hope")
    for (var i=0; i<pictures.length; i++){
	console.log(pictures.length)
	pictures[i].move();
	pictures[i].draw();
    }
    window.requestAnimationFrame(update);
};

var clicked = function(){
    img = makeThing(event.clientX, event.clientY, 50, 50, ctx, place)
    console.log("ayyyyy")
    if (place < images.length -1){
	
	place += 1
    }
    pictures.push(img)
    console.log(pictures[0])
    console.log(place)
}

canvas.addEventListener("click", clicked);
window.requestAnimationFrame(update);
    
