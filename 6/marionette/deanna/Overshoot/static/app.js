// I am actually dumbfounded at this point and have absolutely
// no idea why there are two textboxes and why the submit button
// does not post the text as I ask it to. I spent some time this weekend
// working on this. As well as quite a few hours today. So I
// am sorry that I cannot figure out how to get it to work.

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
    
    var bloggy = new App.CompView({collection:c, model:b});
    App.post.show(bloggy);
    
    var pblog = new App.BlogView();
    App.blog.show(pblog);
    
    Backbone.history.start();
});

App.CompView = Marionette.CompositeView.extend({
    template: "#newPost",
    childView : App.BlogView,
    childViewContainer:"ul",
    modelEvents : {
	"change" : function() { this.render(); }
    } ,
    events : {
        "click #add" : function() {
            var n = $("#nPost").val();
            if (n.length != 0){
                this.collection.add(new Blog({blog:n}));
                $("#nPost").val("");
                }
            }
        }
});
					       

App.BlogView = Marionette.ItemView.extend({
    template : "#blogPost",
    tagname : "li",
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

var Blogger = Backbone.Model.extend();
var blogger = new Blogger ({first: "sydney"})
//var start = new Blog({name:"Name"});
var b = new Blog({blog:"heres my blog"});
var c = new Blogs([b]);

App.start();
