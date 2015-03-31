console.log("HELLO");

var PlaceView = Backbone.View.extend({
		el:"#place",
		//template: _.template("<tr><td><%= name %></td><td><%= rating %></td></tr>"),
		template: _.template($("#place_template").html()),
	
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
var PlaceView2 = Backbone.View.extend({
    el:'#edit',
    events: {
				"click #del" : function(e) {
				    this.remove();
				    v2.remove();
				},
				"click #up" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r + 1;
						this.model.set('rating',r);
				    	this.render();
				    	v2.render();
				    
				},
				"click #down" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r - 1;
						this.model.set('rating',r);
				    	this.render();
				    	v2.render();
				},
	},
    template: _.template($("#edit_template").html()),	
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
		defaults:{'name':'name goes here',
			  'rating':0,'review':'text goes here'},
		validate:function(attrs,options){
				if (isNaN(attrs.rating)){
						return "Rating must be numeric";
				}
		}
});

var p1 = new Place({name:"Terry's", rating:5});
var p2 = new Place({name:"Lerry's", rating:2});
var p3 = new Place({name:"Ferry's", rating:7});
var v1 = new PlaceView({model:p1});
var v2 = new PlaceView({model:p2});
var v3 = new PlaceView({model:p3});
var pv1 = new PlaceView2({model:p1, view:v1});
var pv1 = new PlaceView2({model:p2, view:v2});
var pv1 = new PlaceView2({model:p3, view:v3});


