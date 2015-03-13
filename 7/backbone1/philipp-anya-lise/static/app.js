// The user enters reviews in the input with class "review". Inside the PlaceView we need to listen to when the user clicks the "update review" button", and update the model with the value inside the input "review". -- Philipp


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
	this.render();
    },
    render:function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }
});

var DisplayView = Backbone.View.extend({
    el : "#display",
    template :  _.template( $("#display_template").html() ),
    events:{},
    initialize : function() {
        this.listenTo(this.model, 'change', this.render);

	this.render();
    },
    render:function() {
        var e = this.template(this.model.toJSON());
        this.$el.empty();
        this.$el.append(e);
        return this;
    }
})

var p1 = new Place({name:"Terry's",rating:5, review: "Not bad"});
var v1 = new PlaceView({model:p1});
var v2 = new DisplayView({model:p1});
