var Portfolio = Backbone.Collection.extend({
	model : Project,
	comparator: "name"
})
