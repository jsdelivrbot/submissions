console.log("HELLO!!!");

var App = new Marionette.Application();
var Turn = Backbone.Model.extend({
    urlRoot:'/story',
    idAttribute:'_id',
    id:'_id',
});
var Turns = Backbone.Collection.extend({
    model: Turn,
    url:'/game',
    initialize:function() {
	this.fetch();
    }
});
var c = new Turns();

App.TurnView = Marionette.ItemView.extend({
    template: "#history-template",
    tagName:"li",
    modelEvents:{
	"change":function(){
	    this.render();
	}
    }
});
App.OtherView = Marionette.ItemView.extend({
    template: "#other-template",
    tagName:"span",
    modelEvents:{
	"change":function(){
	    this.render();
	}
    }
});
App.HistoryView = Marionette.CollectionView.extend({
    childView : App.TurnView,
});
App.StoryView = Marionette.CompositeView.extend({
    template: "#story-template",
    childView : App.OtherView,
    view: c,
    tagName:"p",
    events:{
	"click #add": function(e){
	    e.preventDefault();
	    var line = $("#entry").val()
	    var n = $("#name").val()
	    if(n.length<1){
		n='anonymous';
	    }
	    var that=this;
	    if(line.length>0){
		$("#entry").val("");
		var m = new Turn({name:n,content:line});
		m.save(m.toJSON(),{success:function(m,r){
		    if (r.result.content==n.content && r.result.name==n.name){
			that.collection.add(m);
			that.render();
			console.log("success");
		    }	
		}});
	    }
	}
    }
});

App.addRegions({
    story: "#story",
    history:"#history"
});

App.on("start", function(){
    console.log("STARTING!!!");
    
    var storyView = new App.StoryView({collection:c});
    App.story.show(storyView);     

    var historyView = new App.HistoryView({collection:c});
    App.history.show(historyView);  
});

App.start();
