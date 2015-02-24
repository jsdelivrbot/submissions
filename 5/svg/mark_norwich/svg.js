
var addCircle = function(s,x,y,r,c) {
    var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c1.setAttribute('cx',x);
    c1.setAttribute('cy',y);
    c1.setAttribute('r',r);
    c1.setAttribute('fill',c);
    s.appendChild(c1);
    
};



var addRect = function(svg,x, y, width, height, fill){
    var r1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
    r1.setAttribute('x',x)
    r1.setAttribute('y',y)
    r1.setAttribute('width',width)
    r1.setAttribute('height',height)
    r1.setAttribute('fill',fill)
    r1.addEventListener('click', clicked)
    svg.appendChild(r1)
}

/*$('.svg').click(function(e){
    e.preventDefault();
        if (e.toElement!=this) {return;}
        console.log("clicked");
        s = document.getElementsByClassName("svg");
        var x = Math.floor(Math.random() * 400)
        var y = Math.floor(Math.random() * 400)
        addRect(s,x,y,20,40,'red');
});*/
var color='Red';
var size='Small';
var shape='Rectangle';
$(document).ready(function(){ 
    $('#DD1').change(function(){
        color = $('#DD1').val();
        console.log(color)
    });
    $('#DD2').change(function(){
        size=$('#DD2').val()
        console.log(size)
    })
    $('#DD3').change(function(){
        shape= $('#DD3').val();
        console.log(shape)
    });

});

var clicked = function(e) {
    var c =color
    if (size=='Small'){
        var height=25;
        var width=15;
        var r = 10;
    }
        else if(size=='Medium'){
            var height=60;
            var width=30;
            var r =20;
        }
            else{
                var height=90;
                var width=45;
                var r = 30;
            }
    console.log(height)
    console.log(width)
    console.log(r)
    e.preventDefault();
    if (e.toElement!=this) {return;}
    s = document.getElementById('svg');
    if(shape=='Rectangle'){
        addRect(s,e.offsetX,e.offsetY,width,height,c);
    }
        else if(shape=='Circle'){
            addCircle(s,e.offsetX,e.offsetY,r,c)
        }
};



var svg = document.getElementById('svg');
svg.addEventListener('click', clicked);
