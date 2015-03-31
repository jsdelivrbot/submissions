var App = new Marionette.Application();
App.addRegions({
		formRegion:"#form-region",
		storyRegion: "#story-region",
		newRegion: "#new-region"
});

App.on("start",function(){
	console.log("STARTING");
	var compView = new App.CompView({collection:c});
	App.newRegion.show(compView);
});

App.StoryView = Marionette.ItemView.extend({
		template : "#place-template",
		tagName : "tr",
		events : {
				"click #view" : function() {
					var textView = new App.TextView({model:this.model});
					App.storyRegion.show(textView);
				},
				"click #edit" : function() {
					var editView = new App.EditView({model:this.model});
					App.formRegion.show(editView);
				},
				"click #delete" : function() { this.remove();}
		},
		modelEvents: {
				"change":function(){
						this.render();
						}}
});

App.CompView = Marionette.CompositeView.extend({
		template : "#new-template",
		childView : App.StoryView,
		childViewContainer : "tbody",
		modelEvents: {
				"change":function(){
						this.render();
				}},
		events : {
				"click #add" : function(){
						var n = $("#newname").val();
						if (n.length > 0){
								this.collection.add(new Story({name:n, text:""}));
								$("#newname").val("");
								this.collection.sort();
						}
				}
		}
});

App.EditView = Marionette.ItemView.extend({
		template : "#edit-template",
		tagName : "table",
		events : {
				"click #submit" : function() {
					var input = $("#name").val();
					console.log("input:" + input);
					var temp = this.model.get('text') + input;
					this.model.set('text',temp);
					this.render();
				},
		},
		modelEvents: {
				"change":function(){
						this.render();
						}}
});

App.TextView = Marionette.ItemView.extend({
		template : "#story-template",
		tagName : "p",
		modelEvents: {
				"change":function(){
						this.render();
						}}
});

var Story = Backbone.Model.extend();
var Stories = Backbone.Collection.extend({
		model:Story,
		comparator:"name"
});
var p1 = new Story({name:"Terry's",text:"Terry's is better. "});
var p2 = new Story({name:"Ferry's",text:"Ferry's is better. "});
var c = new Stories([p1,p2]);

App.start();
