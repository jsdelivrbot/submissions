var App = new Marionette.Application();

App.addRegions({
	threadsRegion : "#threads",
	postRegion : "#post"
});

var Thread = Backbone.Model.extend({
	idAttribute: '_id',
	defaults : {
		title : "na",
		content : "na",
		comments : []
	}
});

var Threads = Backbone.Collection.extend({
	model : Thread,
	url : "threads",
	initialize : function() {
		this.fetch();
		var that = this;
		// setInterval(function(){
		// 	that.fetch();
		// },10000);
	}
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
			this.model.collection.remove(this.model);
			console.log(this.model);	
			var del = "/thread/" + this.model.get('_id');
			$.ajax({
                    url: del,
                    type: 'DELETE'
            });
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
				var newThread = this.collection.create({ title:n, content:text }, {wait : true} );
				$("#newthread").val("");
				$("#postcontent").val("");
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


App.on("start",function(){
	console.log("HELLO");
	var threadsView = new App.ThreadsView({collection:c});
	App.threadsRegion.show(threadsView);

});

var c = new Threads([]);
App.start();
