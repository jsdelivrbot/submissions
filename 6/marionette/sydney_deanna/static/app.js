var App = new Backbone.Marionette.Application();

App.addRegions({
    blog: "#blog",
    post : "#post",
   
});

App.on("start",function(){
    console.log("onStart");

    //var new_Posts = new App.BlogView({model: b});
    //App.newPostplace.show(new_Posts);

    //var allnewPosts = new App.BlogsView({collection: c});
    //App.newPostplace.show(allnewPosts);
    
    
    
    var pblog = new App.BlogView();
    App.blog.show(pblog);
    

    var bloggy = new App.CompView({collection:c, model:b});
    App.post.show(bloggy);

    Backbone.history.start();
});

App.CompView = Marionette.CompositeView.extend({
    template: "#newPost",
    childView : App.BlogView,
    childViewContainer:"ul",
    collection : c, 
    modelEvents : {
	"change" : function() { this.render(); }
    } ,
    events : {
        "click #add" : function() {
            var n = $("#nPost").val();
            console.log(n);
            if (n.length != 0);{
                this.collection.add(new Blog({blog:n}));
                $("#nPost").val("");
                }
            }
        }
});
					       

App.BlogView = Marionette.ItemView.extend({
    template : "#blogPost",
    tagName: "tr"
    
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
var x = new Blog({blog:"my second blog"});
var c = new Blogs([]);

App.start();
