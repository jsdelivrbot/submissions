console.log("HELLO");

var App = new Marionette.Application();

App.on("start", function(){
    console.log("STARTING");
});

App.start();
