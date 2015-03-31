console.log("HELLO WORLD!");

var App = new Marionette.Application();

var Story = Backbone.Model.extend();
App.story = new Story({s : "Once upon a time,", title : "Example"});
//var Stories = Backbone.Collection.extend();

App.addRegions({
		place: "#place",
		storyMaker: "#story-maker",
		otherStories: "#other-stories"
});

App.on("start",function(){
		console.log("STARTING");
		var staticView = new App.StaticView({model : App.story});
		App.place.show(staticView);

		var createView = new App.CreateView();
		App.storyMaker.show(createView);

		//var addView = new App.AddView();
		//App.storyMaker.show(addView);


		Backbone.history.start();

});


App.StaticView = Marionette.ItemView.extend({
		template: "#static-template",
		events : {
				"click #add" : function(){
						var n = $("#addWords").val();
						if (n.length > 0){
								console.log(App.story.get("s"));
								var temp = App.story.get("s")+" ";
								App.story.set({s : temp + n});
								//console.log(story.s);
								this.render();
						}
				}
		}
		
});

App.CreateView = Marionette.ItemView.extend({
		template: "#new-template",
		events : {
				"click #create" : function(){
						var a = $("#input-title").val();
						var b = $("#input-words").val();
						if (a.length > 0 && b.length > 0){
								App.story.set({s : b, title : a});
								//console.log(story.s);
								App.place.show(new App.StaticView({model : App.story}));
								this.render();
						}
				}
		}
});


var Collection = Backbone.Collection.extend({
		url:'stories',
		model : Story,
		initialize : function(){
				this.fetch();
				this.on({'add':function() {
						console.log("Added");
						//console.log(this);
				}});
		}
});

var c = new Collection();

console.log(c.fetch());

//console.log(c);


App.start();
