var App = new Marionette.Application();

App.addRegions({
	threadsRegion : "#threads",
	postRegion : "#post"
});

App.on("start",function(){
	console.log("HELLO");
	var threadsView = new App.ThreadsView({collection:c});
	App.threadsRegion.show(threadsView);

});

App.ThreadView = Marionette.ItemView.extend({
	template : "#thread-template",
	tagName : "span",
	modelEvent : {
		"change" : function() {
			this.render();
			this.model.save();
		},
	},
	events : {
		"click #view" : function() {
			var postView = new App.PostView({model : this.model});
			App.postRegion.show(postView);
		},
		"click #remove" : function () {
			//this.remove();
			this.model.collection.remove(this.model);
			console.log(this.model);	
			var del = "/thread"
			// $.ajax({
			// 	url:del,
			// 	type: "DELETE",
			// })
		},
	}
});

App.ThreadsView = Marionette.CompositeView.extend({
	template : "#threads-template",
	childView : App.ThreadView,
	childViewContainer : "div",
	events : {
		"click #add" : function(){
			var n = $("#newthread").val();
			if (n.length > 0){
				var text = $("#postcontent").val();
				this.collection.add({ title:n, content:text }, {wait : true} );
				$("#newthread").val("");
				$("#postcontent").val("");
				// $.ajax({
				// 	url:"/", 
				// 	type: "POST",
				// 	dataType: "application/json",
				// 	data:{
				// 		"title": n,
				// 		"content" : text
				// 	}
				// })
			}
		}
	}
});

App.PostView = Marionette.CompositeView.extend({
	template : "#post-template",
	childView : App.CommentView,
	childViewContainer : "div",
	modelEvent : {
		"remove" : function() {
			console.log("rendering");
			this.render();
			$("#content").val("");
			this.render();
		}
	},
	events : {
		"click #addcomment" : function(){
			var n = $("#commentcontent").val();
			if (n.length > 0){
				if (!this.model.comments) {
					this.model.comments = [n];
				}
				else {
					this.model.comments.push(n);
				}
				$("#commentcontent").val("");
				this.render();
			}
		},
	}
});

var Thread = Backbone.Model.extend({
	defaults : {
		title : "na",
		content : "na",
		comments : []
	},
	idAttribute: '_id',
});
var Threads = Backbone.Collection.extend({
	url : "/",
	model : Thread,
	initialize : function() {
		this.fetch();
		var that = this;
		// setInterval(function(){
		// 	that.fetch();
		// },10000);
	}
});

var c = new Threads([]);

App.start();
