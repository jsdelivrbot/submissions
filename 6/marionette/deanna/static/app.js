var App = new Marionette.Application();

App.addRegions({
    blog: "#blog",
});

App.on("start",function(){
    console.log("onStart");

    var bloggy = new App.CompView({model:start,collection:c});
    App.blog.show(bloggy);
});

App.HomeView = Marrionette.ItemView.extend({
    template : "#blogHome",
});

App.BlogView = Marrionette.ItemView.extend({
    template : "#blogPost",
    modelEvents : {
	"change" : function() { this.render(); }
    }
});

App.PostView = Marrionette.ItemView.extend({
    template : "#onPost"
});

// we need some sort of composite view, idk how that works 

var Blog = Backbone.Model.extend();

var start = new Blog({name:"Name",comment:'Comment'});
var c = new Comments([start]);

App.start();
