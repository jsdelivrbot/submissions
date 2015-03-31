var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region",
    thirdRegion: "#third-region"
});

App.on("start",function(){
    var staticview = new App.StaticView();
    App.thirdRegion.show(staticview);

    var commentsview = new App.CommentsView({collection:c1});
    App.secondRegion.show(commentsview);

    var compview = new App.CompView({model:author, collection:c2});
    App.firstRegion.show(compview);

    Backbone.history.start();
});

App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});

App.CommentView = Marionette.ItemView.extend({
    template : "#comment-template",
    tagName : "tr",

    events : {
	"click #delete" : function(){this.remove()},
    },
    modelEvents : {
	"change" : function() { this.render(); }
    }
    
});


App.CommentsView = Marionette.CollectionView.extend({
    childView : App.CommentView
});

App.CompView = Marionette.CompositeView.extend({
    template : "#composite-template",
    childView : App.CommentView,
    childViewContainer : "tbody",
    modelEvents : {
	"change" : function() { this.render(); }
    },
    events : {
	"click #add" : function() {
	    var n = $("#newname").val();
	    var a = $("#age").val();
	    var c = $("#comment").val();
	    if (n.length > 0 && a.length>0 && c.length>0){
		this.collection.add(new Comment({name:n,age:a,comment:c}));
		this.collection.comparator="name";
		$("#newname").val("");
		$("#age").val("");
		$("#comment").val("");
	    }
	}
    }
});

var Comment = Backbone.Model.extend();
var Comments = Backbone.Collection.extend({
    model:Comment
});

var Person = Backbone.Model.extend();
var author = new Person({first:'Tianshi',last:'Wang', period:'6'});


var p1 = new Comment({name:"Tyler",age:"17",comment:"hello"});
var p2 = new Comment({name:"David",age:"2",comment:"ayyy lmao"});
var c1 = new Comments([p1,p2]);
var c2 = new Comments([p1,p2]);

App.start();
