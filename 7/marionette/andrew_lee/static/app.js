console.log("HELLO");
var App = new Marionette.Application();

App.addRegions({
    /*


add regions
    */
});

App.on("start", function(){
    console.log("STARTING");
    //stuff here
    Backbone.history.start();
});

App.CompView = Marionette.CompositeView
