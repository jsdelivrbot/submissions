var App = new Backbone.Marionette.Application();
var num = 0;
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
    
    
    
    var pblog = new App.BlogView({collection: c});
    App.blog.show(pblog);
    

    var bloggy = new App.CompView({collection:c, model:b});
    App.post.show(bloggy);

    Backbone.history.start();
});

App.CompView = Marionette.CompositeView.extend({
    template: "#blogPost",
    childView : App.BlogView,
    
    //childViewContainer:"ul",
    //collection : c 
    
});
					       

App.BlogView = Marionette.ItemView.extend({
    template : "#newPost",
    tagName: "tr",
    modelEvents : {
    "change" : function() { this.render(); }
    } ,
    events : {
        "click #add" : function() {
            var n = $("#nPost").val();
            console.log(n);
            if (n.length > 0);{
                num++;
                this.collection.add(new Blog({blog:n,pNumber:num}));
                $("#nPost").val("");
                
                }
            }
        }
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
//var currentdate = new Date(); 
var Blog = Backbone.Model.extend();
var Blogs = Backbone.Collection.extend({
    model:Blog
});


//var start = new Blog({name:"Name"});
var b = new Blog({blog:"heres my blog", pNumber: 0});
var x = new Blog({blog:"my second blog"});
var c = new Blogs([]);

App.start();
