console.log("HELLO");

var Place = Backbone.Model.extend({
    onChange : function() {
	console.log("Changed");
    },
    initialize : function(){
	this.on("change",this.onChange);
    },
    destroy:function(){
	this.off("change",this.onChange);
    },
    defaults: {
	name : "Name goes here",
	rating : 5
    },
    validate : function(attr,options){
	if (isNaN(attr.rating)){
	    return "Need a number";
	}
    }
});

var PlaceView = Backbone.View.extend({
    el : "#place",
    el2 : "#comment",
    template :  _.template( $("#place_template").html() ),
    template2 :  _.template( $("#comment_template").html() ),
    events : {
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
	this.render();
    },
    render:function() {
	var e = this.template(this.model.toJSON());
	var e2= this.template2(this.model.toJSON());
	this.$el.empty();
	this.$el2.empty();
	this.$el.append(e);
	this.$el2.append(e2);
	return this;
    }
});


var p1 = new Place({name:"Terry's",rating:5});
var v1 = new PlaceView({model:p1});
