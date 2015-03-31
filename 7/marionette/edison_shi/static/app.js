console.log("Hello");

var App = new Marionette.Application();

App.addRegions({
    view: "#view"
});

App.on("start",function(){
    var resultView = new App.AddFlavor({collection: c, model:f1});
    App.view.show(resultView);
});

App.ResultView = Marionette.ItemView.extend({
    template : "#result-template",
    tagName: "td",
    modelEvents:{
	"change": function(){
	    this.render();
	}
    }
});

App.AddFlavor = Marionette.CompositeView.extend({
    template: "#flavor-template",
    childView: App.ResultView,
    childViewContainer: "tr",
    modelEvents: {
	"change":function(){
	    this.render();
	}},
    events: {
	"click #add" : function(){
	    var f = $("#flavor").val();
	    if (f.length > 0){
		this.collection.add(new Flavor({flavor:f}));
		$("#flavor").val("");
	    }
	    this.render();
	}
    }
});

var Flavor = Backbone.Model.extend(

);

var Flavors = Backbone.Collection.extend({
    model: Flavor,
    initialize: function(){

    }
});

var Flav = Backbone.Model.extend()
var flav1 = new Flav({name: "Strawberry"});
var f1 = new Flavor({flavor: "Chocolate"});
var f2 = new Flavor({flavor: "Vanilla"});
var c = new Flavors([f1,f2]);

App.start();
