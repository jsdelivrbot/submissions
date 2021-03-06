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
		    _.bindAll(this,"render");
		    this.model.bind("change",this.render);
		    this.render();
		},
		render: function(){
		    
		   
		    $(this.el).html(this.template(this.model.toJSON()));
		    
		    //this.$el.empty();
		    //this.$el.append(e);
		    return this;
		}


});


var PlaceView2 = Backbone.View.extend({
		el:"#place2",
		//template: _.template("<tr><td><%= name %></td><td><%= rating %></td></tr>"),
		template: _.template($("#place_template2").html()),
		events: {
				"click #del2" : function(e) {
						this.remove();
				},
				"click #up2" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r + 1;
						this.model.set('rating',r);
						this.render();
				},
				"click #down2" : function(e) {
						var r = this.model.get("rating");
						r = parseInt(r);
						r = r - 1;
						this.model.set('rating',r);
						this.render();
				},
		    "click #sub": function(e){
			var newName= $("#name1").val();
			if (newName !=""){
			console.log(newName);
			this.model.set('name',newName);
			    }
		    },
		    "click #sub2": function(e){
			var review= $("#review").val();
			console.log(review);
			if (review !=""){
			console.log(review);
			this.model.set('review',review);
			    }
		    }
		},
		initialize:function(){
		    _.bindAll(this,"render");
		    this.model.bind("change",this.render);
		    this.render();
		},
		render: function(){
		    
		   
		    $(this.el).html(this.template(this.model.toJSON()));
		    
		    //this.$el.empty();
		    //this.$el.append(e);
		    return this;
		}

});




var Place = Backbone.Model.extend({
		initialize: function() {
				this.on({"change":function() {
						console.log("Changed"+this.toJSON())}});
		},
		defaults:{'name':'name goes here','review':'No Review Yet',
							'rating':0},
		validate:function(attrs,options){
				if (isNaN(attrs.rating)){
						return "Rating must be numeric";
				}
		}
});

var p1 = new Place({name:"Terry's", rating:5});
var p2 = new Place({name:"Ferry's", rating:7});
var v1 = new PlaceView({model:p1});
var v2 = new PlaceView2({model:p1});
