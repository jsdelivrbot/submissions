var s = document.getElementById("s");

var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var addCircle = function (s,x,y,state) {
  var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c1.setAttribute('cx', x);
  c1.setAttribute('cy', y);
  c1.setAttribute('r', 8);
  c1.setAttribute('fill',getRandomColor());
  c1.setAttribute('dx', Math.random()*10-5);
  c1.setAttribute('dy', Math.random()*10-5);
  c1.setAttribute('state', state);
    c1.setAttribute('counter',50);
  s.appendChild(c1);
  }

var update = function () {
  var cs = document.getElementsByTagName("circle");
  for (var i=0; i<cs.length; i++) {
    x = parseFloat(cs[i].getAttribute('cx'));
    y = parseFloat(cs[i].getAttribute('cy'));
    dx = parseFloat(cs[i].getAttribute('dx'));
    dy = parseFloat(cs[i].getAttribute('dy'));
    r = parseFloat(cs[i].getAttribute('r'));
      counter = parseFloat (cs[i].getAttribute('counter'));
    state = cs[i].getAttribute('state');
      
      if (state != "bouncing" && r > 0) {
          for (var j=0; j<cs.length; j++) {
              var jx = parseFloat(cs[j].getAttribute('cx'));
              var jy = parseFloat(cs[j].getAttribute('cy'));
              var jr = parseFloat(cs[j].getAttribute('r'));
              var distance = Math.sqrt( Math.pow(x - jx, 2) + Math.pow(y - jy, 2) );
              if (distance < r + jr){
                  if (cs[j].getAttribute('state') == "bouncing") {
                      cs[j].setAttribute('state', "growing");
                  }
              }
          }
      }
      
    if (state == "bouncing") {
      if (x + r > 640 || x  + r < 0) {
        dx *= -1;
      }
      if (y + r > 480 || y + r < 0 ) {
        dy *= -1;
      }
      x += dx;
      y += dy;
    }
    else if (state == "growing") {
        if (r >= 40) {
            state = "big"
        } else {
            r ++;
        }
    }
    else if (state == "big") {
        counter--;
        if (counter == 0) {
            state = "shrinking";
        }
    }
    else if (state == "shrinking") {
        if (r > 0) {
            r --;
        }
    }
      
      
      //updates
      cs[i].setAttribute('cx', x);
      cs[i].setAttribute('cy', y);
      cs[i].setAttribute('dx', dx);
      cs[i].setAttribute('dy', dy);
      cs[i].setAttribute('state', state);
      cs[i].setAttribute('r', r);
      cs[i].setAttribute('counter', counter);

  
  }
  window.requestAnimationFrame(update);
}

var start = function (e) {
  if (!started) {
    started = true;
    addCircle(s, e.offsetX, e.offsetY, "growing");
  }
}



for (var i=0;i<50;i++) {
  addCircle(s, 320, 240,"bouncing");
  //addCircle(s, Math.random()*640, Math.random()*480);
}


var started = false;
s.addEventListener('click', start);

window.requestAnimationFrame(update);

//s.addEventListener('click',update)
