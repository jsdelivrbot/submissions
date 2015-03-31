var App = new Marionette.Application();

var counter = 0;
var current = null;

App.addRegions({
    firstRegion:"#first-region",
    secondRegion:"#second-region"
});

App.on("start",function() {
    console.log("Started");
    var storiesview = new App.StoriesView({collection:c});
    App.firstRegion.show(storiesview);
    var compositeview = new App.CompositeView({collection:c});
    App.secondRegion.show(compositeview);
    Backbone.history.start();
});

App.StoryView = Marionette.ItemView.extend({
    template : "#story-template",
    tagName : "tr",
    events : {
	"click #delete" : function(){
	    this.remove();
	},
	"click #add" : function(){
	    var old = this.model.get("text");
	    var phrase = $("#phrase"+this.model.get("id")).val();
	    var changed = old + phrase;
	    //console.log(changed);
	    this.model.set("text", changed);
	}
    },
    modelEvents : {
	"change" : function() {this.render()}
    }
});

App.ViewStoryView = Marionette.ItemView.extend({
    template : "#view-story-template",
    tagName : "tr",
    modelEvents : {
	"change" : function() {this.render()}
    }
});

App.StoriesView = Marionette.CollectionView.extend({
    template: "#collection-template",
    childView : App.ViewStoryView
});

App.CompositeView = Marionette.CompositeView.extend({
    template: "#composite-template",
    childView: App.StoryView,
    childViewContainer : "tbody",
    events : {
	"click #new" : function() {
	    var t = $("#text").val();
	    if (t.length > 0){
		this.collection.add(new Story({text:t, id:counter}));
		$("#text").val("");		
		counter = counter + 1;
	    }
	}
    }
});

var Story = Backbone.Model.extend({});
var Stories = Backbone.Collection.extend({
    model:Story
});


var s = new Story({text:"story 1", id:counter});
counter = counter + 1;
var s1 = new Story({text:"next story ", id:counter});
counter = counter + 1;
var c = new Stories([s,s1]);
App.start();
