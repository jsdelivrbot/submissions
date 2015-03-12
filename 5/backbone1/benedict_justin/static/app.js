console.log("HELLO");

var PlaceView = Backbone.View.extend({
		el:"#place",
		//template: _.template("<tr><td><%= name %></td><td><%= rating %></td></tr>"),
		template: _.template($("#place_template").html()),
		events: {
				"click #del" : function(e) {
						this.remove();
				},
				"click #up" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r + 1;
						this.model.set('rating',r);
						this.render();
				},
				"click #down" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r - 1;
						this.model.set('rating',r);
						this.render();
				},
		},
		initialize:function(){
				this.render();
		},
		render: function(){
				var e = this.template(this.model.toJSON());
				this.$el.empty();
				this.$el.append(e);
				return this;
		}


});

var ZWantsMoarViews = Backbone.View.extend({
		el:"#place",
		//template: _.template("<tr><td><%= name %></td><td><%= rating %></td></tr>"),
		template: _.template($("#place_template").html()),
		events: {
				"click #change" : function(e) {
						var text = document.getElementById("newText");
						this.model.set('description',text);
						this.render();
				},
		},
		initialize:function(){
				this.render();
		},
		render: function(){
				var e = this.template(this.model.toJSON());
				this.$el.empty();
				this.$el.append(e);
				return this;
		}


});


var Place = Backbone.Model.extend({
		initialize: function() {
				this.on({"change":function() {
						console.log("Changed"+this.toJSON())}});
		},
		defaults:{'name':'name goes here','rating':0, 'description': "Hello World, Everyone knows Sophie's is Best" },
		validate:function(attrs,options){
				if (isNaN(attrs.rating)){
						return "Rating must be numeric";
				}
		}
});

var p1 = new Place({name:"Terry's", rating:5, description:"pair program is decent"});
var p2 = new Place({name:"Ferry's", rating:7});
var v1 = new PlaceView({model:p1});
var v2 = new ZWantsMoarViews({model:p1});
