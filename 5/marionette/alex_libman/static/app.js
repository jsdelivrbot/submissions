var App = new Marionette.Application();

App.addRegions({
    blogArea: "#blogs"
});

App.on("start", function(){
    console.log("Blog engine started.");

    var blogsview = new App.BlogsView({collection:testBlogs});
    App.blogArea.show(blogsview);
});


App.BlogView = Marionette.ItemView.extend({
    template: "#blogs-template",
    events: {
		"click #delete" : function(){
			this.remove();
		}
	},
	modelEvents: {
		"change" : function(){
            this.render();
        }
	}
});

App.BlogsView = Marionette.CollectionView.extend({
    childView: App.BlogView
});


var Blog = Backbone.Model.extend({});
var Blogs = Backbone.Collection.extend({
    model: Blog
});

var testBlog = new Blog({
    title: "Testing",
    name: "John Doe",
    content: "Blah blah blah"
});
var testBlog2 = new Blog({
    title: "Testing2",
    name: "John Doe2",
    content: "Blah blah 2blah"
});
var testBlogs = new Blogs([testBlog,testBlog2]);

App.start();
