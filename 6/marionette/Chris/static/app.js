console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
		firstRegion: "#first-region",
		secondRegion: "#second-region",
		thirdRegion: "#third-region",
		fourthRegion: "#fourth-region"
});


App.on("start",function(){
		console.log("Starting");
		var staticview = new App.StaticView();
		App.fourthRegion.show(staticview);

		var placeview = new App.PlaceView({model:p1});
		App.secondRegion.show(placeview);

		var placesview = new App.PlacesView({collection:c});
		App.thirdRegion.show(placesview);

		var compview = new App.CompView({model:person,collection:c});
		App.firstRegion.show(compview);

		Backbone.history.start();

});

App.StaticView = Marionette.ItemView.extend({
		template : "#static-template"
});

App.PlaceView = Marionette.ItemView.extend({
		template : "#place-template",
		tagName : "tr",
		events : {
				"click #delete" : function(){this.remove();}
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
		childViewContainer : "tbody",
		modelEvents : {
				"change" : function() { this.render(); }
		},
		events : {
				"click #add" : function() {
						var n = $("#newname").val();
						if (n.length > 0){
								this.collection.add(new Comment({name:n,comment:c}));
								this.collection.comparator="name";
								this.collection.sort();
								$("#newname").val("");
								$("#comment").val("");
						}
				}
		}
});


var myController = Marionette.Controller.extend({
		default : function(){
		var compview = new App.CompView({model:person,collection:c});
		App.firstRegion.show(compview);
		},
		oneRoute : function() {
				App.firstRegion.show(new App.PlaceView({model:p1}));
				App.secondRegion.show(new App.PlaceView({model:p2}));
		},
		twoRoute : function() {
				App.firstRegion.show(new App.PlaceView({model:p2}));
				App.secondRegion.show(new App.PlaceView({model:p1}));
																					 
		} 
});

App.controller = new myController();

App.router = new Marionette.AppRouter({
		controller : App.controller,
		appRoutes : {
				"/" : "default",
				one : "oneRoute",
				two : "twoRoute"
		}
});


var Place = Backbone.Model.extend();
var Places = Backbone.Collection.extend({
		model:Comment
});

var Person = Backbone.Model.extend();
var person = new Comment({first:'Chris',last:'Kim',});

var p1 = new Comment({name:"Chris",comment:"Hi guys"});
var p2 = new Place({name:"Brian Guo",comment:"I have magic stuff"});
var c = new Comments([p1,p2]);

App.start();
