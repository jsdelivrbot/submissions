console.log("story time!");

var App = new Marionette.Application();

App.addRegions({
    story: "#dump"
});

App.on("start", function() {
    console.log("starting");
    var cv = new App.CompView({collection: c});
    App.story.show(cv);
});

//each entry
var Line = Backbone.Model.extend({
    //urlRoot: "line",
//    id: "_id",
//    idAttribute: "_id"
});

//collection of entries
var Lines = Backbone.Collection.extend({
    model: Line
/*
   url: "/lines",
   initialize: function() {
	this.fetch();
	this.on({'add': function(){
	console.log("added");
	}});
    }
  */  
});

App.LinesView = Marionette.ItemView.extend({
    template: "#lines"  
});

App.CompView = Marionette.CompositeView.extend({
    template: "#adder",
    childViewContainer: "td",
    childView: App.LinesView,    
    events: {
	"click #addbutton": function() {
	   
	    //var that = this;
	    var s = $("#inputted").val();
	    if (s.length > 0) {
		this.collection.add(new Line({liner:s}));
		$("#inputted").val("");
		this.render();
		/*
		  s.save(s.toJSON(), { success: function(m, r){
		  if (r.result.n==1){
		  that.collection.add(m);
		  that.render();
		  }
		  }});
		*/
	    }
	    
	}
    },
    modelEvents: {
	"change": function() {
	    this.render();
	}
    }
});

var l1 = new Line({liner: "Once upon a"});
var l2 = new Line({liner: "time, there was"});
var c = new Lines([l1, l2]);

App.start();
