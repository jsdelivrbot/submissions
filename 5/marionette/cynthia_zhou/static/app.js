console.log("HELLO");
console.log("HEYO2");
var count = 0;
var current = null;
var App = new Marionette.Application();

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
		this.collection.add(new Story({text:t, id:count}));
		$("#text").val("");		
		count = count + 1;
	    }
	}
    }
});

//var myController = Marionette.Controller.extend({
//    editRoute : function(){
//	var id = null;
//	var radios = document.getElementsByName('select');
//	for (var i = 0, length = radios.length; i < length; i++) {
//	    if (radios[i].checked) {
//		id = radios[i].value;
//	    }
//	}
//	console.log(id);
//	for (var i = 0, length = c.length; i < length; i++) {
//	    if (c[i].get("id")==id) {
//		current = c[i];
//	    }
//	}
//	console.log(current.get("text"));
//	App.secondRegion.show(new App.StoryView({model:current}));
//  }
//});
//App.controller = new myController();
//App.router = new Marionette.AppRouter({
//    controller: App.controller,
//    appRoutes:{
//	'edit':'editRoute'
//    }
//});

var Story = Backbone.Model.extend({});
var Stories = Backbone.Collection.extend({
    model:Story
});

var p1 = new Story({text:"This is one story ", id:count});
count = count + 1;
var p2 = new Story({text:"Another story starts ", id:count});
count = count + 1;
var c = new Stories([p1,p2]);
App.start();
