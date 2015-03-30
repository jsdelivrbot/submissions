console.log("HELLO!!!");

var App = new Marionette.Application();
var Turn = BackBone.Model.extend();
var Turns = BackBone.Collection.extend({
    model: Turn
});

App.TurnView = Marionette.ItemView.extend({
    template: "#history-template"
});

App.HistoryView = Marionette.CollectionView.extend({
    childView : App.TurnView
});

App.StoryView = Marionette.CompositeView.extend({
    template: "#story-template",
    tagName:"p",
    events:{
	"click #submit": function(){
	    var n = $("#line").val();
	    if(n.length>0){
		this.fetch().add(new Turn({content:n}));
		this.save();
		$("#line").val("");
	    }
	}
    },
    modelEvents:{
	"change":function(){
	    this.render();
	}
    }
});

App.addRegions({
    story: "#story",
    history:"#history"
});

App.on("start", function(){
    console.log("STARTING!!!");
    
    var storyView = new App.StoryView({collection:db});
    App.story.show(storyView);
    
    var historyView = new App.HistoryView({collection:db});
    App.history.show(historyView);
});

App.start();
