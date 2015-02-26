var game = document.getElementById("game");
var height = game.getAttribute("height");
var width = game.getAttribute("width");
var radius = Math.floor(Math.sqrt(width * width + height * height) / 2); // half the diagonal

var makeBGCircle = function makeBGCircle(r, stroke) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute("cx", width / 2);
    circle.setAttribute("cy", height / 2);
    circle.setAttribute("r",  r);
    circle.setAttribute("stroke", stroke);
    circle.setAttribute("fill", "none");
    return circle;
}

var circle_list = []; 
var circles_onscreen = 4;
for (var count = 0; count < 2 * circles_onscreen; count++) {
    var circle = makeBGCircle(count * radius / circles_onscreen, "rgb(0, 0, 0)");
    circle_list.push(circle);
    game.appendChild(circle);
}

var movement = [false, false, false, false];
//0 = right, 1 = left, 2 = up, 3 = down
var keydownCallback = function(e) {
    if (e.keyCode == 87) movement[2] = true; //w
    if (e.keyCode == 83) movement[3] = true; //s
    if (e.keyCode == 65) movement[1] = true; //a
    if (e.keyCode == 68) movement[0] = true; //d
}

var keyupCallback = function(e) {
    if (e.keyCode == 87) movement[2] = false; //w
    if (e.keyCode == 83) movement[3] = false; //s
    if (e.keyCode == 65) movement[1] = false; //a
    if (e.keyCode == 68) movement[0] = false; //d
}

var updateCircles = function() {
    for (var index = 0; index < circle_list.length; index++) {
        circle = circle_list[index];
        var smallrad = parseInt(circle.getAttribute("r"));
        var x = parseInt(circle.getAttribute("cx"));
        var y = parseInt(circle.getAttribute("cy"));

        var dmax = (radius / 4) + ((smallrad - radius) / radius) * (radius / 4);
        var dmin = 0 - dmax;
        var dx = x - width / 2;
        var dy = y - height / 2;
        var d = smallrad / 100;

        if (movement[0] ||
            movement[1] ||
            movement[2] ||
            movement[3]) {
            if (movement[0] && dx - d > dmin) x -= d;
            if (movement[1] && dx + d < dmax) x += d;
            if (movement[2] && dy - d < dmax) y += d;
            if (movement[3] && dy + d > dmin) y -= d;
        }
        else {
            if (dx - d > 0) x -= d;
            if (dx + d < 0) x += d;
            if (dy + d < 0) y += d;
            if (dy - d > 0) y -= d;
        }

        var shade = 25 * (smallrad / radius);

        smallrad = (smallrad + 1) % (2 * radius);

        circle.setAttribute("r", smallrad);
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("stroke-width", shade);
    }
}

var time = 0;
var updateBG = function updateBG() {
    if (time == 0) {
        time = setInterval(updateCircles, 10);
    }
    else {
        clearInterval(time);
        time = 0;
    }
}

updateBG();
window.addEventListener("keydown", keydownCallback);
window.addEventListener("keyup", keyupCallback);
