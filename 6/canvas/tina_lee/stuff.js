var c = document.getElementById("c");
var ctx = c.getContext("2d");

var people = [];
var person = new Image();

person.src = "stickperson.png";

ctx.drawImage(person,10,10,50,50);
