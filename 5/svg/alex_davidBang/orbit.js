var s = document.getElementById("s");
var bodies = [];
var stars = [];
var planets = [];
var pause = 0;
var showVelocities = false;

var distance = function(body1,body2){
    return Math.pow(body2.x - body1.x,2) + Math.pow(body2.y - body1.y,2);
};

var addPlanet = function(x,y,r,c,mass,parent){
    return {
        x : x,
        y : y,
        r : r,
        dx : 0,
        dy : 0,
        c : c,
        mass: mass,
        parent: parent,
        svg : document.createElementNS("http://www.w3.org/2000/svg","circle"),
        create : function(){
            this.svg.setAttribute('cx',this.x);
            this.svg.setAttribute('cy',this.y);
            this.svg.setAttribute('r',this.r);
            this.svg.setAttribute('fill',this.c);
            s.appendChild(this.svg);
            bodies.push(this);
            planets.push(this);
        },
        updateVelocity : function(){
            if (this.parent != null){
                var a = this.parent.mass / distance(this,this.parent);
                var theta = Math.atan2(this.parent.y - this.y,this.parent.x - this.x);
                this.dx += a * Math.cos(theta);
                this.dy += a * Math.sin(theta);
            };
        },
        move : function(){
            this.x += this.dx;
            this.y += this.dy;
            this.svg.setAttribute('cx',this.x);
            this.svg.setAttribute('cy',this.y);
        }
    };
};

var addStar = function(x,y,r,mass){
    return {
        x : x,
        y : y,
        r : r,
        dx : 0,
        dy : 0,
        c : "#ff0000",
        mass: mass,
        parent: null,
        svg : document.createElementNS("http://www.w3.org/2000/svg","circle"),
        create : function(){
            this.svg.setAttribute('cx',this.x);
            this.svg.setAttribute('cy',this.y);
            this.svg.setAttribute('r',this.r);
            this.svg.setAttribute('fill',this.c);
            s.appendChild(this.svg);
            bodies.push(this);
            stars.push(this);
        },
        updateVelocity : function(){
            //change later to be affected by other stars only
            if (this.parent != null){
                var a = this.parent.mass / distance(this,this.parent);
                var theta = Math.atan2(this.parent.y - this.y,this.parent.x - this.x);
                this.dx += a * Math.cos(theta);
                this.dy += a * Math.sin(theta);
            };
        },
        move : function(){
            this.x += this.dx;
            this.y += this.dy;
            this.svg.setAttribute('cx',this.x);
            this.svg.setAttribute('cy',this.y);
        }
    };
};


var clearVelocities = function(){
    var arrows = document.getElementsByTagName("path");
    for (var i = 0; i < arrows.length; i++){
        s.removeChild(arrows[i]);
        i--;
    };
};

var drawVelocities = function(){
    clearVelocities();
    for (var i = 0; i < planets.length; i++){
        var p = document.createElementNS("http://www.w3.org/2000/svg","path");
        var l = "M " + planets[i].x + "," + planets[i].y + " " + (planets[i].x + 30 * planets[i].dx) + "," +  (planets[i].y + 30 * planets[i].dy);
        p.setAttribute('d',l);
        p.setAttribute('stroke',"white");
        p.setAttribute('fill',"none");
        p.setAttribute('stroke-width',"5px");
        p.setAttribute('marker-end',"url(#Arrow)");
        s.appendChild(p);
    };
};

var run = function(){
    for (var i = 0; i < bodies.length; i++){
        bodies[i].updateVelocity();
        bodies[i].move();
    };
    if (showVelocities){
        drawVelocities();
    };
};

var go = function(){
    if (pause == 0){
        pause = setInterval(run,17);
    }else{
        clearInterval(pause);
        pause = 0;
    };
};

//[simple test]
var sun = addStar(350,300,50,200);
sun.create();
var p1 = addPlanet(350,100,20,'blue',10,sun);
p1.create();
p1.dx = -Math.sqrt(100 / 200); //v = sqrt(parent.mass / distance)

document.addEventListener("keydown",function(e){ //put all keypresses in here
    e.preventDefault();
    if (e.keyCode == 13){
        go();
    };
});

var vButton = document.getElementById("v");
vButton.addEventListener("click",function(e){
    e.preventDefault();
    if (showVelocities){
        clearVelocities();
    }else{
        drawVelocities();
    };
    showVelocities = !showVelocities;
});
