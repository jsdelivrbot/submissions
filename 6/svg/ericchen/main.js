game.platformHandler.makePlatform(150, 400, game.PLATFORM_WIDTH, game.PLATFORM_HEIGHT, 1);
var run = function() {
    context.fillStyle = "#ffffff";
    context.fillRect(0,0,300,500);

    game.platformHandler.draw();
    game.player.update();
    game.player.draw();

    window.requestAnimationFrame(run);
}

var clicked = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var w = game.PLATFORM_WIDTH;
    var h = game.PLATFORM_HEIGHT;

    game.platformHandler.makePlatform(x, y, game.PLATFORM_WIDTH, game.PLATFORM_HEIGHT, 1);
};

canvas.addEventListener("click",clicked);
run();
