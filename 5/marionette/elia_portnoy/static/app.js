console.log("HELLO");

var App = new Marionette.Application();


App.addRegions({
	storyRegion:"#region1"
});

App.on("start",function() {
		console.log("Started");
		var CompositeView = new App.CompositeView({collection:collec, model:test_line});
		App.storyRegion.show(CompositeView);
		Backbone.history.start();
});

App.storyView = Marionette.ItemView.extend({
		template: "#display-template",
		tagName: "li",
		events: {
				"click #delete" : function(){
						this.remove();
				}
		},
		modelEvents : {
				"change" : function() {
					this.render();
					this.model.save();
				}
		}
});

App.CompositeView = Marionette.CompositeView.extend({
		template: "#story_temp-template",
		childView: App.storyView,
		childViewContainer : "div",
		events : {
				"click #addbutt" : function() {
						var in1 = $("#nextWord1").val();
						var in2 = $("#nextWord2").val();
						var in3 = $("#nextWord3").val();
						if (in1.length > 0 && in2.length > 0 && in3.length > 0){
								var input = in1+' '+in2+' '+in3+' ';
								this.collection.add(new Line({storystr: input}));
								$("#nextWord1").val("");
								$("#nextWord2").val("");
								$("#nextWord3").val("");
						}

				}
		}
});

var Line = Backbone.Model.extend();
var MainView = Backbone.Collection.extend({
    model: Line,
	url: 'save_data',
	initialize: function() {
        this.fetch();
        var that = this;
        setInterval(function() {
            that.fetch();
        }, 3000);
    }
});

var test_line = new Line();
var collec = new MainView([]);

App.start();
