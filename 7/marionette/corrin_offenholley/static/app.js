var App = new Marionette.Application();


var Thoughts = Backbone.Model.extend();
App.thoughts = new Thoughts({Terrys:"Healthy!", Ferrys:"Probably not!", MacDonalds:"Even worse!", Cafeteria:"Do you have a death wish?"});

var t = document.getElementById("test");
t.innerHTML="Workdammit";

App.addRegions({
	place: "#place"


});

App.on("start",function(){
		
		var staticView = new App.StaticView({model : App.thoughts});
		App.place.show(staticView);

		
		


		Backbone.history.start();

});

App.StaticView = Marionette.ItemView.extend({
	template : "#static-template"
});

App.StaticView = Marionette.ItemView.extend({
		template: "#static-template",
		events : {
				"click #TR" : function(){
						var n = $("#review").val();
						if (n.length > 0){
								App.thoughts.set({Terrys : n});
								this.render();
						}
				},
				"click #FR" : function(){
						var n = $("#review").val();
						if (n.length > 0){
								App.thoughts.set({Ferrys : n});
								this.render();
						}
				},
				"click #MR" : function(){
						var n = $("#review").val();
						if (n.length > 0){
								App.thoughts.set({MacDonalds : n});
								this.render();
						}
				},
				"click #CR" : function(){
						var n = $("#review").val();
						if (n.length > 0){
								App.thoughts.set({Cafeteria : n});
								this.render();
						}
				}
		}
		
});

App.start();
