App.MainController = Marionette.Controller.extend({
	initialize : function(options) {
		console.log("Initializing controller...");
	},

	start : function() {
		console.log("Starting in controller...");
	},



	home : function() {
		App.headerRegion.show(new App.HeaderView())
		App.mainRegion.show(new App.HomeView({}));
		App.footerRegion.show(new App.FooterView())
	},
	portfolioRoute : function() {
		App.headerRegion.show(new App.HeaderView())
		App.mainRegion.show(new App.PortfolioView({}))
		App.footerRegion.show(new App.FooterView())
	}
})

App.addInitializer(function(options) {
	App.mainController = new App.MainController();
})
