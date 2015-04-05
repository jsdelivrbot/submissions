
/* init */
App.on("before:start", function(options) {
	/* Perhaps put a loading animation in here? */
	console.log("Initializing....");

})

App.on("start", function(options) {
	console.log("App starting.");
	
	
	/* Defining Regions */
	console.log("Initializing Regions")
	App.addRegions({
		headerRegion		: "#header",
		mainRegion			: "#main",
		footerRegion		: "#footer"
	})

	var homeView = new App.HomeView();
	App.mainRegion.show(homeView);

	var headerView = new App.HeaderView();
	App.headerRegion.show(headerView);

	var footerView = new App.FooterView();
	App.footerRegion.show(footerView);


	$.ajax({
		url			: options.apiURL + "/projects",
		type		: "GET",
		contentType	: 'application/json; charset=utf-8',
		
		success : function(results) {
			console.log(results);
		}


	})
	
	if(Backbone.history) {
		console.log("Starting Backbone history")
		Backbone.history.start();
	}

})

App.start(options);
