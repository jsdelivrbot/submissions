console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
		firstRegion: "#first-region",
		secondRegion:"#second-region",
		thirdRegion: "#third-region",
		fourthRegion:"#fourth-region"
});

App.on("start",function(){
		console.log("STARTING");
		var staticView = new App.StaticView();
		App.fourthRegion.show(staticView);

		/*var placeView = new App.TaleView({model:p1});
		App.secondRegion.show(placeView);
		
		var placesView = new App.TalesView({collection:c});
		App.thirdRegion.show(placesView);
*/
		var compView = new App.CompView({collection:c});
		App.firstRegion.show(compView);

		Backbone.history.start();

});

App.StaticView = Marionette.ItemView.extend({
		template : "#static-template"
});

App.TaleView = Marionette.ItemView.extend({
		template : "#place-template",
		tagName : "tr",
		events : {
				"click #delete" : function() { this.remove();},
		    "click #push" : function(){
			var name="#"+this.model.get("nameid");
			console.log(name);
			var n = $(name).val();
			console.log(n);
			var current = this.model.get("story");
			if (n.length > 0){
			    console.log("did we get here");
			    this.model.set("story", current + " "+ n);
			    this.model.save(this.model.attributes, {
				success:function(model, response) {
				    console.log('que');
				},
				error: function(model, error) {
				    console.log(model.toJSON());
				    console.log('error.responseText');
				}
			    });
			    this.render();
			}
		    }
		},
		modelEvents: {
		    "change":function(){
						this.render();
						}}
});

App.TalesView = Marionette.CollectionView.extend({
    childView : App.TaleView
    
});

App.CompView = Marionette.CompositeView.extend({
		template : "#composite-template",
		childView : App.TaleView,
		childViewContainer : "tbody",
		modelEvents: {
				"change":function(){
						this.render();
				}},
		events : {
				"click #add" : function(){
				    
				    var n = $("#newname").val();
				   
				    var replaced= n.replace(/\s+/g, '-');
				    if (n.length > 0){
						    
								this.collection.add(new Tale({name:n, story:"Once upon a",nameid:replaced}));
					
								$("#newname").val("");
								this.collection.sort();
						}
				}
		}
});

var Tale = Backbone.Model.extend({
    urlRoot:'tale',
    initialize:function(){
	this.save(this.attributes, {
	    success:function(model, response) {
		console.log('Successfully saved!');
	    },
	    error: function(model, error) {
		console.log(model.toJSON());
		console.log('error.responseText');
	    }
	});

    }
});
var Tales = Backbone.Collection.extend({
    model:Tale,
    url: '/tales',
    comparator:"name",
    /*initialize:function(){
	this.fetch(function (d){
	    console.log(d);
	    this.render();
	});
	
	this.on({'add':function() {
	    console.log("added");
	    this.view.render();
	}});
    }*/
});
				       
/*var Person = Backbone.Model.extend();
var person = new Person({last : 'One',
												 first :'User',
												 stars : 12
												});

var p1 = new Tale({name:"Story 1",story:"This story begins", nameid:this.model.get("story").replace(' ', '-'));
var p2 = new Tale({name:"Bridge to Terabithia",story:"Blah blah blah",nameid:story.replace(' ', '-'));*/
var c = new Tales([]);

var myController = Marionette.Controller.extend({
		default : function() {
				var compView = new App.CompView({collection:c});
				App.firstRegion.show(compView);
		},
	/*	oneRoute : function() {
				App.firstRegion.show(new App.TaleView({model:p1}));
				App.secondRegion.show(new App.TaleView({model:p2}));
		},
		twoRoute : function() {
				App.firstRegion.show(new App.TaleView({model:p2}));
				App.secondRegion.show(new App.TaleView({model:p1}));
		}*/
});
App.controller = new myController();

App.router = new Marionette.AppRouter({
		controller : App.controller,
		appRoutes : {
				"" : "default"//,
				//one : "oneRoute",
			//	two : "twoRoute"
		}
});

App.start();
