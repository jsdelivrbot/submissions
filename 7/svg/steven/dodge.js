var addRock = function(s, x, y, vx, vy, r, c) { // vx and vy are velocities
    var rock = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rock.setAttribute("cx", x);
    rock.setAttribute("cy", y);
    rock.setAttribute("r", r);
    rock.setAttribute("fill", c);
    rock.setAttribute("id", i);
    s.appendChild(rock);
}

var start = function(e) {
    e.preventDefault();
    var t = setInterval(addRock(stuff), 1000);
}
