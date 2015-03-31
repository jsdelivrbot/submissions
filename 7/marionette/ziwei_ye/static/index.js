"use strict";

var App = new Backbone.Marionette.Application();

App.addRegions({
    header : "#header",
    main : "#main",
    footer : "#footer"});

var Song = Backbone.Model.extend({
    defaults : {
	name : 'unknown',
	album : 'unknown',
	artist : 'unknown',
	rating : 0,
	created : 0
    },
    initialize : function() {
	if (this.isNew()) {
	    this.set('created', Date.now());
	}
    }
});

var Songs = Backbone.Collection.extend({
    model : Song,
    comparator : "created"
});

App.SongView = Marionette.ItemView.extend({
    template : '#item-template',
    tagName : "tr",
    events : {
	"click #delete" : function() { this.remove(); }
    },
    modelEvents : {
	"change" : function() { this.render(); }
    }
});

App.MainView = Marionette.CompositeView.extend({
    template : "#main-template",
    childView : App.SongView,
    childViewContainer : "tbody",
    modelEvents: {
	"change" : function() { this.render(); }
    },
    events : {
	"click #add" : function(){
	    var n_name = $("#newname").val();
	    var n_rating = $("#newrating").val();
	    var n_album = $("#newalbum").val();
	    var n_artist = $("#newartist").val();
	    this.collection.add(new Song({name:n_name, rating:n_rating, album:n_album, artist:n_artist}));
	    $("#newname").val("");
	    $("#newartist").val("");
	    $("#newrating").val("");
	    $("#newalbum").val("");
	    this.collection.sort();
	}
    }   
});

App.on("start", function() {
    var main_view = new App.MainView({collection: new Songs([])});
    App.main.show(main_view);
});

App.start();
