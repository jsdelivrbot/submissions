var App = new Marionette.Application();

App.addRegions({
    blog: "#blog",
});


App.on("start",function(){
    console.log("Starting");

    var blogview = new App.CompView({model:start,collection:c});
    App.blog.show(blogview);
});

App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});

App.BlogView = Marionette.ItemView.extend({
    template : "#comment-template",
    tagName : "tr",
    modelEvents : {
	"change" : function() { this.render(); }
    }
});


App.CommentsView = Marionette.CollectionView.extend({
    childView : App.BlogView
});

App.CompView = Marionette.CompositeView.extend({
    template : "#composite-template",
    childView : App.BlogView,
    childViewContainer : "tbody",
    modelEvents : {
	"change" : function() { this.render(); }
    },
    events : {
	"click #add" : function() {
	    var newname = $("#name").val();
	    var newcomment = $("#comment").val()
	    if (newname.length > 0 && newcomment.length > 0){
		this.collection.add(new Blog({name:newname,comment:newcomment}));
		$("#name").val("");
		$("#comment").val("");
	    }
	    this.render();
	}
    }
});

var Blog = Backbone.Model.extend();
var Comments = Backbone.Collection.extend({
    model:Blog
});

var start = new Blog({name:"Name",comment:'Comment'});
var c = new Comments([start]);

App.start();
