console.log("HELLO");

var Place = Backbone.Model.extend({
    onChange : function() {
	console.log("I wish i could render");
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
    }
});
var PlaceViewMaker = function(id,temp,eevees){
    return Backbone.View.extend({
	el : id,
	template :  _.template( $(temp).html() ),
	events : eevees,
	initialize : function() {
	    this.render();
	},
	render:function() {
	    var e = this.template(this.model.toJSON());
	    this.$el.empty();
	    this.$el.append(e);
	    return this;
	}
    });
}

var PlaceView = PlaceViewMaker("#place","#place_template",{});
var PlaceView2 = PlaceViewMaker("#number","#number_template",{
    //    "change" : function(e){
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
});
var p1 = new Place({name:"Terry's",rating:5});
var v1 = new PlaceView({model:p1});
var v2 = new PlaceView2({model:p1});//HOW TO RENDER v1
