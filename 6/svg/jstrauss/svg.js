var score = 0;

var clicked = function(e){
        e.preventDefault();
        if (e.offsetY < 50) {
            makeDrop(e.offsetX,e.offsetY);
        }
};

var t =0;
var go = function() {
    if (t==0){
		t = setInterval(moveBlocks,20);
    } 
    else {
		clearInterval(t);
		t=0;
    }
};

var makeBlock = function(x,y) {
    var b1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    b1.setAttribute('x',x);
    b1.setAttribute('y',y);
    b1.setAttribute('width',30);
    b1.setAttribute('height',15)
    b1.setAttribute('fill','red');
    b1.setAttribute('dx',2+Math.random())
    s.appendChild(b1);
};

var makeDrop = function(x,y) {
    var d1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    d1.setAttribute('cx',x);
    d1.setAttribute('cy',y);
    d1.setAttribute('r',5);
    d1.setAttribute('fill','blue');
//    b1.setAttribute('velocity',{ x: 100, y: 100 });
    s.appendChild(d1);
}

var moveBlocks = function() {
    var bs = document.getElementsByTagName("rect");
    for (var i=0; i<bs.length; i++) {
        var x = parseFloat(bs[i].getAttribute('x'));
        var dx = parseFloat(bs[i].getAttribute('dx'));
        if (x < 0 || x > 575){
            bs[i].setAttribute('dx',dx*-1);
        }
        var dx = parseFloat(bs[i].getAttribute('dx'));
        bs[i].setAttribute('x',x+dx);
    }

    var ds = document.getElementsByTagName("circle");
    for (var i=0; i<ds.length; i++) {
        var y = parseFloat(ds[i].getAttribute('cy'));
        ds[i].setAttribute('cy',y+1);
        if (y == 600) {
            score = score - 1;
        }
        for (var j = 0; j < bs.length; j++) {
            if ((Math.abs(parseFloat(ds[i].getAttribute('cx')) - parseFloat(bs[j].getAttribute('x'))) < 20) && (Math.abs(parseFloat(ds[i].getAttribute('cy')) - parseFloat(bs[j].getAttribute('y'))) < 10)) {
                if (bs[j].getAttribute('fill') == "blue") {
                    if (confirm("Game over! Your final score is " + score)){
                        location.reload();
                    }
                }
                else {
                    bs[j].setAttribute('fill','blue');
                    score ++;
                    ds[i].remove();
                }
            }
        }
    }
    document.getElementById("points").innerHTML = score.toString();

};

var s = document.getElementById("s");
s.addEventListener('click',clicked);
var score = 0;
for (var x = 100; x < 600; x += 50){
    makeBlock(565*Math.random()+5,x);
}
go();