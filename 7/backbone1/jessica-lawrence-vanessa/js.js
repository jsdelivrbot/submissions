console.log("HELLO");

var Place = Backbone.Model.extend({
    onChange: function() {
	var i;
	var views = this.get("views")
	for(i=0; i<views.length; i++) {
	    views[i].render();
	}
	console.log("Changed");
    },
    initialize: function(){
	this.on("change",this.onChange);
    },
    destroy:function(){
	this.off("change",this.onChange);
    },
    defaults: {
	name: "Name goes here",
	rating: 5,
	views: []
    },
    validate: function(attr,options){
	if (isNaN(attr.rating)){
	    return "Need a number";
	}
    },
    addView: function(view) {
	console.log(this);
	this.get("views").push(view);
    }
});

var PlaceView = Backbone.View.extend({
    el : "#place",
    template :  _.template( $("#place_template").html() ),
    events : {
	"click .del" : function(e){
	    this.remove();
	},
	"click .up" : function(e){
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r + 1;
	    this.model.set("rating",r);
	    this.render();
	},
	"click .down" : function(e){
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r - 1;
	    this.model.set("rating",r);
	    this.render();
	}
	
    },
    initialize : function() {
	this.model.addView(this);
	this.render();
    },
    render:function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }
});

var StaticPlaceView = Backbone.View.extend({
    el : "#static",
    template :  _.template( $("#static_place_template").html() ),
    events : {	
    },
    initialize : function() {
	this.model.addView(this);
	this.render();
    },
    render:function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }
});


var p1 = new Place({name:"Terry's",rating:5});
var v1 = new PlaceView({model:p1});
var sv1 = new StaticPlaceView({model:p1});
