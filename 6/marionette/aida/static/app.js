var App = new Marionette.Application();
App.NewTaskView = Marionette.ItemView.extend({
	template: "#new-task-template",
	tagName: "tr",
	events: {
		"click #complete": function() {
			console.log(this.model);
			var t = this.model.get("task");	
			var d = this.model.get("date");
			this.model.destroy();
			c.unshift(new Task({task:t, date:d}));
		}
	}
});
App.OldTaskView = Marionette.ItemView.extend({
	template: "#old-task-template",
	tagName:"tr"
});

App.CollectionView = Marionette.CollectionView.extend({
	childView: App.OldTaskView,
	template: "#collection-template",
	tagName: "tr",
	modelEvents: {
		"change": function() {
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
					var d = $.datepicker.formatDate('yy/mm/dd', new Date());
					var task = new Task({task:t, date:d});
					console.log(i);
					// this.collection.unshift(t);
					task.save(task.toJSON(),{success:function(p,r){
						if (r.result.n == 1) {
							console.log("sucess");
							this.collection.unshift(t);
						}
					}})
					


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


App.on("start", function(){
	var layview = new App.LayoutView();
	App.main.show(layview);
	var compview = new App.CompView({collection:i});
	layview.incomplete.show(compview);
	var collview = new App.CollectionView({collection:c});
	layview.complete.show(collview);
});

var Task = Backbone.Model.extend({
	url: "/task",
	idAttribute: "_id"
});
var Tasks = Backbone.Collection.extend({
	model: Task
});

var c = new Tasks();
var i = new Tasks();

App.start();