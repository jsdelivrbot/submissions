app.set({
	canvas: document.createElement("canvas"),
	canvasW : 720,
	canvasH : 640,
	c_background : "rgb(0, 0, 0)",
	c_dot : "rgb(255, 255, 255)",
	x_cor : 360,
	y_cor : 320,
	dot_rad : 20
});

var setup = function() {
    app.set({
        ctx : app.canvas.getContext("2d"),
    });
    app.canvas.height = canvasH;
    app.canvas.width = canvasW;
    document.getElementById("dotmaze").appendChild(app.canvas);
    document.addEventListener("pressDown", keyDown);
    document.addEventListener("pressUp", keyUp);
}

var step = function() {
    if (app.running) {
	window.requestAnimationFrame(step);
    }
    updateCoords();
    draw();
}

var updateCoords = function() {
    if (app.isUp)
	app.y_cor = app.y_cor - 1;
    if (app.isDown)
	app.y_cor = app.y_cor + 1;
    if (app.isLeft)
	app.x_cor = app.x_cor - 1;
    if (app.isUp)
	app.x_cor = app.x_cor + 1;
}

var draw = function() {
    app.ctx.fillStyle = app.c_background;
    app.ctx.fillRect(0, 0, app.canvasW, app.canvasH);
    app.ctx.fillStyle = app.c_dot;
    app.ctx.beginPath();
    app.ctx.arc(app.x_cor, app.y_cor, app.dot_rad, 0, 2 * Math.PI);
    app.ctx.closePath();
    app.ctx.fill();
}

setup();
window.requestAnimationFrame(step);