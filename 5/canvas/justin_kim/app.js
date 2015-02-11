var APP = {
    wombocombo : 2,
    obstacles : [],
}

APP.setConsts = function(C) {
    for (var a in C) {
        if (C.hasOwnProperty(a) && !(a in APP)) {
            APP[a] = C[a];
        }
    }
}

APP.setup = function() {
    document.getElementById("app").appendChild(APP.canvas);
    APP.player = APP.Doodah.newPlayer(100, 100);
    APP.obstacles.push(APP.Doodah.newObstacle(50, 50));
}

APP.run = function() {
    window.requestAnimationFrame(APP.run);

    if (APP.I_UP) APP.player.y -= 4;
    if (APP.I_DOWN) APP.player.y += 4;
    if (APP.I_LEFT) APP.player.x -= 4;
    if (APP.I_RIGHT) APP.player.x += 4;

    // Assumes we never collide with more than one obstacle at a time
    for (var i = 0; i < APP.obstacles.length; i++) {
        if (APP.Doodah.collides(APP.player, APP.obstacles[i])) {
            APP.player.x = APP.player.lastpos[0];
            APP.player.y = APP.player.lastpos[1];
            break;
        }
    }

    APP.player.lastpos = [APP.player.x, APP.player.y];

    APP.Rendering.draw();
}
