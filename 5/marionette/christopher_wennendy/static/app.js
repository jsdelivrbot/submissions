var App = new Marionette.Application();

App.addRegions({
    firstRegion:"#first",
    secondRegion:"#second",
});


App.on("start",function() {
    var first = new App.First(model:v1);
    App.firstRegion.show(first);

    var second = new App.second(model:v2);
    App.secondRegion.show(second);

    Backbone.history.start();
});

App.FirstView = Marionette.ItemView.extend({
    template: "#first"
    events: {
	"click #submit" : function(e) {
	    var current = this.model.get('story');
	    var add = $('#edit').val();
	    current.push(add);
	}
    }
    modelEvents : {
	"change" : function() {this.render()}
    }
});

App.SecondView = Marionette.ItemView.extend({
    template: "#second"
    events: {
	"click #submit" : function(e) {
	    var current = this.model.get('story');
	    var add = $('#edit').val();
	    current.push(add);
	}
    }
    modelEvents : {
	"change" : function() {this.render()}
    }
});

var Place = Backbone.Model.extend({});
var Places  = Backbone.Collection.extend({
    model:Place
});

var Story = Backbone.Model.extend({});
var story = new Story({story: "" });

var v1 = new Place({story:"hello"});
var v2 = new Place({story:"hi"});
var c = new Places([v1,v2]);

App.start();
