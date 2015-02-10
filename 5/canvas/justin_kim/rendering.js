APP.setConsts({
    canvas : document.createElement("canvas"),
    CANVAS_WIDTH : 640,
    CANVAS_HEIGHT : 380,

    // Colors
    C_BACKGROUND : "rgb(100, 120, 100)",
    C_PLAYER : "rgb(0, 0, 0)",

    player_x : 100,
    player_y : 100,
    player_radius : 20
});

var setup = function() {
    APP.setConsts({
        ctx : APP.canvas.getContext("2d"),
    });

    APP.canvas.height = APP.CANVAS_HEIGHT;
    APP.canvas.width = APP.CANVAS_WIDTH;

    document.getElementById("game").appendChild(APP.canvas);

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
}

var step = function() {
    if (APP.running) {
        window.requestAnimationFrame(step);
    }
    tick();
    draw();
}

// Update the state of the world according to user input
var tick = function() {
    if (APP.I_UP) APP.player_y -= 4;
    if (APP.I_DOWN) APP.player_y += 4;
    if (APP.I_LEFT) APP.player_x -= 4;
    if (APP.I_RIGHT) APP.player_x += 4;
}

// Draw the world to the canvas
var draw = function() {
    // Clear screen
    APP.ctx.fillStyle = APP.C_BACKGROUND;
    APP.ctx.fillRect(0, 0, APP.CANVAS_WIDTH, APP.CANVAS_HEIGHT);

    // Draw player
    APP.ctx.fillStyle = APP.C_PLAYER;
    APP.ctx.beginPath();
    APP.ctx.arc(APP.player_x, APP.player_y, APP.player_radius, 0, 2 * Math.PI);
    APP.ctx.closePath();
    APP.ctx.fill();
}

setup();
window.requestAnimationFrame(step);
