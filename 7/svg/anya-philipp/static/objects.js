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
                    this.color = VACCINE_COLOR;

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

var makeToolButton = function(name, x, y, width, height, cost, initial_level, refill_speed, color, hover_color, logo_url, ctx) {
    return {
        name : name,
        x : x,
        y : y,
        width : width,
        full_height : height,
        button_height : height * 0.8,
        bar_height : height * 0.2,
        cost : cost,
        level : initial_level,
        max_level : initial_level,
        refill_speed : refill_speed,
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

        canUse : function(cost) {
            return this.level -this. cost >= 0
        },

        useOnce : function(cost) {
            if (this.canUse())
                this.level = this.level - this.cost;
        },

        refill : function() {
            this.level = (this.level + this.refill_speed).cap(this.max_level);
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

        isInside : function(x, y) {
            return squared(x - this.x) + squared(y - this.y) <= squared(radius);
        },
        
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
