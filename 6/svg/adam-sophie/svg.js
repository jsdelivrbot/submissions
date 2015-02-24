var s = document.getElementById("s");

var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



var addCircle = function(x,y,state) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    //var r = 5+30*Math.random();
    var r = 8;
    var c = getRandomColor();
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    //c1.createAttribute('dx');
    //c1.createAttribute('dy');
    c1.setAttribute('dx',Math.random()*10-5);
    c1.setAttribute('dy',Math.random()*10-5);
    c1.setAttribute('state',state);
    c1.setAttribute('counter',25);
    //c1.addEventListener('click',cClicked);
    s.appendChild(c1);
    
};


var clicked = function(e) {
    addCircle(e.offsetX, e.offsetY, "growing");
};




var move = function() {
    var cs = document.getElementsByTagName("circle");
    for (var i=0;i<cs.length;i++) {
        var x = parseFloat(cs[i].getAttribute('cx'));
        var y = parseFloat(cs[i].getAttribute('cy'));
        var r = parseFloat(cs[i].getAttribute('r'));
        var dx = parseFloat(cs[i].getAttribute('dx'));
        var dy = parseFloat(cs[i].getAttribute('dy'));
        var counter = parseFloat(cs[i].getAttribute('counter'));
        var state = cs[i].getAttribute("state");
        if (state == "bouncing"){
            if (x - r < 0 || x + r > 640){
                dx = dx * -1;
            }
            if (y - r < 0 || y + r > 480){
                dy = dy * -1;
            }
            x += dx;
            y += dy;
        } else if (state == "growing"){
            r++;
            if (r == 40){
                state = "big";
            }
        } else if (state == "big"){
            counter--;
            if (counter == 0) {
                state = "shrinking";
            }
        } else if (state == "shrinking"){
            r--;
            if (r == 0){
                //cs[i].remove();
                state = "done";
            }
        }
        cs[i].setAttribute('cx',x);
        cs[i].setAttribute('cy',y);
        cs[i].setAttribute('dx',dx);
        cs[i].setAttribute('dy',dy);
        cs[i].setAttribute('state',state);
        cs[i].setAttribute('dy',dy);
        cs[i].setAttribute('r',r);
        cs[i].setAttribute('counter',counter);
        
    }
};

var t = 0;
var go = function() {
    //e.preventDefault();
    if (t==0){
        t = setInterval(move,50);
    } else {
        clearInterval(t);
        t=0;
    }
};

var reset = function(){
    for (var i = 0; i < 20; i++){
        addCircle(320,240,"bouncing");
    }
    go();
}

s.addEventListener('click',clicked);
var g = document.getElementById("go");
g.addEventListener("click",go);


reset();

