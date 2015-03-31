var App = new Marionette.Application();

App.addRegions({
    entries: '#entries',
    comments: '#comments'
});

App.on("start",function(){
    console.log('starting app');
    var entriesView = new App.EntriesView({collection:e});
    App.entries.show(entriesView);
    //var commentsView= new App.CommentsView({collection: new Comments({'entry':''})});
    //App.comments.show(commentsView);
});

/* Entries */

App.EntryView = Marionette.ItemView.extend({
    template : '#entry-template',
    tagName : "tr",
    modelEvents : {
	"change" : function() {
	    console.log('changing model');
	    this.render();
	}
    },
    events : {
	'click' : function() {
	    //console.log(this.model);
	    var that = this;
	    var comments = new Comments();
	    comments.entry = this.model.get('id');
	    var commentsView = new App.CommentsView({collection: comments, model: that.model});
	    console.log(commentsView);
	    App.comments.show(commentsView);
	}
    }
});

App.EntriesView = Marionette.CompositeView.extend({
    template : '#entry-composite-template',
    childView : App.EntryView,
    childViewContainer : 'tbody',
    modelEvents : {
	'change' : function() {this.render(); }
    },
    events : {
	'click #addentry' : function(){
	    var n = $('#newentryname').val();
	    if (n.length > 0){
		var newE = new Entry({name:n});
		this.collection.add(newE);
		newE.save();
		$('#newentryname').val('');
	    }
	}
    }
});

var Entry = Backbone.Model.extend({
    urlRoot: '/entries'
});
var Entries = Backbone.Collection.extend({
    model: Entry,
    url: '/entries',
    initialize: function(){
	this.fetch(function(d){
	    console.log(d);
	    this.render();
	});
    }
});

/* Comments */

App.CommentView = Marionette.ItemView.extend({
    template : '#comment-template',
    tagName : "tr",
    modelEvents : {
	"change" : function() {
	    console.log('changing model');
	    this.render();
	}
    },
    events : {
	'click' : function() {console.log(this);}
    }
});

App.CommentsView = Marionette.CompositeView.extend({
    template : '#comment-composite-template',
    childView : App.CommentView,
    childViewContainer : 'tbody',
    initialize: function(){
	console.log(this.model);
	var that = this;
	//this.collection.fetch({data: $.param({'name':that.get('entry')})});
	this.collection.setEntry(this.model.id);
    },
    modelEvents : {
	'change' : function() {this.render(); }
    },
    events : {
	'click #addcomment' : function(){
	    var n = $('#newcommentname').val();
	    if (n.length > 0){
		console.log(n);
		var newC = new Comment({content:n, entry:this.model.id});
		//console.log(this.collection);
		console.log(newC);
		this.collection.add(newC);
		newC.save();
		$('#newcommentname').val('');
	    }
	}
    }
});

var Comment = Backbone.Model.extend({
    urlRoot: '/comments'
});
var Comments = Backbone.Collection.extend({
    model: Comment,
    url: '/comments',
    setEntry: function(n){
	console.log(this.entry);
	this.fetch({data: $.param({'entry':n})},function(d){
	    console.log(d);
	    this.render();
	});
    }
});

var e1 = new Entry({name:'Entry #1'});
var e2 = new Entry({name:'Entry #2'});
var e = new Entries([e1,e2]);

App.start();
