console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region",
});

App.on("start",function(){
    console.log("Starting");
   
    var compview = new App.CompView({collection:c});
    App.firstRegion.show(compview);

    Backbone.history.start();
});

App.PlaceView = Marionette.ItemView.extend({
    template : "#place-template",
    tagName : "tr",
    events : {
	"click #delete" : function(){this.remove();},
	"click #up" : function(){
	    var r = this.model.get('rating');	
	    this.model.set('rating',r+1);
	    this.render();
	},
	"click #down" : function(){
	    var r = this.model.get('rating');
	    this.model.set('rating',r-1);
	    this.render();
	},
    modelEvents : {
	"change" : function() { this.render(); }
	}
    }    
});

App.CompView = Marionette.CompositeView.extend({
    template : "#composite-template",
    childView : App.PlaceView,
    childViewContainer : "tbody",
    modelEvents : {
	"change" : function() { this.render(); }
	},
    events : {
	"click #add" : function() {
	    var n = $("#newname").val();
	    var s = $("#story").val();
	    if (n.length > 0){
		this.collection.add(new Story({name:n,story:s,rating:0}));
		this.collection.comparator="name";
		this.collection.sort();
		$("#newname").val("");
		}
	    }
	}
});

var myController = Marionette.Controller.extend({
    default : function(){
	var compview = new App.CompView({collection:c});
	App.firstRegion.show(compview);
    },
    oneRoute : function() {
	App.firstRegion.show(new App.StoryView({model:s1}));
	App.secondRegion.show(new App.StoryView({model:s2}));
    },
    twoRoute : function() {
	App.firstRegion.show(new App.StoryView({model:s2}));
	App.secondRegion.show(new App.StoryView({model:s1}));
	
    } 
});

App.controller = new myController();

App.router = new Marionette.AppRouter({
    controller : App.controller,
    appRoutes : {
	"/" : "default",
	one : "oneRoute",
	two : "twoRoute"
    }
});

var Story = Backbone.Model.extend();
var Stories = Backbone.Collection.extend({
    model:Story
});

var s1 = new Story({name:"Little Red Riding Hood",story:"A little girl is walking in the woods",rating:5});
var s2 = new Story({name:"Rumplestilskin",story:"A girl is really poor",rating:8});
var c = new Stories([s1,s2]);

App.start();
