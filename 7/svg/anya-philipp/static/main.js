var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (var i = 0; i < people.length; i++) {
        people[i].move();
        people[i].checkForInfections();
    }

    for (var i = 0; i < gridRectangles.length; i++) {
        gridRectangles[i].draw(); 
    }

    for (var i = 0; i < people.length; i++) {
        people[i].draw();
    }

    vaccine_button.refill();
    vaccine_button.draw();

    cure_button.refill();
    cure_button.draw();


    if (action_circle)
        action_circle.draw();

    //for (var i = 0; i < gridIntersections.length; i++) {
    //    gridIntersections[i].draw(); 
    //}

    window.requestAnimationFrame(update);
}

var startGame  = function(e) {
    var grid = generateGrid();
    gridIntersections = grid[0];
    gridRectangles = grid[1];
    spawnPeople();
    createVaccineButton();
    createCureButton();
    window.requestAnimationFrame(update);
}

var mouseMoved = function(e) {
    var mousePos = getMousePos(c, e);
    var x = mousePos.x;
    var y = mousePos.y;

    if (vaccine_button)
        vaccine_button.checkHover(x, y);

    if (cure_button)
        cure_button.checkHover(x, y);

    makeMouseSelector();

    if (vaccine_button && vaccine_button.hover || cure_button && cure_button.hover)
        makeMousePointer();

    if (selected_button_string != "") {
        if (mouseInGameArea(x, y)) {
            var radius, stroke_color, fill_color;

            if (selected_button_string == "vaccine") {
                radius = VACCINE_RADIUS;
                stroke_color = VACCINE_CIRCLE_STROKE;
                fill_color = VACCINE_CIRCLE_FILL;
            }

            else if (selected_button_string == "cure") {
                radius = CURE_RADIUS;
                stroke_color = CURE_CIRCLE_STROKE
                fill_color = CURE_CIRCLE_FILL;
            }

            if (!action_circle) {
                action_circle = makeCircle(x, y, radius, stroke_color, fill_color, ctx);
            }
            else {
                action_circle.x = x;
                action_circle.y = y;
                action_circle.stroke_color = stroke_color;
                action_circle.fill_color = fill_color;
            }
            

            makeMousePointer();
        }
        else
            action_circle = false;
    }
}

var mouseInGameArea = function(x, y) {
    return x >= 0 && x <= GAME_WIDTH && y >= 0 && y <= GAME_HEIGHT;
}

var mouseClicked = function(e) {
    e.preventDefault();
    var mousePos = getMousePos(c, e);
    var x = mousePos.x;
    var y = mousePos.y;

    buttons = [vaccine_button, cure_button];
    if (! mouseInGameArea(x, y)) {
        // Loop over the two buttons.
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.selected = false;
            // If hovering over this button
            if (button.mouseOver(x, y) && button.canUse()) {
                // If that button isn't selected, select
                if (selected_button_string !== button.name) {
                    selected_button_string = button.name;
                    selected_button = button;
                    button.selected = true;
                }
                // If button is selected, de-selected
                else {
                    selected_button_string = "";
                    selected_button = null;
                    button.selected = false;
                }
            }
        }

    }

    if (selected_button_string != "" && mouseInGameArea(x, y)) {
        var people_in_circle = people.filter(function(person, index, array_obj) {
            if (!this)
                return false;

            return this.isInside(person.x, person.y)
        }, action_circle);

        if (people_in_circle.length > 0) {
            if (selected_button.canUse()) {
                var actually_used = false;
                if (selected_button_string == "vaccine") {
                    for (var p = 0; p < people_in_circle.length; p++) {
                        if (people_in_circle[p].healthStatus == "alive") {
                            people_in_circle[p].healthStatus = "immune";
                            actually_used = true;
                        }
                    }
                }
                else if (selected_button_string == "cure") {
                    for (var p = 0; p < people_in_circle.length; p++) {
                        if (people_in_circle[p].healthStatus == "infected") {
                            people_in_circle[p].healthStatus = "alive";
                            actually_used = true;
                        }
                    }
                }
               
                if (actually_used) {
                    selected_button.useOnce();
                    if (!selected_button.canUse()) {
                        selected_button.selected = false;
                        selected_button_string = "";
                        selected_button = null;
                        action_circle = null;
                    }
                }
            }
        }
    }
}


// Thanks to http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var makeMousePointer = function() {
    c.className = "mouse-pointer";
}

var makeMouseSelector = function() {
    if (c.className != "")
        c.className = "";
}

var squared = function(n) {
    return Math.pow(n, 2);
}

var resetGame = function(e) {
    location.reload();
}

Number.prototype.cap = function(cap) {
  return Math.min(this, cap);
};

var people = [];
var gridIntersections = [];
var gridRectangles = [];

var vaccine_button, cure_button, selected_button;
var selected_button_string = "";

var action_circle;

var c = document.getElementById("game-canvas");
c.width = CANVAS_WIDTH;
c.height = CANVAS_HEIGHT;
var ctx = c.getContext("2d");

c.addEventListener("mousemove", mouseMoved);
c.addEventListener("mousedown", mouseClicked);

var start = document.getElementById("start-button");
start.addEventListener("click", startGame);

var reset = document.getElementById("reset-button");
reset.addEventListener("click", resetGame);
