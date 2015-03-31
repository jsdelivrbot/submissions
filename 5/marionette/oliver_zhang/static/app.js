console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
	region1: '#blog'
	    });

var Post = Backbone.Model.extend({
	idAttribute: '_id',
	defaults: {
	    post: '',
	    poster: 'anon'
	}
    });

var Blog = Backbone.Collection.extend({
	model: Post,	
    });

App.PostView = Marionette.ItemView.extend({
	template: "post-template",
	tagName: "tr",
	modelEvents: {
	    "change": function() {
		this.render();
		this.model.save();
	    }
	}
	});

App.BlogView = Marionette.CompositeView.extend({
	template: "#blog-template",
	childView: App.PostView,
	childViewContainer: 'tbody',
	events: {
	    'click #submit': function() {
		var Formpost = $('#post').val();
		var Formposter = $('#poster').val();
		var newPost = this.collection.create({post: Formpost, poster: Formposter})
		$('#post').val('');
		$('#poster').val('');
	    }
	}


    });

App.on("start",function() {
	var test = new Blog();
	var view = new App.BlogView({collection:test});
	App.region1.show(view);

    });
App.start();
