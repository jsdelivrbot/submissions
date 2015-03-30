var App = new Marionette.Application();

App.addRegions({
    main: "#main"
});

App.on("start", function() {
    var mainView = new App.CompView({collection: c, model: person});
    App.main.show(mainView);
});

App.CompView = Marionette.CompositeView.extend({
    template: "#temp",
    events: {
	"click #add": function() {
	    //Some saving stuff
	    var s = $("story").val();
	    if (s.length > 0) {
		this.collection.add(new Place({story:s}));
		$("story").val("");
	    }
	}
    },
    modelEvents: {
	"change": function() {
	    this.render();
	}
    }
});

var Place = Backbone.Model.extend();
var Places = Backbone.Collection.extend({
    model: Place
});

App.start();
