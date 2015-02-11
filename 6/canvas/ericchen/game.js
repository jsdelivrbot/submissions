var canvas = document.getElementById("doodle_jump");
var context = canvas.getContext("2d");

var game = {

    WIN_HEIGHT: 500,
    WIN_WIDTH: 300,

    // Game Constants
    GRAVITY: -.3,
    PLATFORM_WIDTH: 50,
    PLATFORM_HEIGHT: 15,
    PLATFORM_COLOR: "#ff0000",

    PLAYER_COLOR: "#000000",
    MAX_SPEED: 6,
    PLAYER_JUMP: -6
};
