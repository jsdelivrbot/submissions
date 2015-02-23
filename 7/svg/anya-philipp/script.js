var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 600;

var FULL_TOOLBAR_HEIGHT = 100;
var FULL_TOOLBAR_WIDTH = CANVAS_WIDTH;

var TOOLBAR_PADDING_VERTICAL = 10;
var TOOLBAR_PADDING_HORIZ = 10;

var TOOLBAR_WIDTH = FULL_TOOLBAR_WIDTH - 2 * TOOLBAR_PADDING_HORIZ;
var TOOLBAR_HEIGHT = FULL_TOOLBAR_HEIGHT - 2 * TOOLBAR_PADDING_VERTICAL;
var TOOLBAR_Y = CANVAS_HEIGHT - TOOLBAR_HEIGHT;

var GAME_WIDTH = CANVAS_WIDTH;
var GAME_HEIGHT = CANVAS_HEIGHT - FULL_TOOLBAR_HEIGHT;

var STREET_SIZE = 20
var SPACE_BETWEEN_STREETS = 80
var BLOCK_SIZE = STREET_SIZE + SPACE_BETWEEN_STREETS;

var STREET_COLOR = "#000000";

var TURN_PROBABILITY = 0.15;
var PERSON_SIZE = (3 / 4) * STREET_SIZE;
var PERSON_SPEED = 1;
var INITIAL_INFECTION_PROBABILITY = 0.10;

var VACCINE_REGENERATION = 10;
var MAX_VACCINE_LEVEL = 100;
var VACCINE_COST = 100;
var VACCINE_COLOR = "rgb(200, 0, 200)";
var VACCINE_HOVER_COLOR = "rgb(255, 180, 255)";
var VACCINE_SVG = "images/vaccine.svg";
var VACCINE_RADIUS = STREET_SIZE * 1.5;
var VACCINE_CIRCLE_STROKE = "rgb(200, 0, 200)";
var VACCINE_CIRCLE_FILL = "rgb(255, 180, 255)";

var CURE_REGENERATION = 5;
var MAX_CURE_LEVEL = 100;
var CURE_COST = 100;
var CURE_COLOR = "rgb(50, 200, 50)";
var CURE_HOVER_COLOR = "rgb(170, 255, 170)";
var CURE_SVG = "images/cure.svg";
var CURE_RADIUS = STREET_SIZE * 1.5;
var CURE_CIRCLE_STROKE = "rgb(50, 200, 50)";
var CURE_CIRCLE_FILL = "rgb(170, 255, 170)";

// Fraction of toolbar dimensions
var BUTTON_WIDTH = 0.20;
var BUTTON_HEIGHT = 1.0;

// Fraction of button dimensions
var BUTTON_PADDING = 0.05;

// In pixels, not fraction
var DISTANCE_BETWEEN_BUTTONS = 10;
var BUTTON_TEXT_HEIGHT = 20;

var ACTION_BUTTON_ALPHA = 0.65;

var makePerson = function(x,y,w,h,dx,dy, healthStatus, people, ctx) {
    return {
        x : x,
          y : y,
          w : w,
          h : h,
          ctx : ctx,
          dx : dx,
          dy : dy,
          healthStatus : healthStatus,
          people : people,
          just_turned : false,
          color : "#ff0000",

          draw : function() {
              if (this.healthStatus == "alive")
                  this.color = "#00ff00";
              else if (this.healthStatus == "infected")
                  this.color = "#ff0000";
              else if (this.healthStatus == "immune")
                    this.color = "rgb(50, 100, 250)";

              ctx.fillStyle = this.color;
              ctx.fillRect(this.x,this.y,this.w,this.h);
          },

          // IF we find ourselves in intersection:
          // There's a TURN_PROBABILITY chance of going left, and the same probability of going right
          move : function() {
              if (!this.just_turned && this.isOnIntersection()) {
                  var rand = Math.random();
                  //Turn right
                  if (rand < TURN_PROBABILITY){
                      if (this.dx == PERSON_SPEED){
                          this.dx = 0;
                          this.dy = -1 * PERSON_SPEED;
                      }		
                      else if (this.dx == -1 * PERSON_SPEED){
                          this.dx = 0;
                          this.dy = PERSON_SPEED;
                      }
                      else if (this.dy == PERSON_SPEED){
                          this.dy = 0;
                          this.dx = PERSON_SPEED;
                      }
                      else if (this.dy == -1 * PERSON_SPEED){
                          this.dy = 0;
                          this.dx = -1 * PERSON_SPEED;
                      }
                  }	
                  //Turn Left
                  else if (rand < 2 * TURN_PROBABILITY){
                      if (this.dx == PERSON_SPEED){
                          this.dx = 0;
                          this.dy = PERSON_SPEED;
                      }		
                      else if (this.dx == -1 * PERSON_SPEED){
                          this.dx = 0;
                          this.dy = -1 * PERSON_SPEED;
                      }
                      else if (this.dy == PERSON_SPEED){
                          this.dy = 0;
                          this.dx = -1 * PERSON_SPEED;
                      }
                      else if (this.dy == -1 * PERSON_SPEED){
                          this.dy = 0;
                          this.dx = PERSON_SPEED;
                      }
                  }
                  this.just_turned = true;
                  if (this.dy != 0)
                      this.fixHorizPositioning();
                  else if (this.dx != 0)
                      this.fixVerticalPositioning();
              }
              else {
                  this.just_turned = false;
              }

              // If taking a step would run us into a wall, turn around

              this.x = this.x + this.dx;
              this.y = this.y + this.dy;

              if (this.x <= 0 || (this.x + PERSON_SIZE) >= GAME_WIDTH)
                  this.dx = this.dx * -1;
              if (this.y <= 0 || (this.y + PERSON_SIZE) >= GAME_HEIGHT)
                  this.dy = this.dy * -1;
          },

            // When a person turns they're usually misaligned with the street
            fixHorizPositioning: function() {
                // "vertical_street" is the vertical street we're probably on
                // "current_street" is used for iteration
                var vertical_street, current_street;

                // Compare positions for every street
                for (i = 0; i < gridRectangles.length; i++) {
                    current_street = gridRectangles[i];

                    if (current_street.orientation == "vertical") {
                        if (Math.abs(current_street.x - this.x) < STREET_SIZE) {
                            vertical_street = current_street;
                            break;
                        }
                    }
                }

                if (vertical_street)
                    this.x = (vertical_street.x + STREET_SIZE / 2) - PERSON_SIZE / 2;
            },
            //
            // When a person turns they're usually misaligned with the street
            fixVerticalPositioning: function() {
                // "horiz_street" is the horiz street we're probably on
                // "current_street" is used for iteration
                var horiz_street, current_street;

                // Compare positions for every street
                for (i = 0; i < gridRectangles.length; i++) {
                    current_street = gridRectangles[i];

                    if (current_street.orientation == "horizontal") {
                        if (Math.abs(current_street.y - this.y) < STREET_SIZE) {
                            horiz_street = current_street;
                            break;
                        }
                    }
                }

                if (horiz_street)
                    this.y = (horiz_street.y + STREET_SIZE / 2) - PERSON_SIZE / 2;
            },

          isOnPerson : function(person) {
              return (this.x == person.x && this.y == person.y);
          },

          checkForInfections : function(people) {
              if (this.healthStatus == "infected") {
                  for (var i = 0; i < this.people.length; i++) {
                      if (this.people[i].healthStatus != "immune" && this.people[i].healthStatus != "dead") {
                          if ((this.x >= this.people[i].x && this.x <= (this.people[i].x + this.people[i].w) && this.y >= this.people[i].y && this.y <= (this.people[i].y + this.people[i].h))
                                  || ((this.people[i].x >= this.x && this.people[i].x <= (this.x + this.w) && this.people[i].y >= this.y && this.people[i].y <= (this.y + this.h))))
                              this.people[i].healthStatus = "infected";
                      }
                  }
              }
              return this.people;
          },
          // This function returns a function.
          // Every time we're checking intersections we call this function,
          // and it returns a function suitable for our direction.
          // The function that it returns takes an intersection as parameter
          // and tells us if we're on it.
          // We check three things: If we're not yet through the intersection's
          // middle, if we'll be through the middle after movement, and if
          // we're approximately on the same level
          generateIntersectionFunction : function(person) {
              var intersectionFunction;

              // Moving right
              if (person.dx > 0 && person.dy == 0) {
                  intersectionFunction = function(intersection) {
                      return person.x < intersection.x && 
                          person.x + person.dx >= intersection.x &&
                          Math.abs(person.y - intersection.y) < STREET_SIZE;
                  };
              }
              // Moving left
              else if (person.dx < 0 && person.dy == 0) {
                  intersectionFunction = function(intersection) {
                      return person.x > intersection.x && 
                          person.x + person.dx <= intersection.x &&
                          Math.abs(person.y - intersection.y) < STREET_SIZE;
                  };
              }
              // Moving up
              else if (person.dx == 0 && person.dy < 0) {
                  intersectionFunction = function(intersection) {
                      return person.y > intersection.y && 
                          person.y + person.dy <= intersection.y &&
                          Math.abs(person.x - intersection.x) < STREET_SIZE;
                  };
              }
              // Moving down
              else if (person.dx == 0&& person.dy > 0) {
                  intersectionFunction = function(intersection) {
                      return person.y < intersection.y && 
                          person.y + person.dy >= intersection.y &&
                          Math.abs(person.x - intersection.x) < STREET_SIZE;
                  };
              }
              return intersectionFunction;
          },

          // People can't just turn when they *intersect* with an intersection.
          // They need to be *on* the intersection.
          // It might so happen that we set up movement in a way that a person is never exactly on 
          // an intersection
          // But a good measure is if they're about to cross its middle.
          // If the next step would take this person across the intersection's center,
          // the person is on the intersection
          isOnIntersection : function() {
              // Generate an intersection function that is made just for our
              // specific dy and dx
              var doesIntersect = this.generateIntersectionFunction(this);
              for (var i = 0; i < gridIntersections.length; i++) {
                  if (doesIntersect(gridIntersections[i]))
                      return true;
              }
              return false;
          }
    };
};

// A street, which is essentially a rectangle, and can be either horizontal or vertical
var makeStreet = function(ctx, orientation, size, x, y, color) {
    return {
        ctx : ctx,
            orientation : orientation,
            size : size,
            x : x,
            y : y,
            color : color,

            draw : function() {
                ctx.fillStyle = this.color;
                if (orientation == "vertical")
                    ctx.fillRect(this.x, this.y, this.size, GAME_HEIGHT);
                else if (orientation == "horizontal") {
                    ctx.fillRect(this.x, this.y, GAME_WIDTH, this.size);
                }
            }
    };
};

// The intersection made by two streets
// Whenever a person enters an intersection, there is a TURN_PROBABILITY chance he'll
// turn left, and an equal chance he'll turn right.
var makeIntersection = function(x, y, width, height) {
    return {
        x : x,
          y : y,
          width : width,
          height : height,
          draw : function() {
              ctx.fillStyle = "#0000ff";
              ctx.fillRect(this.x, this.y, this.width, this.height);
          }
    }
}

var makeToolButton = function(name, x, y, width, height, initial_level, color, hover_color, logo_url, ctx) {
    return {
        name : name,
        x : x,
        y : y,
        width : width,
        full_height : height,
        button_height : height * 0.8,
        bar_height : height * 0.2,
        level : initial_level,
        max_level : initial_level,
        color : color,
        hover_color : hover_color,
        hover : false,
        selected : false,
        logo_url : logo_url,
        logo : null,
        logo_loaded : false,
        ctx : ctx,

        logoLoaded : function(button_reference) {
            button_reference.logo_loaded = true;
        },

        drawButton : function() {
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = 1;
            
            this.ctx.fillStyle = "#ffffff";
            if (this.hover || this.selected)
                this.ctx.fillStyle = this.hover_color;

            if (this.selected) {
                this.ctx.shadowColor = this.color;
                this.ctx.shadowBlur = 100;
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
            }

            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.width, this.button_height);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.shadowBlur = 0;
            this.ctx.shadowColor = "white";

            this.drawLogo();
            this.drawText();
        },

        drawLogo : function() {
            if (this.logo_loaded) {
                var logo_width = 0.3 * this.width;
                var logo_height = logo_width * (this.logo.height / this.logo.width);

                var logo_left_corner = this.x + BUTTON_PADDING * this.width;
                var logo_top_corner = this.y + BUTTON_PADDING * this.button_height;

                this.ctx.drawImage(this.logo, logo_left_corner, logo_top_corner, logo_width, logo_height);
            }
        },

        drawText : function() {
            var text_left_corner = this.x + 0.3 * this.width + this.width * 0.1;

            var button_top_corner = this.y + BUTTON_PADDING * this.button_height;
            var vertical_space_available = (this.button_height - 2 * BUTTON_PADDING);
            var text_bisector = button_top_corner + vertical_space_available / 2;
            // Just makes it look better
            text_bisector += 4;

            var text_max_width = 0.7 * (this.width - 2 * BUTTON_PADDING);

            this.ctx.fillStyle = "#000000";
            this.ctx.font = BUTTON_TEXT_HEIGHT + "px Arial";
            this.ctx.fillText(this.name, text_left_corner, text_bisector, text_max_width);
        },

        drawBar : function() {
            var bar_left_corner = this.x;
            var bar_top_corner = this.y + this.button_height;
            
            // Draw bar outline
            this.ctx.strokeStyle = this.color;
            this.ctx.strokeRect(bar_left_corner, bar_top_corner, this.width, this.bar_height);

            var bar_width = this.width * (this.level / this.max_level);

            this.ctx.strokeStyle = this.color;
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.rect(bar_left_corner, bar_top_corner, bar_width, this.bar_height);
            this.ctx.stroke();
            this.ctx.fill();
        },

        loadLogoIfNecessary : function() {
            if (this.logo == null) {
                this.logo = new Image();
                var button_reference = this;
                this.logo.onload = function() { button_reference.logoLoaded(button_reference) };
                this.logo.src = this.logo_url;
            }
        },

        mouseOver : function(x, y) {
            var right_x = this.x + this.width;
            var bottom_y = this.y + this.full_height;
            return x >= this.x && x <= right_x && y >= this.y && y <= bottom_y;
        }, 

        checkHover : function(x, y) {
            this.hover = this.mouseOver(x, y);
        },

        draw : function() {
            this.drawButton();
            this.drawBar();
            this.loadLogoIfNecessary();
        }
    }
}

var makeCircle = function(x, y, radius, stroke_color, fill_color, ctx) {
    return {
        x : x,
        y : y,
        radius : radius,
        stroke_color : stroke_color,
        fill_color : fill_color,
        ctx : ctx,
        
        draw : function() {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.fill_color;
            this.ctx.strokeStyle = this.stroke_color;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = ACTION_BUTTON_ALPHA;

            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        }
    };
}

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

    vaccine_button.draw();
    cure_button.draw();

    if (action_circle)
        action_circle.draw();

    //for (var i = 0; i < gridIntersections.length; i++) {
    //    gridIntersections[i].draw(); 
    //}

    window.requestAnimationFrame(update);
}

var addRandomPerson = function(){
    var x = 100;
    var y = 100;
    var w = 10+Math.random(20);
    var h = 20+Math.random(40);
    people.push(makePerson(x,y,w,h,ctx));

};

var generateGrid = function() {
    var verticalStreets = [];
    var horizontalStreets = [];

    // Used by people to know when to turn
    var intersections = [];

    // Fit as many streets as possible
    var numVerticalStreets = Math.floor(GAME_WIDTH / BLOCK_SIZE);
    var numHorizontalStreets = Math.floor(GAME_HEIGHT / BLOCK_SIZE);

    // Added to vertical streets so that they're centered
    var offsetX = (GAME_WIDTH - numVerticalStreets * BLOCK_SIZE) / 2;

    // Added to horizontal streets so that they're centered
    var offsetY = (GAME_HEIGHT - numHorizontalStreets * BLOCK_SIZE) / 2;

    // Generate vertical streets
    // Each vertical street has some space to its left, then a street, and then some space to its right
    for (var i = 0; i < numVerticalStreets; i++) {
        var leftCornerOfBlock = BLOCK_SIZE * i + offsetX;

        var centerOfStreet = leftCornerOfBlock + (SPACE_BETWEEN_STREETS / 2);
        var leftCornerOfStreet = centerOfStreet - (STREET_SIZE / 2);

        var newStreet = makeStreet(ctx, "vertical", STREET_SIZE, leftCornerOfStreet, 0, STREET_COLOR);
        verticalStreets.push(newStreet);
    }

    // Generate horizontal streets
    // Each horizontal street has some space above, then a street, and then some space below
    for (var i = 0; i < numHorizontalStreets; i++) {
        var topCornerOfBlock = BLOCK_SIZE * i + offsetY;

        var centerOfStreet = topCornerOfBlock+ (SPACE_BETWEEN_STREETS / 2);
        var topCornerOfStreet = centerOfStreet - (STREET_SIZE / 2);

        var newStreet = makeStreet(ctx, "horizontal", STREET_SIZE, 0, topCornerOfStreet, STREET_COLOR);
        horizontalStreets.push(newStreet);
    }

    // For every combination of horizontal & vertical street (that is, for every intersection),
    // Add to `intersections`
    for (var v = 0; v < verticalStreets.length; v++) {
        for (var h = 0; h < horizontalStreets.length; h++) {
            var x_coor = verticalStreets[v].x;
            var y_coor = horizontalStreets[h].y;
            var newIntersection = makeIntersection(x_coor, y_coor, STREET_SIZE, STREET_SIZE);
            intersections.push(newIntersection);
        }
    }

    // Merge arrays
    var allStreets = verticalStreets.concat(horizontalStreets);

    return [intersections, allStreets];
}

var spawnPeople = function() {
    for (var i = 0; i < gridIntersections.length; i++) {
        var intersection = gridIntersections[i];
        var offsetX = (STREET_SIZE - PERSON_SIZE) / 2;
        var offsetY = offsetX;
        var newX = intersection.x + offsetX;
        var newY = intersection.y + offsetY;

        var rand = Math.random();
        var dx = 0;
        var dy = 0;
        if (rand <= 0.25)
            dx = -PERSON_SPEED;
        else if (rand <= 0.50)
            dx = PERSON_SPEED;
        else if (rand <= 0.75)
            dy = -PERSON_SPEED;
        else
            dy = PERSON_SPEED;

        var healthStatus = "alive";
        if (rand < INITIAL_INFECTION_PROBABILITY)
            healthStatus = "infected";

        var newPerson = makePerson(newX, newY, PERSON_SIZE, PERSON_SIZE, dx, dy, healthStatus, people, ctx);
        people.push(newPerson);
    }
}
var createVaccineButton = function() {
    var width = TOOLBAR_WIDTH * BUTTON_WIDTH;
    var right_corner_x = TOOLBAR_WIDTH + TOOLBAR_PADDING_HORIZ;
    var left_corner_x = right_corner_x - width;

    var height = TOOLBAR_HEIGHT * BUTTON_HEIGHT;
    var bisector_y = TOOLBAR_Y + (TOOLBAR_HEIGHT / 2) - TOOLBAR_PADDING_VERTICAL;
    var top_corner_y = bisector_y - height / 2;

    vaccine_button = makeToolButton("Vaccine", left_corner_x, top_corner_y, width, height, MAX_VACCINE_LEVEL, VACCINE_COLOR, VACCINE_HOVER_COLOR, VACCINE_SVG, ctx);
}

var createCureButton = function() {
    var width = TOOLBAR_WIDTH * BUTTON_WIDTH;
    var right_corner_x = vaccine_button.x - DISTANCE_BETWEEN_BUTTONS;
    var left_corner_x = right_corner_x - width;

    var height = TOOLBAR_HEIGHT * BUTTON_HEIGHT;
    var bisector_y = TOOLBAR_Y + (TOOLBAR_HEIGHT / 2) - TOOLBAR_PADDING_VERTICAL;
    var top_corner_y = bisector_y - height / 2;

    cure_button = makeToolButton("Cure", left_corner_x, top_corner_y, width, height, MAX_VACCINE_LEVEL, CURE_COLOR, CURE_HOVER_COLOR, CURE_SVG, ctx);
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
    var x = e.offsetX;
    var y = e.offsetY;
    if (vaccine_button)
        vaccine_button.checkHover(e.offsetX, e.offsetY);

    if (cure_button)
        cure_button.checkHover(e.offsetX, e.offsetY);

    makeMouseSelector();

    if (vaccine_button && vaccine_button.hover || cure_button && cure_button.hover)
        makeMousePointer();

    if (selected_button != "") {
        if (mouseInGameArea(x, y)) {
            var radius, stroke_color, fill_color;

            if (selected_button == "vaccine") {
                radius = VACCINE_RADIUS;
                stroke_color = VACCINE_CIRCLE_STROKE;
                fill_color = VACCINE_CIRCLE_FILL;
            }

            else if (selected_button == "cure") {
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
    var x = e.offsetX;
    var y = e.offsetY;

    if (vaccine_button.mouseOver(x, y) && vaccine_button.level > 0) {
        if (selected_button != "vaccine") {
            selected_button = "vaccine";
            vaccine_button.selected = true;
            cure_button.selected = false;
        }
        else {
            selected_button = "";
            vaccine_button.selected = false;
        }
    }

    else if (cure_button.mouseOver(x, y) && cure_button.level > 0) {
        if (selected_button != "cure") {
            selected_button = "cure";
            cure_button.selected = true;
            vaccine_button.selected = false;
        }
        else {
            selected_button = "";
            cure_button.selected = false;
        }
    }
}

var makeMousePointer = function() {
    c.className = "mouse-pointer";
}

var makeMouseSelector = function() {
    if (c.className != "")
        c.className = "";
}

var resetGame = function(e) {
    location.reload();
}

var people = [];
var gridIntersections = [];
var gridRectangles = [];

var vaccine_button, cure_button;
var selected_button = "";

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
