App.PortfolioView = Marionette.CompositeView.extend({
	template 		: "#portfolio-template",
	childView		: App.ProjectView,
	modelEvents 	: {
		"change" : function() {
			this.render();
		}
	}
})

