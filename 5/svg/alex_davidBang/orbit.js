var s = document.getElementById("s");
var stars = [];
var planets = [];
var pause = 0;
var showVelocities = false;
var mouse = {x: 0, y: 0};
var mouse2 = {x: 0, y: 0};
var mode = "create";

var distance = function(body1,body2){
    return Math.pow(body2.x - body1.x,2) + Math.pow(body2.y - body1.y,2);
};

var addPlanet = function(x,y,r,c,parent){
    return {
        x : x,
        y : y,
        r : r,
        dx : 0,
        dy : 0,
        c : c,
        parent: parent,
        svg : document.createElementNS("http://www.w3.org/2000/svg","circle"),
        create : function(){
            this.svg.setAttribute('cx',this.x);
            this.svg.setAttribute('cy',this.y);
            this.svg.setAttribute('r',this.r);
            this.svg.setAttribute('fill',this.c);
            s.appendChild(this.svg);
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
        },
        delete : function(){
            s.removeChild(this.svg);
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
            stars.push(this);
        },
        updateVelocity : function(){
            
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
    for (var i = 0; i < planets.length; i++){
        planets[i].updateVelocity();
        planets[i].move();
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
var sun = addStar(350,350,50,150);
sun.create();
var p1 = addPlanet(350,100,20,'blue',sun);
p1.create();
p1.dx = -Math.sqrt(100 / 250); //v = sqrt(parent.mass / distance)

var selectPlanet = function(x,y){
    for (var i = 0; i < planets.length; i++){
        var planet = planets[i];
        var dist = Math.pow(planet.x - x,2) + Math.pow(planet.y - y,2);
        if (dist <= Math.pow(planet.r,2)){
            return i;
        };
    };
    return -1;
};

var mouseAction = function(){
    var radius = Math.sqrt(Math.pow(mouse.x - mouse2.x,2) + Math.pow(mouse.y - mouse2.y,2));
    var j = selectPlanet(mouse.x,mouse.y);
    if (mode == "delete"){
        if (j != -1){
            planets[j].delete();
            planets.splice(j,1);
        };
    }else if (mode == "create"){
        var color = "#" + Math.random().toString(16).slice(2, 8);
        var p = addPlanet(mouse.x,mouse.y,radius,color,sun);
        p.create();
    	p.dx = -Math.sqrt(100 / 250);

    }else if (mode == "velocity"){
        if (j != -1){
            var theta = Math.atan2(mouse2.y - mouse.y,mouse2.x - mouse.x);
            planets[j].dx = radius * Math.cos(theta) / 30;
            planets[j].dy = radius * Math.sin(theta) / 30;
        };
    };
};

document.addEventListener("keydown",function(e){ //put all keypresses in here
    e.preventDefault();
    if (e.keyCode == 13){
        go();
    }else if (e.keyCode == 86){
        mode = "velocity";
    }else if (e.keyCode == 67){
        mode = "create";
    }else if (e.keyCode == 68){
        mode = "delete";
    };
});

s.addEventListener('mousedown', function(e){
    e.preventDefault();
    mouse.x = e.clientX - s.getBoundingClientRect().left + s.scrollLeft;
    mouse.y = e.clientY - s.getBoundingClientRect().top + s.scrollTop;
}, false);

s.addEventListener('mouseup', function(e){
    e.preventDefault();
    mouse2.x = e.clientX - s.getBoundingClientRect().left + s.scrollLeft;
    mouse2.y = e.clientY - s.getBoundingClientRect().top + s.scrollTop;
    mouseAction();
}, false);

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
