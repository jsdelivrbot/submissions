var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region",
    thirdRegion: "#third-region"
});

App.on("start",function(){
    var staticview = new App.StaticView();
    App.thirdRegion.show(staticview);

    var placesview = new App.PlacesView({collection:c1});
    App.secondRegion.show(placesview);

    var compview = new App.CompView({model:author, collection:c2});
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
	"click #delete" : function(){
	    var n = this.$("#newname").val();
	    var a = this.$("#age").val();
	    var c = $("#comment").val();
	    c1.add(new Place({name:n,age:a,comment:c}));
	},
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
	    var a = $("#age").val();
	    var c = $("#comment").val();
	    if (n.length > 0 && a.length>0 && c.length>0){
		this.collection.add(new Place({name:n,age:a,comment:c}));
		this.collection.comparator="name";
		$("#newname").val("");
		$("#age").val("");
		$("#comment").val("");
	    }
	}
    }
});

var Place = Backbone.Model.extend();
var Places = Backbone.Collection.extend({
    model:Place
});

var Person = Backbone.Model.extend();
var author = new Person({first:'Tianshi',last:'Wang', period:'6'});


var p1 = new Place({name:"Tyler",age:"17",comment:"hello"});
var p2 = new Place({name:"David",age:"2",comment:"ayyy lmao"});
var c1 = new Places([p1,p2]);
var c2 = new Places([p1,p2]);

App.start();
