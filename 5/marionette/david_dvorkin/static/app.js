var App = new Marionette.Application();

App.addRegions({
    commentArea: "#comments"
});

App.on("start", function(){
    console.log("Comment engine started.");

    var commentsview = new App.CommentsView({collection:currentComments});
    App.commentArea.show(commentsview);
});


App.CommentView = Marionette.ItemView.extend({
    template: "#comments-template",
    events: {
	    "click #delete" : function(){
	        this.remove();
	        $.ajax({
		        type: "DELETE",
		        url: "comments",
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

App.CommentsView = Marionette.CompositeView.extend({
    template: "#overall-template",
    childView: App.CommentView,
    childViewContainer : "#comments-wrapper",
    events: {
        "click #submit": function(){
            var n = $("#name").val();
            var c = $("#content").val();
            if (_.every([n,c],function(i){return i.length > 0;})){
                var that = this;
                var addToSite = function(id){
                    that.collection.add(new Comment({name:n, content:c, _id:id}));
                    $("#name").val("");
                    $("#content").val("");
                };
                $.ajax({
                    type: "POST",
                    url: "comments",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        //title: t,
                        name: n,
                        content: c
                    }),
                    success: function(response){
                        addToSite(response["id"]);
                    }
                });
            };
        }
    }
});


var Comment = Backbone.Model.extend({});
var Comments = Backbone.Collection.extend({
    url: "comments",
    model: Comment,
    initialize: function(){
        this.fetch();
    }
});

var currentComments = new Comments();

App.start();