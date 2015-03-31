var App = new Marionette.Application();
App.NewTaskView = Marionette.ItemView.extend({
	template: "#new-task-template",
	tagName: "tr",
	events: {
		"click #complete": function() {
			console.log(this.model);
			var t = this.model.get("task");	
			this.model.destroy();
			c.unshift(new Task({task:t}));
		}
	}
});
App.OldTaskView = Marionette.ItemView.extend({
	template: "#old-task-template",
	tagName: "tr"
});

App.CollectionView = Marionette.CollectionView.extend({
	childView: App.OldTaskView,
	template: "#collection-template",
	tagName: "tr",
	modelEvents: {
		"change": function() {
			console.log(this.collection.length);
			if (this.collection.length > 10) {
				this.collection.pop();
			}
			this.render();
		}
	}
});
App.CompView = Marionette.CompositeView.extend({
		template : "#composite-template",
		childView : App.NewTaskView,
		childViewContainer : "tbody",
		events: {
			"click #add_task": function() {
				var t = $("#new_task").val();
				if (t.length > 0) {
					this.collection.unshift(new Task({task:t}));
					$("#new_task").val("");
				}
			}
		},
		modelEvents: {
			"change": function() {
				console.log("stuff has changed")
				this.render();
			}
		}
});

App.LayoutView = Marionette.LayoutView.extend({
	template: "#layout-template",
	regions: {
		incomplete: "#incomplete",
		complete: "#complete"
	}

});
App.addRegions({
	main: "#main"
});

App.RegisterView = Marionette.ItemView.extend({
	template: "#register-template"

});

App.on("start", function(){
	var layview = new App.LayoutView();
	App.main.show(layview);
	var compview = new App.CompView({collection:i});
	layview.incomplete.show(compview);
	var collview = new App.CollectionView({collection:c});
	layview.complete.show(collview);
});

var Task = Backbone.Model.extend();
var Tasks = Backbone.Collection.extend({
	model: Task
});

var c = new Tasks();
var i = new Tasks();

App.start();