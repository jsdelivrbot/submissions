
var PlaceView = Backbone.View.extend({
    el : "#place",
    template :  _.template( $("#place_template").html() ),
    
    initialize : function() {
	this.render();
	var that = this;
	this.model.on("change",function(){

	    that.render();
	});
    },
    render:function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }
});
var EditView = Backbone.View.extend({
    el : "#edit",
    events : {
	"click #r" : function(e){
	    console.log( $("#review").val());
	    this.model.set("review", $("#review").val());
	    this.render();
	    v1.render();
	},
	"click #up" : function(e){
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r + 1;
	    this.model.set("rating",r);
	    this.render();
	    v1.render()
	},
	"click #down" : function(e){
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r - 1;
	    this.model.set("rating",r);
	    this.render();
	    v1.render()
	}
	
    },
    template :  _.template( $("#edit_template").html() ),
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


var Place = Backbone.Model.extend({
    initialize : function(){
	
    },
    defaults: {
	'name' : "Name goes here",
	'rating' : '5',
	'review': "review"},
    validate : function(attr,options){
	if (isNaN(attr.rating)){
	    return "Need a number";
	}
    }
});



var p1 = new Place({name:"Terry's",rating:5});
var v1 = new EditView({model:p1});
var v2 = new PlaceView({model:p1});



