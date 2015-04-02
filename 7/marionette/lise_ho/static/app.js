console.log("Hello");
/*
  Modules help group things together
  --> Like Java Classes

  Behavior:
    helps group repeated lines of code in different views
    this view implements a behavior doing (line of code, code, code)
       mutliple views can will run the same behavior 

  Routers:
    Going somewhere in the url
    Syncs up your url with what should be seen on the screen
        -> issue with JavaScript-> when it is not server based

*/
var App = new Marionette.Application();

App.addRegions({
    firstRegion:"#first-region",
    secondRegion:"#second-region",
    thirdRegion:"#third-region",
    fourthRegion:"#fourth-region"
});

//this happens when the application actually starts:: App.start()
App.on("start",function(){
    console.log("STARTING");
    var staticView = new App.StaticView();
    App.fourthRegion.show(staticView);

    var placeView = new App.PlaceView({model:p1});
    App.secondRegion.show(placeView)
    
    var placesView = new App.PlacesView({collection:c});
    App.thirdRegion.show(placesView);
    
    var compView = new App.CompView({collection:c, model:person});
    App.firstRegion.show(compView);
    
    Backbone.history.start();  //starts the history for the router to work
});

App.StaticView= Marionette.ItemView.extend({
    template:"#static-template" //this is the entire view -> we import the script in index with this id and make it our template :)
    //no need for hard code like backbone

});

App.PlaceView = Marionette.ItemView.extend({
    template: "#place-template",
    tagName:"tr",
    events:{
	"click #delete": function(){
	    this.remove();
	}
	//90% use case - marionette lets you go to the backbone to change things
    },
    modelEvents:{
	//updates the view  (when you press a button, view updates automaticall on "change")
	//example to see effect:
	// type into console
	//    p1.set("rating",100)
	"change":function(){
	    this.render();
	    console.log("QQQQ");	   
	}
    }
});

App.PlacesView = Marionette.CollectionView.extend({
    // view for collection 
    childView: App.PlaceView

}); 
App.CompView = Marionette.CompositeView.extend({
    template:"#composite-template",
    childView:App.PlaceView,
    childViewContainer:"tbody",
    events:{
	//because add is in the view, if you some how had multiple add ids/ classes
	"click #add": function(){
	    console.log("ADD");
	    var n = $("#newname").val();
	    if (n.length>0){
		this.collection.add(new Place({name:n,rating:0}));
		$("#newname").val("");
		this.collection.sort();
	    }
	}
    },
    modelEvents:{
	"change":function(){
	    this.render();
	    console.log("Composite changes");	   
	}
    }
});

var Person = Backbone.Model.extend();
var person = new Person({
    last:"Kat",
    first:"Fred",
    stars:12
});
var Place = Backbone.Model.extend();
var Places = Backbone.Collection.extend({
    model:Place,
    comparator:name
});
var p1 = new Place({name:"Terry's",rating:5});
var p2 = new Place({name:"Ferry's",rating:8});
var c = new Places([p1,p2]);

var myController = Marionette.Controller.extend({
    default: function(){ //sometimes back button doesnt get you back to the base page
	var compView = new App.CompView({collection:c, model:person});
	App.firstRegion.show(compView);
    },
    oneRoute: function(){
	App.firstRegion.show(new App.PlaceView({model:p1}));
	App.secondRegion.show(new App.PlaceView({model:p2}));
	//always make it a new view/ marionette takes the previous view in the same location and automatically garbage collects it :) 
	console.log("ONEROUTE");
    },
    twoRoute: function(){
	App.firstRegion.show(new App.PlaceView({model:p1}));
	App.secondRegion.show(new App.PlaceView({model:p2}));
	//always make it a new view/ marionette takes the previous view in the same location and automatically garbage collects it :) 
	console.log("TWOROUTE");
    },
});
App.controller = new myController();
App.router = new Marionette.AppRouter({
    controller: App.controller,
    appRoutes:{
	one : "oneRoute",
	two : "twoRoute"
    }
});
App.start();



/*

var v = new App.PlaceView({model:p1});
App.secondRegion.show(v);

*/
