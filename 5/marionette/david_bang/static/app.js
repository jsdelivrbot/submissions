console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    story: "#story"
});


App.on("start",function() {
    console.log("Story Started");
    var storyView = new App.StorysView({collection: currentstory,
				       model: start});
    App.story.show(storyView);

    Backbone.history.start();
});

App.StoryView = Marionette.ItemView.extend({
    template: "#story-template",
    modelEvents: {
	"change" : function(){
	    this.render();
	}
    }
});

App.AllView = Marionette.CollectionView.extend({
    childView : App.StoryView
});



App.StorysView = Marionette.CompositeView.extend({
    childView : App.StoryView,
    template: "#stories-template",
    childViewContainer : "ul",
    events: {
	"click #add" : function(){
	    var l = $("#line").val();
	    if (l.length >0){
		this.collection.add(new Story({line:l}));
	    }
	    $("#line").val("");
	}	   
    },
    modelEvents: {
	"change" : function(){
	    this.render();
	}
    }

   
});




var Story = Backbone.Model.extend({});
var Storys = Backbone.Collection.extend({
    model: Story
});


var start = new Story ({line: "Here is the start of an amazing story"});

var currentstory = new Storys();

App.start();
