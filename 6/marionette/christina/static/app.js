console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
		firstRegion: "#first-region",
		secondRegion: "#second-region",
		thirdRegion: "#third-region",
		fourthRegion: "#fourth-region"
});

App.on("start",function(){
		console.log("Starting");
		var staticview = new App.StaticView();
		App.fourthRegion.show(staticview);

		var placeview = new App.PlaceView({model:p1});
		App.secondRegion.show(placeview);

		var placesview = new App.PlacesView({collection:c});
		App.thirdRegion.show(placesview);

		var compview = new App.CompView({model:person,collection:c});
		App.firstRegion.show(compview);

		Backbone.history.start();

});

App.StaticView = Marionette.ItemView.extend({
		template : "#static-template"
});
