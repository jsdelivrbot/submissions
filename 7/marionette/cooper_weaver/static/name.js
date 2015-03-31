console.log("HELLO WORLD!");

var App = new Marionette.Application();

var Message = Backbone.Model.extend();
App.message = new Message({m : "", l : ""});

App.addRegions({
		place: "#place",
		wholeMessage: "#message",
});

App.on("start",function(){
		console.log("STARTING");
       
		var staticView = new App.StaticView({model : App.message});
		App.place.show(staticView);

		var createView = new App.CreateView();
		App.wholeMessage.show(createView);
       
		Backbone.history.start();

});


App.StaticView = Marionette.ItemView.extend({
		template: "#static-template",
		events : {
				"click #add" : function(){
						var n = $("#addWord").val();
						if (n.length > 0){
								var temp = App.message.get("m")+" ";
								App.message.set({m : temp + n});
								App.message.set({l : n});
								this.render();
						}
				}
		}
		
});

App.CreateView = Marionette.ItemView.extend({
		template: "#new-template",
		events : {
				"click #reveal" : function(){
                                            App.wholeMessage.show(new App.DisplayView({model : App.message}));

				}
		}
});


App.DisplayView = Marionette.ItemView.extend({
        template: "#reveal-template",
        events: {
            "click #hide" : function(){
                            App.wholeMessage.show(new App.CreateView());
            }
        }
});




App.start();
