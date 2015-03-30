var App = new Backbone.Marionette.Application();

App.addRegions({
    blog: "#blog",
    newPostplace :"#poster"
});

App.on("start",function(){
    console.log("onStart");

    //var new_Posts = new App.BlogView({model: b});
    //App.newPostplace.show(new_Posts);

    //var allnewPosts = new App.BlogsView({collection: c});
    //App.newPostplace.show(allnewPosts);

    var bloggy = new App.CompView();
    App.blog.show(bloggy);

   // var pblog = new App.BlogView();
    //App.blog.show(pblog);
    Backbone.history.start();
});

App.CompView = Marionette.CompositeView.extend({
    template: "#newPost",
    childView : App.BlogView,
    childViewContainer: "tbody",
    modelEvents : {
	"change" : function() { this.render(); }
    } ,
    events : {
        "click #add" : function() {
            var n = $("#nPost").val();
            if (n.length > 0){
                this.c.add(new Blog({blog:n}));
                this.c.sort();
                $("#nPost").val("");
                
                }
            }
        }
});
					       
App.BlogView = Marionette.ItemView.extend({
    template : "#blogPost",
    
    //NEED A DELETE FUNCTION
    //events : {
      //  "click"

  //  }
    modelEvents : {
            "change" : function() {this.render();}
    },
});
App.BlogsView = Marionette.CollectionView.extend(
{
    childView : App.BlogView
}
    );

//App.PostView = Marionette.ItemView.extend({
  //  template : "#onPost"
//});

// we need some sort of composite view, idk how that works 

var Blog = Backbone.Model.extend();
var Blogs = Backbone.Collection.extend({
    model:Blog

});

//var start = new Blog({name:"Name"});
var b = new Blog({blog:"heres my blog"});
var c = new Blog([b]);

App.start();
