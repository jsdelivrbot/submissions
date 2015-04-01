var App = new Marionette.Application();

App.addRegions({
		firstRegion: "#first-region",
		secondRegion: "#second-region",
		thirdRegion: "#third-region",
		fourthRegion: "#fourth-region"
});


App.on("start", function(){
    console.log("Initializing");

    var addview = new App.AddView({collection:c});
    App.fourthRegion.show(addview);

    var staticview = new App.StaticView();
    App.firstRegion.show(staticview);
});


App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});


App.LineView = Marionette.ItemView.extend({
    template : "#line",
    tagName : "li",
    modelEvents : {
	"change" : function(){
	    this.render();}
    }
});

App.StoryView = Marionette.CollectionView.extend({
    template : "#story-template",
    childView : App.LineView,
});

App.AddView = Marionette.CompositeView.extend({
    template : "#add-template",
    childView : App.LineView,
    childViewContainer : "ol",    
    events : {
	"click #new_item" : function(){
	    var n = $("#newline").val();
	    if (n.length != 0){
		this.collection.add(new Line({l:n}));
		$("#newline").val("");
		Backbone.sync("create", c);
	    }
	}
    }
});






var Line = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Line
});


var beginning = new Line({l:Milk});
var c = new StoryView([beginning]);
App.start();
