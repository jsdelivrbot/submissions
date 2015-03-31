console.log("HELLO");

var App = new Marionette.Application();
App.addRegions({
	firstRegion: "#first-region",
	    secondRegion: "#second-region"
	    });

App.on("start",function(){
	console.log("HELLO");
	var storyview = new App.StoryView({model:v});
	App.firstRegion.show(storyview);
	var compview = new App.CompView({collection:c});
	App.secondRegion.show (compview);
	Backbone.history.start();
    });
App.StoryView = Marionette.ItemView.extend({
	template: "#story-template"
    });
var x = 3
App.CompView = Marionette.CompositeView.extend({
	template : "#composite-template",
	childView:App.StoryView,
	childViewContainer:"tbody",
	events:{
	    "click #add" : function(){
		var n = $("#newline").val();
		console.log(n);
		this.collection.add(new Sentence({sent:n},x));
		x = x+1;
		this.collection.comparator="linumber";
		$("#newline").val("");
	    }
	}
    }
    );
var Sentence = Backbone.Model.extend();
var Story = Backbone.Collection.extend({
	model:Sentence
    });
var v = new Sentence({sent: "Here Is A Story!"});
var v1 = new Sentence({sent:"Once Upon A Time",linumber:1});
var v2 = new Sentence({sent:"In a Land Far Away",linumber:2});
var c = new Story ([v1,v2]);
App.start();