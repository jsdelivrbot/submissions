console.log("HELLO");
var counter = 0;
var current = null;
var App = new Marionette.Application();

App.addRegions({
    firstRegion:"#first-region",
    secondRegion:"#second-region"
});

App.on("start",function() {
    console.log("hellloooooo start");
    var storiesveiw = new App.StoriesView({collection:c});
    App.firstRegion.show(storiesview);
    var compositeview = new App.CompositeView({collection:c});
    App.secondRegion.show(compositeview);
    Backbone.history.start();
});

App s
var Story = Backbone.Model.extend({});
var Stories = Backboen.Collection.extend({
    model:Story
});

var s = new Story({text:"story 1",id:counter});
counter = counter + 1;
var s1 = new Story({text:"story 2",id:counter});
counter = counter + 1;
var s2 = new Stories([p1,p2]);
App.start();
