console.log("HELLO");

var App = new Marionette.Application();

var Comments = Backbone.Model.extend();
App.comments = new Comments({Topher: 'baller', Z: ';)', DW: 'Newlywed'});
//App.comments = new Comments({});

App.addRegions({
    place: "#place",
    storyMaker: "#story-maker"
});

App.on("start", function(){
    console.log("start");

    var staticView = new App.StaticView({model : App.comments});
    App.place.show(staticView);
    
    var createView = new App.CreateView();
    App.storyMaker.show(createView);
    
    Backbone.history.start();
});

App.StaticView = Marionette.ItemView.extend({
    template: "#static-template",
    events : {
	
	"click #TopherCom" : function(){
	    var com = $("#comment").val();
	    if (com.length > 0){
		current = App.comments.get('Topher') + ", ";
		App.comments.set({Topher : current + com});
		this.render();
	    }
	},

	"click #ZCom" : function(){
	    var com = $("#comment").val();
	    if (com.length > 0){
		current = App.comments.get('Z') + ", ";
		App.comments.set({Z : current + com});
		this.render();
	    }
	},

	"click #DWCom" : function(){
	    var com = $("#comment").val();
	    if (com.length > 0){
		current = App.comments.get('DW') + ", ";
		App.comments.set({DW : current + com});
		this.render();
	    }
	}
    }
});

App.CreateView = Marionette.ItemView.extend({
    template: "#new-template",
    events : {
	"click #add" : function(){
	    var name = $("#teacher-name").val();
	    var com = $("#comments").val();
	    if (name.length > 0 && com.length > 0){
		var new_list = App.comments.attributes;
		new_list[name] = com;
		App.comments = new Comments(new_list);
		App.place.show(new App.StaticView({model : App.comments}));
		this.render()
	    }
	}
    }
});

App.start();
