var bodies = [];
var pause = 0;

var distance = function(body1,body2){
    return Math.pow(body2.x - body1.x,2) + Math.pow(body2.y - body1.y,2);
};

var addPlanet = function(s,x,y,r,c,mass){
    return {
        s : s,
        x : x,
        y : y,
        r : r,
        dx : 0,
        dy : 0,
        c : c,
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

var run = function(){
    for (var i = 0; i < bodies.length; i++){
        bodies[i].updateVelocity();
        bodies[i].move();
    };
};

var go = function(e){
    e.preventDefault();
    if (pause == 0){
        pause = setInterval(run,17);
    }else{
        clearInterval(pause);
        pause = 0;
    };
};
        
var s = document.getElementById("s");
var p1 = addPlanet(s,350,300,50,'red',100);
p1.create();
var p2 = addPlanet(s,350,100,20,'blue',10);
p2.create();
p2.parent = p1;
p2.dx = -Math.sqrt(100 / 200); //v = sqrt(parent.mass / distance)
s.addEventListener("click",go);
