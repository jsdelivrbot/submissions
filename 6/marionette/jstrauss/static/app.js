// Justin Strauss
// Soft Dev Period 6
// Marionette Mini Project

// console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
	existingposts: "#existingposts",
	makepost: "#makepost"
});

App.on("start",function(){
		//console.log("Starting");
		var itemview = new App.ItemView({collection:posts});
		App.existingposts.show(itemview);

		var compview = new App.CompView({model:blog,collection:posts});
		App.makepost.show(compview);

		Backbone.history.start();
});

App.CompView = Marionette.CompositeView.extend({
		template : "#existingpoststemp",
		childView : App.ItemView
});

App.ItemView = Marionette.ItemView.extend({
		template : "#makeposttemp",
		tagName: "tr",
		modelEvents : {
				"change" : function() { this.render(); }
		},
		events : {
				"click #add" : function() {
					this.collection.add(new blog({post:p,author:a}));
				}
			}
});

App.ItemView = Marionette.CollectionView.extend(
    {
    childView : App.ItemView
    }
);

// var myController = Marionette.Controller.extend({
// 		default : function(){
// 				var compview = new App.CompView({model:person,collection:c});
// 				App.firstRegion.show(compview);
// 		},
// 		oneRoute : function() {
// 				App.firstRegion.show(new App.PlaceView({model:p1}));
// 				App.secondRegion.show(new App.PlaceView({model:p2}));
// 		},
// 		twoRoute : function() {
// 				App.firstRegion.show(new App.PlaceView({model:p2}));
// 				App.secondRegion.show(new App.PlaceView({model:p1}));
																					 
// 		} 
// });

// App.controller = new myController();

// App.router = new Marionette.AppRouter({
// 		controller : App.controller,
// 		appRoutes : {
// 				"/" : "default",
// 				one : "oneRoute",
// 				two : "twoRoute"
// 		}
// });

var blog = Backbone.Model.extend();
var blogs = Backbone.Collection.extend({
	model:blog
});

var b1 = new blog({post:"Hello world",author:"Justin"});
//var b2 = new blog({post:"This is cool.",author:"Anonymous"});
var posts = new blogs([b1]);

App.start();