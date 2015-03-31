var App = new Marionette.Application();

// displaying individual lines
App.LineView = Marionette.ItemView.extend({
     template : "#line",
     tagName : "li",
     modelEvents : {
         "change" : function() { this.render(); }
     }                                        
})


// displaying all the lines
App.StoryView = Marionette.CollectionView.extend({
    childView : App.LineView,
    //childViewContainer : "ol",
});


// displaying + adding new lines -- old 
App.AddLine = Marionette.CompositeView.extend({
    childView : App.LineView,
    childViewContainer: "ol",
    template : "#add-line-template",
    events : {
        "click #add" : function() {
            var n = $("#newline").val();
            if (n.length > 0){
                m = new Line({l:n});
                $("#newline").val("");
		var that = this;
                m.save(m.toJSON(),{success:function(m,r){
                    if (r.result.n==1){
                        that.collection.add(m);
                        that.render();
                    }}})                                  
            }
        }
    }
});

// adding new blog post 
App.NewPost = Marionette.CompositeView.extend({
    childView : App.PostTitle,
    //childViewContainer: "ul",
    template : "#newpost",
    events : {
        "click #addpost" : function() {
            var t = $("#title").val();
	    var p = $("#content").val();
	    console.log(""+t +","+ p);
            //if (t.length > 0){
                this.collection.add(new Post({title:t,
					      content:p}));
                $("#title").val("");
		$("#content").val("");
		console.log("added Post");
            //}
        }
    }
});

App.PostTitle = Marionette.ItemView.extend({
    template : "#posttitle",
    tagName : "li",
    modelEvents : {
        "change" : function() { this.render(); }
    }             
});

App.AllPosts = Marionette.CollectionView.extend({
    childView : App.PostTitle,
    modelEvents : {
         "change" : function() { this.render(); }
     }  
    
});

var Line = Backbone.Model.extend({
    url:"/line",
    idAttribute:'_id',
});
var StoryView = Backbone.Collection.extend({
    model:Line,
    url:"/lines",
    initialize:function(){
        this.fetch(function(d){
            console.log(d);
            this.render();
        });
    }
});

var Post = Backbone.Model.extend();
var Posts = Backbone.Collection.extend({
    model: Post
});

App.addRegions({
    StoryDisplay : "#story-display",
    AddLineDisplay: "#add-line-display",
    NewBlogDisplay: "#new-blog-display",
    PostsDisplay: "#all-posts-display"
    
});

App.on("start", function(){
    console.log("Starting");              
       
    var addline = new App.AddLine({collection:c, model:l1});
    App.AddLineDisplay.show(addline);

    var newblog = new App.NewPost({collection:p,model:b1});
    App.NewBlogDisplay.show(newblog);

    var allposts = new App.AllPosts({collection:p});
    App.PostsDisplay.show(allposts);
       
    Backbone.history.start();      
});



var l1 = new Line({l:"This is the beginning of the story."});
var l2 = new Line({l:"This is a continuation of the story."});
var c = new StoryView([l1,l2]);

var b1 = new Post({title:"Hi",content:"lalalal"});
var p = new Posts([b1]);

App.start();



