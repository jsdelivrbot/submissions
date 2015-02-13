var c1 = document.createElementNS("http://www.w3.org/2000/svg","circle");

c1.setAttribute('cx', 100);
c1.setAttribute('cy', 50);
c1.setAttribute('r', 50);
c1.setAttribute('fill', '#ffff00');

var s = document.getElementById("s");
s.appendChild(c1);
