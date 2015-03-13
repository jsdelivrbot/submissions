console.log("HELLO");

var Place = Backbone.Model.extend({
    showchange: function(){
	console.log("Changing: "+this.toString());
    },
    initialize:function(){
	this.on("change",this.showchange);
    },
    destroy: function() {
	this.off("change",showchange);
    },
    defaults: {
	name :"Place name",
	rating:0,
	alive: true
    },
    validate : function(attrs,options) {
	if (isNaN(attrs.rating)){
	    return "need number";
	}
    }
});

var PlaceView = Backbone.View.extend({
    el			: "#edit",
    template	:  _.template($("#place_template").html()),
    events:{
	"click #up" : function(e) {
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r + 1;
	    this.model.set("rating",r);
	    this.render();
	},
	
	"click #down" : function(e) {
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r - 1;
	    this.model.set("rating",r);
	    this.render();
	},
	
	"click #del" : function(e) {
	    this.model.set("alive", false);
	    this.remove();
	}
    },
    initialize:function(){
	this.render();
    },
    render: function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }

});


var p1 = new Place({name:"Terry's",rating:5,alive:true});
var pv1 = new PlaceView({model:p1});

var View = Backbone.View.extend({
    el : "#place",
    template :  _.template( $("#view_template").html() ),

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
       console.log("alive:" + model.get("alive"));
       if (this.model.attributes.alive){
           this.render();
       }
       else{
	   this.remove();
       }
    }


});


var v1 = new View({model:p1});