console.log("Hello");

var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "second-region",
    thirdRegion: "#third-region",
    fourthRegion: "#fourth-Region"
});

App.on("start",function(){
    console.log("test");

    var resultView = new App.ResultView();
    App.fourthRegion.show(resultView);

    var changeView = new App.ChangeView({model:f1});
    App.secondRegion.show(changeView);

    var changesView = new App.ChangesView({collection:c});
    App.thirdRegion.show(changesView);

    var addFlavor = new App.AddFlavor({collection:c, model : f});
    App.firstRegion.show(addFlavor);

    Backbone.history.start();
});

App.ResultView = Marionette.ItemView.extend({
    template : "#result-template"
});

App.ChangeView = Marionette.ItemView.extend({
    template : "#change-template",
    tagName : "tr",
    events : {
	"click #delete" : function() {this.remove();}
    },
    modelEvents: {
	"change":function(){
	    this.render();
	}}
});

App.ChangesView = Marionette.CollectionView.extend({
    childView : App.ChangeView
});

var Flavor = Backbone.Model.extend();
var Flavors = Backbone.Collection.extend({
    model:Flavor,
    comparator:"flavor"
});

App.AddFlavor = Marionette.CompositeView.extend({
    template: "#flavor-template",
    childView: App.ChangeView,
    childViewContainer: "tbody",
    modelEvents: {
	"change":function(){
	    this.render();
	}},
    events: {
	"click #add" : function(){
	    var n = $("#newflavor").val();
	    if (n.length > 0){
		this.collection.add(new Flavor({flavor:n}));
		$("#newflavor").val("");
		this.collection.sort();
	    }
	}
    }
});


var f1 = new Flavor({name:"Strawberry"});
var c = new Flavors([f1]);
