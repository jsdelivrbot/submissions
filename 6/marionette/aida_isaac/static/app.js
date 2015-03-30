var App = new Marionette.Application();
App.TaskView = Marionette.ItemView.extend({
	template: "#task-template",
	tagName: "tr"
});
App.CompView = Marionette.CompositeView.extend({
		template : "#composite-template",
		childView : App.TaskView,
		childViewContainer : "tbody"
});
App.addRegions({
	main: "#main"
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