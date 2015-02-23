var game = document.getElementById("game");

var makeCircle = function makeCircle(x, y, r, stroke, fill) {
    var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r",  r);
    circle.setAttribute("stroke", stroke);
    circle.setAttribute("fill", fill);
    return circle;
}

var circle = makeCircle((game.getAttribute("width") / 2), (game.getAttribute("height") / 2), 10, "rgb(0, 0, 0)", "rgb(255, 255, 255)");
var circle_list = [circle];

var updateBG = function updateBG() {
    for (var index = 0; index < circle_list.length; index++) {
        var radius = circle_list[index].getAttribute("r")
        circle_list[index].getAttribute("r") = (radius + 1) % Math.floor(Math.sqrt(game.getAttribute("width") * game.getAttribute("width") + game.getAttribute("height") * game.getAttribute("height")) / 2); // half the diagonal
    }
}

game.appendChild(circle);
while (true) {
    updateBG();
}
