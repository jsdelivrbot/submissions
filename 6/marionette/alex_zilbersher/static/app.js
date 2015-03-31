var App = new Marionette.Application();

App.addRegions({
    aRegion : "#adding-region"
});

App.on("start", function(){
    var addview = new App.AddView({collection:x, model:start});
    App.aRegion.show(addview);
    var staticview = new App.StaticView();
});

App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});

App.LineView = Marionette.ItemView.extend({
    template : "#l",
    tagName : "li",
    modelEvents : {
	"change" : function(){
	    this.render();}
    }
})

App.PoemView = Marionette.CollectionView.extend({
    template : "#poem-template",
    childView : App.LineView,
});

App.AddView = Marionette.CompositeView.extend({
    template : "#add-template",
    childView : App.LineView,
    childViewContainer : "ul",    
    events : {
	"click #add" : function(){
	    var n = $("#new").val();
	    if (n.length != 0){
		this.collection.add(new L({l:n}));
		$("#new").val("");
	    }
	}
    }
});

var L = Backbone.Model.extend();
var PoemView = Backbone.Collection.extend({
    model:L
});

var start = new L({l:"To be, or not to be..."});
var x = new PoemView([start]);

App.start();
