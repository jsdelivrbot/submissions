var App = new Backbone.Marionette.Application();

App.addRegions({
    blog: "#blog",
});

App.on("start",function(){
    console.log("onStart");

    var bloggy = new App.CompView();
    App.blog.show(bloggy);
});

App.CompView = Marionette.CompositeView.extend({
	template: "#newPost",
	childView : App.BlogView,
	childViewContainer: "tbody",

});

App.BlogView = Marionette.ItemView.extend({
    template : "#blogPost",
    modelEvents : {
	"change" : function() { this.render(); }
    }
});

//App.PostView = Marionette.ItemView.extend({
  //  template : "#onPost"
//});

// we need some sort of composite view, idk how that works 

var Blog = Backbone.Model.extend();

//var start = new Blog({name:"Name"});
var b = new Blog({blog:"heres my blog"});
var c = new Blog([b]);

App.start();
