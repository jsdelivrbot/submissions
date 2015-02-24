var array =[];
var counter=0;

array.push("200,50 70,275 330,275");
array.push("50,50 300,50 300,300 50,300");
array.push("200,50 58, 154 112,321 288,321 342,154");
array.push("350,200 275,70 125,70 50,200 125,330 275,330");
array.push("200,50 82,106 54,232 135,335 265,335 347,234 316,108");
array.push("200,50 94,94 50,200 94,306 199.5,350 306,306 350,200 306,94");
array.push("200,50 104,86 53,174 70,275 148,341 251,342 330,275 348,174 297,86");
array.push("200,50 112,79 58,154 58,246 112,321 200,350 288,321 342,247 342,154 288,79");
array.push("300,25  329,111 419,111 347,165 373,251 300,200 227,251 253,165 181,111 271,111");

var cClicked = function(e) {
    e.preventDefault();
    console.log("cClicked");
    this.setAttribute('points',array[counter]);
    counter++;
    if (counter ==9){counter=0;}
};


var addShape = function(s) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","polygon");
    c1.setAttribute('points',array[0]);
    c1.setAttribute('fill','red');
    c1.setAttribute('stroke','blue');
    c1.setAttribute('stroke-width',"2");
    c1.addEventListener('click',cClicked);
    s.appendChild(c1);
    
};



var s = document.getElementById("s");
addShape(s);
s.addEventListener('click',clicked);

