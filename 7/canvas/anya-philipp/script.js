var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 600;

var makePerson = function(x,y,w,h,ctx) {
    return {
        x : x,
        y : y,
        w : w,
        h : h,
        ctx : ctx,
        dx : 0,
        dy: 0,
        color : "#ff0000",

        draw : function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.w,this.h);
        },

        //We have to change the way the people move
        //People must "bounce" off walls
        move : function() {
            this.x = this.x + this.dx;
            this.y = this.y + 2*Math.random() - 1;
            if (this.x < 20 || this.x > 580){
            this.dx = this.dx * -1;
            }
            if (this.y < 20 || this.y > 580){
            this.y = 100+400*Math.random();
            }
        },
        isOnPerson: function(person) {
            return (this.x == person.x && this.y == person.y);
        }
    };
};

var checkForInfections = function(people) {
    return people;
}

var update = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);

    for (var i = 0; i < people.length; i++) {
        people[i].move();
    }

    people = checkForInfections(people);

    for (var i = 0; i < people.length; i++){
        people[i].draw();
    }
    window.requestAnimationFrame(update);
}

var addRandomPerson = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    var w = 10+Math.random(20);
    var h = 20+Math.random(40);
    people.push(makePerson(x,y,w,h,ctx));
    
};

var startGame  = function(e) {

    window.requestAnimationFrame(update);
}

var resetGame = function(e) {
    location.reload();
}

var people = [];

var c = document.getElementById("game-canvas");
c.width = CANVAS_WIDTH;
c.height = CANVAS_HEIGHT;

var start = document.getElementById("start-button");
start.addEventListener("click", startGame);

var reset = document.getElementById("reset-button");
reset.addEventListener("click", resetGame);

var ctx = c.getContext("2d");
