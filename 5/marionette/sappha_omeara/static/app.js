console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    //StoryDisplay: "#story-display"
    AddLineDisplay: "#add-line-display"
});


App.on("start",function() {
    console.log("Started");
    
    var addline = new App.AddLine({collection:c, model:l1});
    App.AddLineDisplay.show(addline);

    /*var compositeview = new App.CompositeView({model: person, collection:c});
    App.firstRegion.show(compositeview);

    var placeview = new App.PlaceView({model:p1});
    App.secondRegion.show(placeview);

    var placesview = new App.PlacesView({collection:c});
    App.thirdRegion.show(placesview);

    var firstView = new App.FirstView();
    App.fourthRegion.show(firstView);

    Backbone.history.start();*/
});



App.LineView = Marionette.ItemView.extend({
    template : "#line"
    tagName  : "li"
    modelEvents : {
	"change" : function(){ this.render(); }
	}
});

App.StoryView = Marionette.CollectionView.extend({
    childview : App.LineView
});

App.AddLine = Marionette.CompositeView.extend({
    template: "#add-line-template",
    childView: App.LineView,
    childViewContainer : "ol",
    events : {
	"click #add" : function() {
	    var n = $("#newname").val();
	    if (n.length > 0){
		this.collection.add(new Place({name:n,rating:0}));
		$("#newname").val("");
	    }

	}
    }
});

/*var myController = Marionette.Controller.extend({
    oneRoute : function(){
	console.log("OneRoute");
	App.firstRegion.show(new App.PlaceView({model:p1}));
	App.secondRegion.show(new App.PlaceView({model:p1}));
	},
    twoRoute : function() {
	console.log("TwoRoute");
	App.firstRegion.show(new App.PlaceView({model:p2}));
	App.secondRegion.show(new App.PlaceView({model:p2}));
	},
});

App.controller = new myController();
App.router = new Marionette.AppRouter({
    controller: App.controller,
    appRoutes:{
	"one":"oneRoute",
	"two":"twoRoute"
	}
});*/

var Line = Backbone.Model.extend({});
var StoryView = Backbone.Collection.extend({
    model:Line
});

var l1 = new Place({l:"This is the beginning"});
var l2 = new Place({l:"This is the middle"});
var c = new StoryView([l1, l2]);

App.start();
