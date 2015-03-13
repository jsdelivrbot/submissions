var post_sub = Backbone.Model.extend({
    defaults: {
	name: "",
	rating: 0,
	comment: "comment"
    },
    initialize : function(){
	this.on("change:comment",swal("Changed something or other."));
    },
    destroy : function(){
	this.off("change:comment",swal("Changed something or other."));
    },
});

var make_view = function(id, t, e){
    return Backbone.View.extend({
	el : id,
	template : _.template($(t).html()),
	events : e,
	initialize : function() {
	    this.listenTo(this.model, "change:comment", this.render);
	    this.render();
	},
	render : function(){
	    this.$el.empty();
	    this.$el.append(this.template(this.model.toJSON()));
	    return this;
	}
    })
};
    
var place_view = make_view("#place","#pub_view_temp",{});
var review_view = make_view("#sub","#upboat_slash_review_temp",{
    "click .del" : function(e){
	this.remove();
    },
    "click .up" : function(e){
	this.model.set("rating", parseInt(this.model.get("rating")) + 1);
	this.render();
    },
    "click .down" : function(e){
	this.model.set("rating", parseInt(this.model.get("rating")) - 1);
	this.render();
    },
    "click .submit" : function(e){
	var val = $("#comment").val();
	this.model.set({"comment":val});
	this.render();
    }
});

var p = new post_sub({name: "Ferry's", rating: 100});
var v = new place_view({model : p});
var r = new review_view({model : p});
