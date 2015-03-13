var Place = Backbone.Model.extend({
    onChange : function() {
	v1.render();
	v2.render();
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
	comment: ""
    },
    validate : function(attr,options){
	if (isNaN(attr.rating)){
	    return "Need a number";
	}
    }
});

var PlaceView = Backbone.View.extend({
    el : "#place",
    template: _.template($("#place_template").html()),
    template1: _.template($("#comments_template").html()),
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
	},
	"click .update" : function(e){
	    this.model.set("comment",$("#commentbox").val());
	    this.render();
	}
    },
    initialize : function(e) {
	if(this.op!=e['op']){
	    this.template=this.template1;
	}
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
var v2 = new PlaceView({model:p1,el:"#comments",op:1});
//v1.listenTo(v2.model,'onChange',v1.render());
//v2.listenTo(v1.model,'onChange',v2.render());

