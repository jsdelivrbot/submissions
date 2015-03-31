console.log("HELLO");
var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region"
});

App.on("start", function(){
    console.log("STARTING");
    var staticView = new App.StaticView();
    App.secondRegion.show(staticView);
    var compView = new App.CompView({collection:c});
    App.firstRegion.show(compView);
    Backbone.history.start();
});

App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});

App.PlaceView = Marionette.ItemView.extend({
    template : "#place-template",
    tagName: "tr",
    events : {
	"click #delete" : function() { this.remove();},
	"click #addwords" : function() {
	        var n = $("#newwords").val();
	        var text = this.model.get("words");
	        if (n.length > 0){
		    this.model.set("words",text+" " + n);
		    this.render();
		        }
	    }   
    },
    modelEvents: {
	"change" : function() {
	        this.render();
	    }
    }
});

App.PlacesView = Marionette.CollectionView.extend({
    childView : App.PlaceView
});

App.CompView = Marionette.CompositeView.extend({
    template : "#composite-template",
    childView : App.PlaceView,
    childViewContainer : "tbody",
    modelEvents : {
	"change" : function() { this.render();
				      }},
    events : {
	"click #addstory" : function() {
	        var n = $("#newstory").val();
	        if (n.length > 0) {
		    this.collection.add(new Place({name:n, words:"There once was"}));
		    $("#newstory").val("");
		    this.collection.sort();
		        }
	    }
    }
});

var Place = new Backbone.Model.extend({
    urlRoot : '/place',
    idAttribute : '_id',
    id : '_id',
});

var Places = Backbone.Collection.extend({
    model : Place,
    url : '/places',
    comparator : "name"
});


var myController = Marionette.Controller.extend({
    default : function() {
	var compView = new App.CompView({collection:c});
	App.firstRegion.show(compView);
    }
});
App.controller = new myController();

App.router = new Marionette.AppRouter({
    controller : App.controller,
    appRoutes : {
	"/" : "default"
    }
});

App.start();
