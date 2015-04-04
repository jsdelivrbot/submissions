App.ProjectView = Marionette.ItemView.extend({
	templace 	:"#project-template",
	modelEvents : {
		"change"	: function() {
			this.render();
		}
	}
})
