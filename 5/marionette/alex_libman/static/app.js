var App = new Marionette.Application();

App.addRegions({
    blogArea: "#blogs"
});

App.on("start", function(){
    console.log("Blog engine started.");

    var blogsview = new App.BlogsView({collection:currentBlogs});
    App.blogArea.show(blogsview);
});


App.BlogView = Marionette.ItemView.extend({
    template: "#blogs-template",
    events: {
	    "click #delete" : function(){
	        this.remove();
	        $.ajax({
		        type: "DELETE",
		        url: "blogs",
		        dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    id: this.model.get("_id")
		        })
	        });
	    }
    },
    modelEvents: {
	"change" : function(){
            this.render();
        }
    }
});

App.BlogsView = Marionette.CompositeView.extend({
    template: "#overall-template",
    childView: App.BlogView,
    childViewContainer : "#blogs-wrapper",
    events: {
        "click #submit": function(){
            var t = $("#title").val();
            var n = $("#name").val();
            var c = $("#content").val();
            if (_.every([t,n,c],function(i){return i.length > 0;})){
                var that = this;
                //callback function for the ajax request
                var addToSite = function(id){
                    that.collection.add(new Blog({title:t, name:n, content:c, _id:id}));
                    $("#title").val("");
                    $("#name").val("");
                    $("#content").val("");
                };
                $.ajax({
                    type: "POST",
                    url: "blogs",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        title: t,
                        name: n,
                        content: c
                    }),
                    success: function(response){
                        //recieve id of entry when it is created, and put it onto the page with its id as an attribute
                        addToSite(response["id"]);
                    }
                });
            };
        }
    }
});


var Blog = Backbone.Model.extend({});
var Blogs = Backbone.Collection.extend({
    url: "blogs",
    model: Blog,
    initialize: function(){
        this.fetch();
    }
});

var currentBlogs = new Blogs();

App.start();
