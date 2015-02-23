var s = document.getElementById("s");
var score = 0;
var game = 0;
var hscore = 0;

var addRock = function(s, x, y, vx, vy, r, c) { // vx and vy are velocities
    var rock = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rock.setAttribute("cx", x);
    rock.setAttribute("cy", y);
    rock.setAttribute("vx", vx);
    rock.setAttribute("vy", vy);
    rock.setAttribute("r", r);
    rock.setAttribute("fill", c);
    s.appendChild(rock);
}

var collision = function(c) {
    var rect = document.getElementsByTagName("rect");
    var x = parseFloat(c.getAttribute('cx'));
    var y = parseFloat(c.getAttribute('cy'));
    var sx = parseFloat(rect[0].getAttribute("x"));
    var w = parseFloat(rect[0].getAttribute("width"));
    var r = parseFloat(c.getAttribute("r"));
    if ((x + r <= sx + w && x + r >= sx) ||
	(x >= sx && x <= sx + w)) {
	if (y + r >= 550) {
	    clearInterval(t);
	    var cs = document.getElementsByTagName("circle");
	    for (var i = 1;i < cs.length;i++) {
		cs[i].remove();
	    }
	    if (score > hscore) {
		hscore = score;
		document.getElementById("high").innerText = "High Score: " + hscore;
	    }
	    document.getElementById("gg").innerText = "GAME OVER! Hit start to play again.";
	    game = 0;
	}
    }
}

var update = function() {
    if (game == 1) {
	var cs = document.getElementsByTagName("circle");
	for (var i = 1;i < cs.length;i++) {
	    var x = parseFloat(cs[i].getAttribute('cx'));
	    var y = parseFloat(cs[i].getAttribute('cy'));
	    var r = parseFloat(cs[i].getAttribute('r'));
	    var vx = parseFloat(cs[i].getAttribute('vx'));
	    var vy = parseFloat(cs[i].getAttribute('vy'));
	    if (vx > vy) {
		vy = vx;
		cs[i].setAttribute('vy',vy);
	    }
	    if (x + r >= 500 || x - r <= 0) {
		vx = vx * -1;
		cs[i].setAttribute('vx',vx);
	    }
	    x = x + vx;
	    if (y - r >= 600) {
		cs[i].remove();
	    } else {
		y = y + vy;
		cs[i].setAttribute('cx',x);
		cs[i].setAttribute('cy',y);
		// Collision check
		collision(cs[i]);
	    }
	};
	window.requestAnimationFrame(update);
	score++;
	document.getElementById("score").innerText = "Score: " + score;
    } 
}

var t;
var start = function() {
    document.getElementById("gg").innerText = "";
    game = 1;
    score = 0;
    t = setInterval(function() {addRock(s, Math.random() * 500, 0, (Math.random() + (score / 100)) * (1 - Math.random() * 2), Math.random() * 10 + (score / (100 + score * 0.5)), Math.random() * 25 + 25 + (score / (100 + score * 0.5)), "#000000")}, 1000);
    window.requestAnimationFrame(update);
}

var button = document.getElementById("start");
button.addEventListener("click", start);
document.addEventListener("keydown", function(e) {
    var dx = 0;
    if (e.keyCode == 65 || e.keyCode == 37) {
	dx = -25;
    } else if (e.keyCode == 68 || e.keyCode == 39) {
	dx = 25;
    }
    var cs = document.getElementsByTagName("circle");
    var rect = document.getElementsByTagName("rect");
    var x1 = parseFloat(cs[0].getAttribute('cx'));
    var x2 = parseFloat(rect[0].getAttribute("x"));
    if ((x2 >= Math.abs(dx) || dx > 0) && (x2 + 100 <= 500 - Math.abs(dx) || dx < 0)) {
	x1 = x1 + dx;
	x2 = x2 + dx;
    }
    cs[0].setAttribute('cx',x1);
    rect[0].setAttribute("x",x2);
});
