var Place = Backbone.Model.extend({
    defaults: {
	name: "NAME",
	rating: 0
    }

});

var View = Backbone.View.extend({
    initialize: {
	this.render();
    },

    render: {
    }

});

var p = new Place({name: "Ferry's", rating: 100});
