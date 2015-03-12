console.log("HELLO");

var PlaceView = Backbone.View.extend({
    el:"#place",
    template: _.template($("#place_template").html()),
    events: {
	"click #del" : function(e) {
	    this.remove();
	},
	"click #up" : function(e) {
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r + 1;
	    this.model.set('rating',r);
	    this.render();
	},
	"click #down" : function(e) {
	    var r = this.model.get("rating");
	    r = parseInt(r);
	    r = r - 1;
	    this.model.set('rating',r);
	    this.render();
	},
	"click #change" : function(e) {
	    var r = this.model.get("description");
	    var n = this.model.get("text");
	    this.model.set('description', n);
	    this.render();
	},
    },
    initialize:function(){
	this.render();
    },
    render: function(){
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }


});

var Display = Backbone.View.extend({
    el:"#place",
    template: _.template($("#place_template").html()),
    events: {
    },
    initialize:function(){
	this.render();
    },
    render: function(){
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }

});


var Place = Backbone.Model.extend({
    initialize: function() {
	this.on({"change":function() {
	    console.log("Changed"+this.toJSON())}});
    },
    defaults:{'name':'name goes here',
	      'rating':0,
	      'description':'description goes here',
	      'text':'new text here'
	     },
    validate:function(attrs,options){
	if (isNaN(attrs.rating)){
	    return "Rating must be numeric";
	}
    }
});

var p2 = new Place({name:"Ferry's", rating:7, description: "this is sparta", text: ''});
var v1 = new PlaceView({model:p2});
