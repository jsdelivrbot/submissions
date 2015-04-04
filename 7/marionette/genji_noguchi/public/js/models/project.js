var Project = Backbone.Model.extend();

var Portfolio = Backbone.Collection.extend({
	model : Project,
	comparator: "name"
})
