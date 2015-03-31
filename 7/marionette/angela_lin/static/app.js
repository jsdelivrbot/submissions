console.log("story testy")

var App = new Marionette.Application();

App.addRegions({
    mainList: "#main-list"
});

App.on("start", function(){
    console.log("start");
    //Backbone.history.start();
});

App.ToDo = Marionette.CompositeView.extend({
    template: "#composite-template",
    childView: App.PlaceView,
    childViewContainer : "tbody",
    events : {
	"click #add" : function() {
	    var n = $("#newname").val();
	    if (n.length > 0){
		//change this here
		this.collection.add(new Place({name:n,rating:0}));
		$("#newname").val("");
	    }

	}
    }
});
