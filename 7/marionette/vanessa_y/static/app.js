var App = new Marionette.Application();

App.addRegions({
    view:"#view"
});

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region"
});

App.on("start", function(){
    console.log("i started");
    var collectionView = new App.collectionView({collection:c});
    App.firstRegion.show(collectionView);
    var comp = new App.compositeView({collection:c});
    App.secondRegion.show(comp);
    Backbone.history.start();
});


App.compositeView = Marionette.CompositeView.extend({
    template: "#composite",
    childView: App.collectionView,
    childViewContainer: "#itemviews",
    events: {
	"click #add": function(){
	    var item = $("#item").val();
	    if (item.length>0){
		this.collection.add(new thing({thing: item}));
		$("#item").val("");
	    }
	}
    }
});

App.collectionView = Marionette.CollectionView.extend({
    template: "#collection",
    childView: App.viewView,
    childViewContainer: "#list"
});

App.viewView = Marionette.ItemView.extend({
    template:"#viewthing",
    modelEvents: {
	"change": function(){
	    this.render()
	}
    }
});

App.thingView = Marionette.ItemView.extend({
    template: "#thing",
    modelEvents: {
	"change": function(){
	    this.render()
	}
    },
    events: {
	"click #del": function(){
	    console.log("HELP I NEE TO DELETE")
	}
    }
});

var thing = Backbone.Model.extend({});
var things = Backbone.Collection.extend({
    model: thing
});

var item1 = new thing({thing: "mow the lawn"});
var item2 = new thing({thing: "do the dishes"});
var item3 = new thing({thing: "feed the dragon"});
var c = new things([item1,item2,item3]);

App.start();
