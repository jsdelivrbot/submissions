var disappear = function(){
    this.remove();
};

var addCircle = function(x,y,r){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.setAttribute('r',r);
    c.style('fill',function() {
	return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });
    c.addEventListener('click',disappear);
    s.appendChild(c);
};

var start = function(){
    for (var i = 0;i<50;i++){
	addCircle(Math.random()*1000,Math.random()*500,Math.random()*30);
    }
};

var st = document.getElementById("Start");
st.addEventListener("click",start);
