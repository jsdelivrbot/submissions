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
for (var count = 0; count < 4; count++) {
    var circle = makeBGCircle(count * radius / 4, "rgb(0, 0, 0)");
    circle_list.push(circle);
    game.appendChild(circle);
}
console.log(circle_list);

var keypressCallback = function(e) {
    for (var index = 0; index < circle_list.length; index++) {
        circle = circle_list[index];
        var x = parseInt(circle.getAttribute("cx"));
        var y = parseInt(circle.getAttribute("cy"));
        if (
            (Math.abs((height / 2) - x) < 10)) {
            x += 1;
        }
        else if (true) {
            x -= 1;
        }
        else if (true) {
            y += 1;
        }
        else if (true) {
            y -= 1;
        }
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
    }
}

var updateCircles = function() {
    for (var index = 0; index < circle_list.length; index++) {
        circle = circle_list[index];
        var smallrad = parseInt(circle.getAttribute("r"));
        circle.setAttribute("r", (smallrad + 2) % radius);

    }
}

var time = 0;
var updateBG = function updateBG() {
    if (time == 0) {
        time = setInterval(updateCircles() , 10);
    }
    else {
        clearInterval(time);
        time = 0;
    }
}

game.addEventListener("click", updateBG);
game.addEventListener("keypress", keypressCallback);
