var c = document.getElementById("c");
var ctx = c.getContext("2d");;
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
var clicked = function(e){
    e.preventDefault();
    ctx.beginPath();
    ctx.arc(e.offsetX,e.offsetY,15,0,2*Math.PI,false);
    ctx.fillStyle=getRandomColor();
    ctx.stroke();
    ctx.fill();

}; 

var clear = function(e){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    //ctx.beginPath();
};
c.addEventListener("click",clicked,false);
var b = document.getElementById("b");
b.addEventListener("click",clear);
