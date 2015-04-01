var App = new Marionette.Application();

App.addRegions({
    mainRegion: "#content"
});

App.on("start", function(){
    console.log("Begin.");
    var addBoxes = new App.BoxesView({collection: main, model: def1});
    App.mainRegion.show(addBoxes);
});

Box = Backbone.Model.extend();

BoxCollection = Backbone.Collection.extend({
    model: Box
});

BoxView = Backbone.Marionette.ItemView.extend({
    template: "#box-template",
});

BoxesView = Backbone.Marionette.CompositeView.extend({
    childView : App.BoxView,
    childViewContainer : "b",
    template: "box-collection-template",
    events : {
	"click #addBox" : function(){
	    console.log("Working");
	    var input = $("#boxinput").val();
	    if (input.length > 0){
		this.collection.add(new Box({l: input}));
		$("#boxinput").val("");
	    }
	}
    }
});

var def1 = new Box({text: "Something something."});
var def2 = new Box({text: "Other stuff something."});
var main = new BoxesView([def1, def2]);

App.start();
