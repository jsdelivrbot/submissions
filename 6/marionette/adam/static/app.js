var App = new Marionette.Application();

App.addRegions({
    displayRegion : "#display-region",
    addingRegion : "#adding-region"
});

App.on("start", function(){
    console.log("Initializing");

    var addview = new App.AddView({collection:c, model:beginning});
    App.addingRegion.show(addview);
});


//the story is separated into lines
App.LineView = Marionette.ItemView.extend({
    template : "#line",
    tagName : "li",
    events : {
	"click #delete" : function(){this.remove();},
	"click #edit" : function(){
	    var n = $("#editline").val();
	    console.log(n)
	    if (n.length != 0){
		this.model.set('l',n);
		$("#editline").val("");
		this.render();
	    }
	}

    },
    modelEvents : {
	"change" : function(){
	    this.render();}
    }
})



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
	    }
	}
    }
});


var Line = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Line
});
var beginning = new Line({l:"Once upon a time, in a land far, far away, there lived a king."});
var c = new StoryView([beginning]);

App.start();
