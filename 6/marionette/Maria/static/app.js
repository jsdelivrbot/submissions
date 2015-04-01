var App = new Marionette.Application();

App.addRegions({
    firstRegion : "#first-region"
});

App.on("start", function(){
    console.log("Initializing");

    var addview = new App.AddView({collection:c});
    App.firstRegion.show(addview);

});





//for instructions
App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});

//the story is separated into lines
App.LineView = Marionette.ItemView.extend({
    template : "#line",
    tagName : "li",
    modelEvents : {
	"change" : function(){
	    this.render();}
    }
})

//the StoryView is an aggregation of the lines
App.StoryView = Marionette.CollectionView.extend({
    template : "#story-template",
    childView : App.LineView,
});

//for adding to the story
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
		Backbone.sync("create", c);
	    }
	}
    }
});






var Line = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Line
});


var first = new Line({l:"Milk"});
var c = new StoryView([first]);




App.start();
