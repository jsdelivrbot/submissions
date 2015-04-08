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
    var storyView = new App.StorysView({collection: currentstory
				       });
    App.story.show(storyView);
  
   // var stored2View = new App.StoredView({collection: currentstory
//				       });
   // App.stored.show(stored2View);

    Backbone.history.start();
});

App.StoresView = Marionette.ItemView.extend({
    template: "#stored-template",
    modelEvents:{
	"change":function(){
	    this.render();
	    this.model.save();
	    window.location.reload();
	}
    }
});
App.StoryView = Marionette.ItemView.extend({
    template: "#story-template",
   
    modelEvents: {
	"change" : function(){
	    this.render();
	    this.model.save();
	    window.location.reload();
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
/*	"click #delete": function(){
	    var that = this;

	    that.destroy();
	    $.ajax({
		    type: "DELETE",
		    url: "story",
		    dataType: "json",
		    success:function() {
			$("#line").empty();
			console.log("Success")

		    }});
	    var currentstor = new Storys();
	    var story3View = new App.StorysView({collection: currentstor
				       });
	    App.story.show(story3View);
	    console.log ("story dumped");
	
	    console.log("Story Dumped");
	},*/
	"click #add" : function(){
	    var l = $("#line").val();
	    console.log(l);
	    if (l.length >0){
		var m = new Line ({line:l});
		console.log(m);
		//m.save(m.toJSON(), {success:function() {
		//    console.log("Success")

		//}});
		//looked at alex's code
		$.ajax({
		    type: "POST",
		    url: "story",
		    dataType: "json",
		    contentType: "application/json",
		    data: JSON.stringify({
			line: l
		    }), success:function() {
			console.log("Success")

		    }});
		this.collection.add (new Story({line:l}));
		console.log(new Story({line:l}));	    
		
	    }
	    $("#line").val("");
	    window.location.reload();
	}	   
    },
    modelEvents: {
	"change" : function(){
	    this.render();
	    window.location.reload();
	}
    }

   
});




var Story = Backbone.Model.extend({});
var Storys = Backbone.Collection.extend({
    url: "story",
    model: Story,
    initialize: function(){
	this.fetch();
    }
});



var currentstory = new Storys();

App.start();
