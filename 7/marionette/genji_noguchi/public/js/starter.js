
/* init */
App.on("start", function() {
	console.log("App starting");

	var homeView = new App.HomeView();
	App.mainRegion.show(homeView);

	var headerView = new App.HeaderView();
	App.headerRegion.show(headerView);

	var footerView = new App.FooterView();
	App.footerRegion.show(footerView);

	Backbone.history.start();
});

App.start();
