console.log("LOL");

var Place = Backbone.Model.extend({
    onChange : function(){
	console.log("Changed");
    },
    initialize : function(){
	this.on("change",this.onChange);
    },
    destroy : function(){
	this.off("change",this.onChange);
    },
    defaults: {
	name: "NAME",
	rating: 0,
	comment: "Comment HERE!@!@!@!@!"
    },
    validate : function(attr,options){
	if (isNaN(attr.rating)){
	    return "Need a number";
	}
    }
    
});

var makeView = function(id,temp,evs){
    return Backbone.View.extend({
	el : id,
	template : _.template( $(temp).html() ),
	events : evs,
	initialize : function() {
	    this.listenTo(this.model, "change", this.render);
	    this.render();
	},
	render:function(){
	    var e = this.template(this.model.toJSON());
	    this.$el.empty();
	    this.$el.append(e);
	    console.log("hi");
	    return this;
	}
    })
};
    
var PlaceView = makeView("#place","#place_template",{});
var ReviewView = makeView("#review","#review_template",{
    "click .del" : function(e){
	this.remove();
    },
    "click .up" : function(e){
	var r = this.model.get("rating");
	r = parseInt(r);
	r = r + 1;
	this.model.set("rating",r);
	console.log("up");
	this.render();
    },
    "click .down" : function(e){
	var r = this.model.get("rating");
	r = parseInt(r);
	r = r - 1;
	this.model.set("rating",r);
	console.log("down");
	this.render();
    },
    processKey: function(e){
	if(e.which=== 13)
	    this.submit();
    },
    submit: function(e){
	e.preventDefault();
	var val = $("#comment").val();
	this.model.set({"comment":val});
	this.render();
    },
    "click .submit" : function(e){
	var val = $("#comment").val();
	this.model.set({"comment":val});
	this.render();
    }

});

var p = new Place({name: "Ferry's", rating: 100});
var v = new PlaceView({model:p});
var r = new ReviewView({model:p});
