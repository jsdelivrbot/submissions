APP.setConsts({
    K_UP : "W",
    K_DOWN : "S",
    K_LEFT : "A",
    K_RIGHT : "D"
});

// These will be set to true if the corresponding input is pressed
APP.setConsts({
    I_UP : false,
    I_DOWN : false,
    I_LEFT : false,
    I_RIGHT : false
});


var keyDown = function(event) {
    var key = String.fromCharCode(event.keyCode);
    if (key == APP.K_UP)    APP.I_UP = true;
    if (key == APP.K_DOWN)  APP.I_DOWN = true;
    if (key == APP.K_LEFT)  APP.I_LEFT = true;
    if (key == APP.K_RIGHT) APP.I_RIGHT = true;
}

var keyUp = function(event) {
    var key = String.fromCharCode(event.keyCode);
    if (key == APP.K_UP)    APP.I_UP = false;
    if (key == APP.K_DOWN)  APP.I_DOWN = false;
    if (key == APP.K_LEFT)  APP.I_LEFT = false;
    if (key == APP.K_RIGHT) APP.I_RIGHT = false;
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
