var NS = "http://www.w3.org/2000/svg";
var svg = document.createElementNS(NS,"svg");
document.body.appendChild(svg);
svg.setAttribute("width","640");
svg.setAttribute("height","480");


var world;
var mdown = false;
var curframe = 0;
var lastrclick = 0;
var curmpos = {x:100,y:100};

var updaterate = 60;

var randcolors = ["#f00","#0f0","#00f","#ff0","#f0f","#0ff",]

function getrandomcolor() {
    return randcolors[Math.floor(Math.random()*6)];
}

function World(svg) {
    var svg = svg;
    var particles = [];

    this.getParticles = function() {return particles;}
    this.addParticle = function(x,y) {
        var next = new Particle(this,x,y);
        particles.push(next);
    }
    this.update = function() {
        var i;
        for (i=0; i<particles.length; i++) {
            particles[i].update();
        }
        curframe+=1;
        if(curframe%300==0) {console.log("[FRAME "+curframe+"]");}
    }
}

function Particle(world,x,y) {
    var world = world;
    var x = x;
    var y = y;
    var dx = Math.random()*10 - 5;
    var dy = Math.random()*10 - 5;
    var size = 4;
    var mass = 1;
    var color = getrandomcolor();
    var elem = document.createElementNS(NS,"circle");
    elem.setAttribute("r",size);
    elem.setAttribute("fill",color);
    elem.setAttribute("cx",x-(size/2));
    elem.setAttribute("cy",y-(size/2));
    svg.appendChild(elem);
    this.update = function() {
        x += dx;
        y += dy;
        if(x-3*size/2<0 && dx<0) {dx = -dx; x = (3*size)-x}
        if(x+size/2>640 && dx>0) {dx = -dx; x = 1280-x-size;}
        if(y-3*size/2<0 && dy<0) {dy = -dy; y = (3*size)-y}
        if(y+size/2>480 && dy>0) {dy = -dy; y = 960-y-size;}
        elem.setAttribute("cx",x-(size/2));
        elem.setAttribute("cy",y-(size/2));
    }
    this.checkcollision = function() {
        //hell no, not again
    }
}

function getMousePos(svg,event) {
    var rect = svg.getBoundingClientRect();
    return {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top)
    };
}

function mousemove(e) {
    curmpos = getMousePos(svg,e);
}

function mousehold() {
    if (mdown) {
        world.addParticle(curmpos.x, curmpos.y);
        world.addParticle(curmpos.x, curmpos.y);
        world.addParticle(curmpos.x, curmpos.y);
        world.addParticle(curmpos.x, curmpos.y);
        world.addParticle(curmpos.x, curmpos.y);
        window.setTimeout(mousehold,1000/updaterate);
    }
}

function mousedown(e) {
    curmpos = getMousePos(svg,e);
    e.preventDefault();
    if(e.which==1 && !mdown) {
        world.addParticle(curmpos.x, curmpos.y);
        mdown = true;
    } else if (e.which==3 && (!mdown || (curframe-lastrclick)>5)) {
        mdown = true;
        mousehold();
    }
}

function mouseup(e) {
    mdown = false;
}

function nocontextmenu(e) {
    e.preventDefault();
}

function start() {
    svg.addEventListener("mousedown",mousedown);
    svg.addEventListener("contextmenu",nocontextmenu);
    svg.addEventListener("mouseup",mouseup);
    svg.addEventListener("mousemove",mousemove);
    world = new World(svg);
    window.setInterval(world.update,1000/updaterate);
}

start();
