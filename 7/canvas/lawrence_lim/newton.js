var canvas = document.createElement("canvas")
document.body.appendChild(canvas);
canvas.setAttribute("width","640");
canvas.setAttribute("height","480");

var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,640,480);

var world;
var mdown = false;
var gravaccmult = 1;
var curframe = 0;
var lastrclick = 0;

var updaterate = 60;

var randcolors = ["#f00","#0f0","#00f","#ff0","#f0f","#0ff",]

function paintcircle(x,y,radius,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    ctx.fill();
}

function getrandomcolor() {
    return randcolors[Math.floor(Math.random()*6)];
}

function World(canvas) {
    var canvas = canvas;
    var stars = [];
    var planets = [];

    this.getStars = function() {return stars;}
    this.getPlanets = function() {return planets;}
    this.addStar = function(x,y) {
        var next = new Star(this,x,y);
        stars.push(next);
    }
    this.addPlanet = function(x,y) {
        var next = new Planet(this,x,y);
        planets.push(next);
    }
    this.update = function() {
        var i;
        var j;
        if(curframe%300==0) {console.log("[FRAME "+curframe+"]");}

        for (i=0; i<stars.length; i++) {
            for (j=0; j<planets.length; j++) {
                if(planets[j].x < -2000 || planets[j].x > 2000 ||
                   planets[j].y < -2000 || planets[j].y > 2000) {
                    planets.splice(j,1);
                }
                var dx = stars[i].x - planets[j].x;
                var dy = stars[i].y - planets[j].y;
                var dist = Math.sqrt(dx*dx + dy*dy);
                if(dist<stars[i].size*2) {
                    planets.splice(j,1);
                    j--;
                } else {
                    var acc = stars[i].mass / Math.pow(dist,1.5);
                    acc *= gravaccmult;
                    var dxy = Math.abs(dx) + Math.abs(dy);
                    var accx = (dx / dxy) * acc;
                    var accy = (dy / dxy) * acc;
                    planets[j].dx += accx;
                    planets[j].dy += accy;
                }
            }
        }

        for (i=0; i<planets.length; i++) {
            planets[i].update();
        }

        
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,640,480);
        for (i=0; i<stars.length; i++) {
            stars[i].draw();
        }
        for (i=0; i<planets.length; i++) {
            planets[i].draw();
        }
        curframe+=1;
    }
}

function Star(world,x,y) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.size = 6;
    this.mass = 10;
    this.color = "#fff";
    this.draw = function() {
        ctx.fillStyle = this.color;
        paintcircle(this.x,this.y,this.size,this.color);
    }
}

function Trail() {
    this.path = [];
    this.addPoint = function(x,y) {
        var next = [x,y];
        this.path.push(next);
        if(this.path.length>60) {
            this.path.shift();
        }
    }
    this.draw = function() {
        var i;
        ctx.beginPath();
        ctx.moveTo(this.path[0][0],this.path[0][1]);
        for (i=1; i<this.path.length-1; i++) {
            ctx.lineTo(this.path[i][0],this.path[i][1]);
        }
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function Planet(world,x,y) {
    this.world = world;
    this.trail = new Trail();
    this.x = x;
    this.y = y;
    this.dx = Math.random()*2 - 1;
    this.dy = Math.random()*2 - 1;
    this.size = 2;
    this.mass = 1;
    this.color = getrandomcolor();
    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        paintcircle(this.x,this.y,this.size,this.color);
        this.trail.draw();
    }
    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.trail.addPoint(this.x,this.y);
    }
}


function getMousePos(canvas,event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top)
    };
}

function mousedown(e) {
    e.preventDefault();
    mpos = getMousePos(canvas,e);
    if(e.buttons==1 && !mdown) {
        world.addStar(mpos.x, mpos.y);
    } else if (e.buttons==2 && (!mdown || curframe-lastrclick>5)) {
        //tfw hold mouse doesn't work
        console.log("RT");
        world.addPlanet(mpos.x, mpos.y);
        lastrclick = curframe;
    }
    mdown = true;
}

function mouseup(e) {
    mdown = false;
}

function nocontextmenu(e) {
    e.preventDefault();
}

function start() {
    canvas.addEventListener("mousedown",mousedown);
    canvas.addEventListener("contextmenu",nocontextmenu);
    canvas.addEventListener("mouseup",mouseup);
    world = new World(canvas);
    window.setInterval(world.update,1000/updaterate);
}

start();
