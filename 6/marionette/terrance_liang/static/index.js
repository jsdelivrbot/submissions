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

    var textview = new App.TextCompView({collection:p});
    App.secondRegion.show(textview);

    Backbone.history.start();
});

App.PlaceView = Marionette.ItemView.extend({
    template : "#place-template",
    tagName : "tr",
    events : {
	"click #update": function(){
	    App.secondRegion.show(new App.TextView({model:this.model}));
	},
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
	}
    },
    modelEvents : {
	"change" : function() { this.render(); }
    }    
});

App.TextView = Marionette.ItemView.extend({
    template: "#text-template",
    events: {
	"click #update" : function(){
	    var s = "#" + this.model.get('storyid');
	    console.log(s);
	    var w = $(s).val();
	    if (w.length > 0){
		var nw = this.model.get('story') + w;
		this.model.set('story',nw);
		this.render();
	    }
	}
    },
    modelEvents : {
	"change" : function() { this.render(); }
    }
});

App.TextCompView = Marionette.CompositeView.extend({
    template: "#textcomp-template",
    childViewContainter:"body",
    childView: App.TextView,
    modelEvents : {
	"change" : function() { this.render(); }
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
		this.collection.add(new Story({name:n,story:s,rating:0,storyid:n.split(' ').join('-')}));
		this.collection.comparator="name";
		this.collection.sort();
		$("#newname").val("");
		}
	    }
	}
});

var Story = Backbone.Model.extend();
var Stories = Backbone.Collection.extend({
    model:Story
});

var s1 = new Story({name:"Little Red Riding Hood",story:"A little girl is walking in the woods",rating:5,storyid:"Little Red Riding Hood".split(' ').join('-')});
var s2 = new Story({name:"Rumplestilskin",story:"A girl is really poor",rating:8,storyid:"Rumplestilskin".split(' ').join('-')});
var c = new Stories([s1,s2]);
var p = new Stories([]);
App.start();
