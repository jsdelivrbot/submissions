var App = new Marionette.Application();

App.addRegions({
    instructionsRegion : "#instructions",
    addingRegion : "#story"
});

App.on("start", function(){
    console.log("Initializing");

    var addview = new App.AddView({collection:c, model:beginning});
    App.addingRegion.show(addview);

    var staticview = new App.StaticView();
    App.instructionsRegion.show(staticview);
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
})

App.StoryView = Marionette.CollectionView.extend({
    template : "#story-template",
    childView : App.LineView,
});

App.AddView = Marionette.CompositeView.extend({
    template : "#add-template",
    childView : App.LineView,
    childViewContainer : "ol",    
    events : {
	"click #add" : function(){
	    var n = $("#newline").val();
	    if (n.length != 0){
		this.collection.add(new Line({l:n}));
		$("#newline").val("");
	    }
	}
    }
});


var Line = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Line
});


var beginning = new Line({l:"Once upon a time, king Z ruled over the whole CS kingdom!"});
var c = new StoryView([beginning]);




App.start();x
