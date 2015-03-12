console.log("HELLO");


var Place = Backbone.Model.extend({
    onChange : function() {
	console.log("Changed");
    },
    initialize : function(){
	this.on("change",this.onChange);

    },
    /*destroy:function(){
	this.off("change",this.onChange);
	console.log("destroy");
    },*/
    defaults: {
	name : "Name goes here",
	rating : 5,
	review : "",
	alive: true
    },
    validate : function(attr,options){
	if (isNaN(attr.rating)){
	    return "Need a number";
	}
    }
});




var EditView = Backbone.View.extend({
    el : "#edit",

    template :  _.template( $("#edit_template").html() ),
    events : {
	"click .del" : function(e){
	    this.model.set("alive", false);
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
	},
	"click .submit" : function(e){
	    var r =$(".review")[0].value
	    console.log(r);
	    this.model.set("review",r);
	    this.render();
	}
	
    },
    initialize : function() {
	this.model.on("change", this.modelChanged, this);
	this.render();
    },
    render:function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    },
   modelChanged: function (model, changes) {
                console.log("modelChanged:" + model.get("title"));
                this.render();
   }


});


var p1 = new Place({name:"Terry's",rating:5,review:"Good food"});
var v2 = new EditView({model:p1});


var PlaceView = Backbone.View.extend({
    el : "#place",
    template :  _.template( $("#place_template").html() ),

    initialize : function() {
	this.model.on("change", this.modelChanged, this);
	this.render();
    },
    render:function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    },
   modelChanged: function (model, changes) {
                console.log("modelChanged:" + model.get("title"));
       if (this.model.alive){
                this.render();
       }
       else{
	   this.remove();
       }
   }


});


var v1 = new PlaceView({model:p1});

