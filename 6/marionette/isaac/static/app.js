var App = new Marionette.Application();

App.addRegions({
	main: "#main"
});

App.on("start", function(){
	var compview = new App.CompView({collection:c});
	App.main.show(compview);
	Backbone.history.start();
});


App.TaskView = Marionette.ItemView.extend({
	template: "#task-template",
	tagName: "tr",
	events: {
		"click #done" : function() { this.remove(); }

    },
    modelEvents : {
		"change" : function() { this.render(); }
    }
});

App.CompView = Marionette.CompositeView.extend({
		template : "#composite-template",
		childView : App.TaskView,
		childViewContainer : "tbody",
		events: {
			"click #add": function() {
				var a = $("#to_add").val();
				console.log(a);
				this.collection.add(new Task({task : a}));
				$("#to_add").val("")
			}
		},
		modelEvents: {
			"change" : function() { this.render(); }
    	}
});


var Task = Backbone.Model.extend();
var Tasks = Backbone.Collection.extend({
	model:Task
});

var t = new Task({task:"CS project"});
var c = new Tasks([t]);


App.start();