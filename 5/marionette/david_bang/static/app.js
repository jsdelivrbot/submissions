console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    story: "#story",
    stored:"#stored"
});

var Line = Backbone.Model.extend({
    urlRoot:'/story',
    idAttribute:'_id',
    id:'_id',
});

var Lines = Backbone.Collection.extend({
    model: Line,
    url:'/',
    initialize:function() {
	this.fetch();
    }
});

var b = new Lines();


App.on("start",function() {
    console.log("Story Started");
    var storyView = new App.StorysView({collection: currentstory,
				       model: start});
    App.story.show(storyView);
  
    var stored2View = new App.StoredView({collection: currentstory,
				       model: start});
    App.stored.show(stored2View);

    Backbone.history.start();
});

App.StoresView = Marionette.ItemView.extend({
    template: "#stored-template",
    modelEvents:{
	"change":function(){
	    this.render();
	}
    }
});
App.StoryView = Marionette.ItemView.extend({
    template: "#story-template",
    modelEvents: {
	"change" : function(){
	    this.render();
	}
    }
});

App.StoredView = Marionette.CollectionView.extend({
    childView : App.StoresView,
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
		var m = new Line ({line:l});
		m.save(m.toJSON(), {success:function() {
		    console.log("Success")

		}});
		this.collection.add (new Story({line:l}))
		this.render();		    
				    
		
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
