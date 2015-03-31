var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region",
});


App.on("start",function(){
    var staticview = new App.StaticView();
    App.firstRegion.show(staticview);

    var compview = new App.CompView({collection:c});
    App.secondRegion.show(compview);

    Backbone.history.start();

});

App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});

App.PlaceView = Marionette.ItemView.extend({
    template : "#place-template",
    tagName : "p",
    events : {
	"click #delete" : function() { this.remove(); }

    },
    modelEvents : {
	"change" : function() { this.render(); }
    }
    
});


App.PlacesView = Marionette.CollectionView.extend({
    childView : App.PlaceView
});

App.CompView = Marionette.CompositeView.extend({
    template : "#composite-template",
    childView : App.PlaceView,
    childViewContainer : "p",
    modelEvents : {
	"change" : function() { this.render(); }
    },
    events : {
	"click #add" : function() {
	    var w1 = $("#newword1").val();
	    var w2 = $("#newword2").val();
	    var w3 = $("#newword3").val();
	    if (w1.length > 0 || w2.length > 0 || w3.length > 0){
		this.collection.add( new Word({ 
		    text : w1 +" "+ w2 +" "+ w3,
		    index : c.length
		}));
		$("#newword1").val("");
		$("#newword2").val("");
		$("#newword3").val("");
	    }
	}
    }
});


var myController = Marionette.Controller.extend({
default : function(){
    var compview = new App.CompView({collection:c});
    App.firstRegion.show(compview);
}
});

App.controller = new myController();

App.router = new Marionette.AppRouter({
    controller : App.controller,
    appRoutes : {
	"/" : "default",
    }
});

var Word = Backbone.Model.extend();
var Words = Backbone.Collection.extend({
    model : Word
});

var c = new Words([]);

App.start();
