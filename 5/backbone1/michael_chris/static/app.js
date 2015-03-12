console.log("HELLO");

var DescView = Backbone.View.extend({
    el:"#desc",
    
    template: _.template($("#desc_template").html()),
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

var Placeview = Backbone.View.extend({
    el:"#place",
    template: _.template($("#place_template").html()),
    events: {
	"click #changeview" : function(e) {
	    
	    var desc = document.getElementById("desc");
	    console.log(desc);
	    this.model.set('desc',desc);
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


var Place = Backbone.Model.extend({
    initialize: function() {
	this.on({"change":function() {
	    console.log("Changed"+this.toJSON())}});
    },
    defaults:{'name':'name goes here','rating':0, 'desc':'desc here'},
    validate:function(attrs,options){
	if (isNaN(attrs.rating)){
	    return "Rating must be numeric";
	}
    }
});

var p1 = new Place({name:"Ferry's", rating:7, desc: "Food"});

var v1 = new Placeview({model:p1});
var v2 = new DescView({model:p1});
