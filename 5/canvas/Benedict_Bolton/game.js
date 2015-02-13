

var game = document.getElementById("Screen");

var ctx = game.getContext('2d');

var randInt = function (min, max) {
  return Math.floor(Math.random()*(max-min + 1) + min);
};

var createPlayer = function () {
  return {
    r: 2,
    x: game.width/2,
    y: game.height/2,
    str: 0,
    end: 2* Math.PI,
    color: "#FFFFFF",
    draw: function () {
      ctx.fillStyle=this.color;
      ctx.arc(this.x,this.y,this.r,this.str,this.end);
      ctx.stroke();
      //ctx.fill();
    },
    move: function( newX, newY) {
      this.x = newX;
      this.y = newY;
    }
  };
};

var createObstacle = function(x, y, h, w, ctx) {
  return {
    height: h,
    width: w,
    x: x,
    y: y,
    ctx: ctx,
    delta: randInt(1,4),
    dir: randInt(0,3),
    color: "#000093",
    draw : function() {
      ctx.fillStyle=this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    },
    move : function() {
      /*if (dir = 0) {
        this.x = this.x + this.delta;
      }
      else if (dir = 1) {
        this.x = this.x - this.delta;
      }
      else if (dir = 2) {
        this.y = this.y - this.delta;
      }
      else if (dir = 3) {
        this.y = this.y + this.delta;
      }*/
      this.x = this.x + this.delta;
      if (this.x > game.width) {
        return true;
      }
    }
  };
};

var time = new Date();

var play = function(e) {
  console.log(control.x + ", " + control.y);
  console.log("done");
  e.preventDefault();
  control.move(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
  console.log(control.x + ", " + control.y);
};

var run = function() {
  ctx.fillStyle="#D89090";
  ctx.fillRect(0,0, game.width, game.height);
  //console.log("running");
  control.draw();
  for (var item= 0; item < obs.length; item++){
    var fin = obs[item].move();
    obs[item].draw();
    if (fin) {
      obs.splice(item,item);
      fin = false;
    }
  }
  obs.push(createObstacle(0, randInt(10, game.height + 10), 5, 10, ctx))
  window.requestAnimationFrame(run);
};


var clicked = function(e){
    console.log("click");
		/*e.preventDefault();
		//ctx.beginPath();
		ctx.arc(e.offsetX,e.offsetY,
						15,0,2*Math.PI);
		ctx.fillStyle="#ff0000";
		ctx.stroke();
		ctx.fill();*/
};

var obs = [];

var control = createPlayer();
game.addEventListener("mousedown", play);
game.addEventListener("click",clicked);
window.requestAnimationFrame(run);
