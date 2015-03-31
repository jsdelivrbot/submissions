console.log("HELLO WORLD!");

var App = new Marionette.Application();

var Tel = Backbone.Model.extend();

App.tel = new Tel({t : ""});

App.addRegions({
		place: "#place",
		telMaker: "#tel-maker",
});

App.on("start",function(){
		console.log("STARTING");
		var staticView = new App.StaticView({model : App.tel});
		App.place.show(staticView);

		var createView = new App.CreateView();
		App.telMaker.show(createView);

		Backbone.history.start();

});


App.StaticView = Marionette.ItemView.extend({
		template: "#static-template",
		events : {
				"click #add" : function(){
						var n = $("#addWords").val();
						if (n.length > 0){
								console.log(App.tel.get("t"));
								var temp = App.tel.get("t")+" ";
								App.tel.set({t : temp + n});
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
								App.tel.set({t : b, title : a});
								App.place.show(new App.StaticView({model : App.tel}));
						}
				}
		}
});




App.start();
