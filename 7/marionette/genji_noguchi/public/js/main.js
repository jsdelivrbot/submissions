console.log("init");

var App = new Marionette.Application();

/* Define Regions */
App.addRegions({
	headerRegion		: "#header",
	mainRegion			: "#main",
	footerRegion		: "#footer"
})
