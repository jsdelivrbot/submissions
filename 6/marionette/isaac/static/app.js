var App = new Marionette.Application();

App.addRegions({
	main: "#main"
});

Todo = Backbone.Model.extend({});

Todo_list = Backbone.Collection.extend({
  model: Todo
});



App.TaskView = Marionette.ItemView.extend({
	template: "#task-template",
	tagName: "tr",
	className: "todo_item"
});

App.CompView = Marionette.CompositeView.extend({
		template : "#composite-template",
		childView : App.TaskView,
		childViewContainer : "tbody"
});

App.on("start", function(){
	var compview = new App.CompView({collection:c});
	App.main.show(compview);
});

var Task = Backbone.Model.extend();

var Tasks = Backbone.Collection.extend({
	model: Task
});

var t = new Task({task:"Water the plants"});

var c = new Tasks([t]);

console.log("hello");

App.start();