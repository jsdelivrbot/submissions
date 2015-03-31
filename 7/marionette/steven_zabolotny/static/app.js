var App = new Marionette.Application();

App.addRegions({
    main: "#main"
});

App.on("start", function() {
    var mainView = new App.CompView({collection: c, model: person});
    App.main.show(mainView);
});

App.PlaceView = Marionette.ItemView.extend({
    template: "#placetemp",
    tagName: "td",
    modelEvents: {
	"change": function() {
	    this.render();
	    //this.model.save();
	}
    }
});

App.CompView = Marionette.CompositeView.extend({
    template: "#comptemp",
    childView: App.PlaceView,
    childViewContainer: "tr",
    events: {
	"click #add": function() {
	    //Some saving stuff
	    var s = $("#story").val();
	    if (s.length > 0) {
		this.collection.add(new Place({story:s}));
		$("#story").val("");
	    }
	    this.render();
	}
    },
    modelEvents: {
	"change": function() {
	    this.render();
	}
    }
});

var Place = Backbone.Model.extend(//{
    //urlRoot: "/place",
    //idAttribute: "_id",
    //id: "_id"
//});
);
var Places = Backbone.Collection.extend({
    model: Place,
    //url: "/places",
    initialize: function() {
	//this.fetch();
    }
});
var Person = Backbone.Model.extend()
var person = new Person({name: "Swag"});
var p1 = new Place({story: "This is where"});
var p2 = new Place({story: "the story begins"});
var c = new Places([p1, p2]);

App.start();
