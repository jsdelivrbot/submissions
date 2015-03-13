console.log("HELLO");
var globalPlaces = []
var Place = Backbone.Model.extend({
    onChange : function() {
	console.log("changed");
    },
    initialize : function(){
	this.on("change",this.onChange);
    },
    destroy:function(){
	this.off("change",this.onChange);
    },
    defaults: {
	name : "Name goes here",
	rating : 5,
	comment : "Ayyyyyyyy"
    }
});
var PlaceViewMaker = function(id,temp,eevees){
    return Backbone.View.extend({
	el : id,
	template :  _.template( $(temp).html() ),
	events : eevees,
	initialize : function() {
	    globalPlaces.push(this);
	    this.render();
	},
	render:function() {
	    var e = this.template(this.model.toJSON());
	    this.$el.empty();
	    this.$el.append(e);
	    return this;
	},
	renderAll : function(e) {
	    for (var i = 0; i < e.length; i++){
		e[i].render()
	    }
	}
    });
}

var PlaceView = PlaceViewMaker("#place","#place_template",{});
var PlaceView2 = PlaceViewMaker("#number","#number_template",{
    "click .up" : function(e){
	var r = this.model.get("rating");
	r = parseInt(r);
	r = r + 1;
	this.model.set("rating",r);
	this.renderAll(globalPlaces);
    },
    "click .down" : function(e){
	var r = this.model.get("rating");
	r = parseInt(r);
	r = r - 1;
	this.model.set("rating",r);
	this.renderAll(globalPlaces);
    },
    "click .submit" : function(e){
	var c = $("#txt").val();
	console.log(c);
	this.model.set("comment",c);
	this.renderAll(globalPlaces);
    }
});
var p1 = new Place({name:"Terry's",rating:5,comment:"10/10 would read again"});
var v1 = new PlaceView({model:p1});
var v2 = new PlaceView2({model:p1});//HOW TO RENDER v1
