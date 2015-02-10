app.set({
	up : "W",
	down : "S",
	left : "A",
	right : "D"
});

app.set({
	isUp : false,
	isDown : false,
        isLeft : false,
        isRight : false
});

var pressDown = function(event) {
    var k = String.fromCharCode(event.keyCode);
    if (k == app.up)
	app.isUp = false;
    if (k == app.down)
	app.isDown = false;
    if (k == app.left)
	app.isLeft = false;
    if (k == app.right)
	app.isRight = false;
}

var pressUp = function(event) {
    var k = String.fromCharCode(event.keyCode);
    if (k == app.up)
	app.isUp = false;
    if (k == app.down)
	app.isDown = false;
    if (k == app.left)
        app.isLeft = false;
    if (k == app.right)
        app.isRight = false;
}
