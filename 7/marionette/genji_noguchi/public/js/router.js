App.router = new Marionette.AppRouter({
	controller : MainController,

	appRoutes  : {
		"/"				: "home",
		portfolio		: "portfolioRoute"
	}
})
