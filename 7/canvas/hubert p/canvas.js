var canvas = document.getElementById("canvas");
canvas.setAttribute("width","1000");
canvas.setAttribute("height","800");

var ctx = canvas.getContext("2d");
canvas.style.border = "thick solid #000000";

var count = 0;

var mouseone = [];
var mousetwo = [];

var mouseflag = 0;

var data = [];

function renderSystem(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(data);
    newx1 = 100;
    newy1 = 100;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    times = 1;
    
    for (z = 0; z < 1000; z++){
	newData();
	newx1 = 100;
	newy1 = 100;
	for (i = 0; i < 50; i++){
	    for (j = 0; j < data.length; j++){
		if(i%4 == 0){
		    times = data[j][1] + (Math.PI)/2;
		}
		else if(i%4==2){
		    times = data[j][1] + (Math.PI)/4;
		}
		else if(i%4==3){
		    times = data[j][1] + (Math.PI)/3;
		}
		else if(i%4==4){
		    times = data[j][1];
		}
		newx1 += (5.0/100)*data[j][0]*Math.cos(times);
		newy1 += (5.0/100)*data[j][0]*Math.sin(times);			     
		ctx.lineTo(newx1, newy1);
		ctx.moveTo(newx1, newy1);
		
	    }
	}
    }
    ctx.closePath();
    ctx.stroke();
    count = 0;
}

function drawLine(){
    ctx.beginPath();
    ctx.moveTo(mouseone[0], mouseone[1]);
    ctx.lineTo(mousetwo[0], mousetwo[1], 6);
    //console.log("From: " + mouseone[0] + ", " + mouseone[1] + "////To: " + mousetwo[0] + ", " + mousetwo[1]); 
    ctx.closePath();
    ctx.stroke();
}

function changeMouseValue(){
    if(mouseflag == 0){
	mouseone = [event.clientX, event.clientY];
	mouseflag = 1;
	console.log("Flag 0");
    }else{
	if(count == 8){
	    renderSystem();
	    return;
	}
	mousetwo = [event.clientX, event.clientY]
	drawLine();
	count++;
	length = getDist(mouseone, mousetwo);
	slope = getSlope(mouseone, mousetwo);
	data.push( [length, slope] );
	mouseone = mousetwo;
    }
}

function newData(){
    for(k = 0; k < data.length; k++){
	scale = 0.4 + Math.random();
	data[k][0] *= scale;
	data[k][1] *= scale;
    }
}

function getDist(a, b){
    ans =  Math.sqrt(Math.pow( (a[0] - b[0]), 2) + Math.pow( (a[1] - b[1]), 2));
    //console.log("Length: " + ans);
    return ans;
}

function getSlope(a, b){
    ans = Math.atan( (a[1]*1.0 - b[1])/(a[0]*1.0 - b[0]) );
    //console.log("Slope: " + ans);
    return ans;
}

function start(){
    count = 0;
    canvas.addEventListener("click", changeMouseValue);
}

start();

