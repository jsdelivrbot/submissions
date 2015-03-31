console.log("HELLO");
var App = new Marionette.Application();
App.addRegions({
    firstRegion: "#first-region",
    secondRegion:"#second-region"
});

App.on("start",function(){
    console.log("STARTING");
    var staticView = new App.StaticView();
    App.firstRegion.show(staticView);

    var compView = new App.CompView({collection:c});    
    App.secondRegion.show(compView);

    Backbone.history.start();

});

App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});

App.GameView = Marionette.ItemView.extend({
    template : "#game-template",
    tagName : "tr",
	
    events : {
	// "click #delete" : function() {
	//     this.remove();
	//     this.model.collection.remove(this.model);
	//     this.model.save();
	//     console.log("Save Deleted");
	// }
	"click #delete" : function(e){
	    var that=this;
	    this.model.destroy();
	    this.remove();
	    this.render();
	    $.ajax({
		type: "DELETE",
		url: "game",
		dataType: "json",
		contentType: "application/json",
                data: JSON.stringify({
                    id: this.model.get("_id")
	        })
		});
	    this.model.collection.remove(this.model);
	}
			     
    },
    modelEvents: {
	"change":function(){
	    this.render();
	}
    }
});

App.CompView = Marionette.CompositeView.extend({
    template : "#composite-template",
    childView : App.GameView,
    childViewContainer : "tbody",
    //url: "games",
    
    modelEvents: {
 	"change":function(){
 	    this.render();
 	}
    },
    events : {
	"click #add" : function(){
	    var n = $("#newname").val();
	    if (n.length > 0){
		this.collection.add(new Game({name:n}));
		$("#newname").val("");
		this.collection.sort();

	    }
	}
    }
});

var Game = Backbone.Model.extend({
    url : "game",
    initialize: function(){
	this.save();
	console.log("Saved");
    },
    destroy: function(){
	this.save();
	//WHY DOESN'T THIS SEND A DELETE REQUEST
	console.log("Death Saved");
    }
    
});
var Games = Backbone.Collection.extend({
    url : 'games',
    model : Game,
    initialize : function(){
	//if multiple people use this, it won't fetch well
	this.fetch();
	this.on({'add':function() {
	    console.log("Added");
	}, 'remove':function(){
	    console.log("Removed");
	}
		});
    }
    
});
var c = new Games([]);
c.comparator = "name";



App.start();
