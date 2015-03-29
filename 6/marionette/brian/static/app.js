var App = new Marionette.Application();

App.addRegions({
    entries: '#entries',
    comments: '#comments'
});

App.on("start",function(){
    console.log('starting app');
    var entriesView = new App.EntriesView({collection:e});
    console.log(e);
    App.entries.show(entriesView);
});

App.EntryView = Marionette.ItemView.extend({
    template : '#entry-template',
    tagName : "tr",
    modelEvents : {
	"change" : function() {
	    console.log('changing model');
	    this.render();
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
    urlRoot: '/entries',
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

var e1 = new Entry({name:'Entry #1'});
var e2 = new Entry({name:'Entry #2'});
var e = new Entries([e1,e2]);

App.start();
