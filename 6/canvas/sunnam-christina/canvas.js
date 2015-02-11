<script>
var context;
var x=100;
var y=200;
var dx=5;
var dy=5;

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function init()
{
  context= myCanvas.getContext('2d');
  setInterval(draw,10);
}

function draw()
{
  context.clearRect(0,0, 500,500);
  context.beginPath();
  context.fillStyle=getRandomColor();
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
if( x<0 || x>500) dx=-dx; 
if( y<0 || y>500) dy=-dy; 
x+=dx; 
y+=dy;
}

</script>
<body onLoad="init();">
  <canvas id="myCanvas" width="500" height="500" >
  </canvas>
</body>

