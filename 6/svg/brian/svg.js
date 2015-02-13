var sec = document.getElementById("seconds");

var moveSec = function(){
    var x = sec.getAttribute("x2")-200;
    var y = 200-sec.getAttribute("y2");
    var theta = Math.atan(y/x);
    console.log(theta);
    
};
