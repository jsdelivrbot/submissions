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

    vaccine_button = makeToolButton("vaccine", left_corner_x, top_corner_y, width, height, VACCINE_COST, MAX_VACCINE_LEVEL, VACCINE_REFILL_SPEED, VACCINE_COLOR, VACCINE_HOVER_COLOR, VACCINE_SVG, ctx);
}

var createCureButton = function() {
    var width = TOOLBAR_WIDTH * BUTTON_WIDTH;
    var right_corner_x = vaccine_button.x - DISTANCE_BETWEEN_BUTTONS;
    var left_corner_x = right_corner_x - width;

    var height = TOOLBAR_HEIGHT * BUTTON_HEIGHT;
    var bisector_y = TOOLBAR_Y + (TOOLBAR_HEIGHT / 2) - TOOLBAR_PADDING_VERTICAL;
    var top_corner_y = bisector_y - height / 2;

    cure_button = makeToolButton("cure", left_corner_x, top_corner_y, width, height, CURE_COST, MAX_CURE_LEVEL, CURE_REFILL_SPEED, CURE_COLOR, CURE_HOVER_COLOR, CURE_SVG, ctx);
}

