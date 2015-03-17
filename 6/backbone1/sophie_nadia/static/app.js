console.log("HELLO");

var Place = Backbone.Model.extend({
    showchange: function(){
	console.log("Changing: "+this.toString());
    },
    initialize:function(){
	this.on("change",this.onchange);
    },
    destroy: function() {
	this.off("change",showchange);
    },
    defaults: {
	name :"Place name",
	rating:0,
	review:''
    },
    validate : function(attrs,options) {
	if (isNaN(attrs.rating)){
	    return "need number";
	}
    }
});

var EditView = Backbone.View.extend({
    el : "#edit",
    template :  _.template($("#edit_template").html()),
    events : {
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
	"click #change" : function(e){
	    var r = $("#t").val();
	    this.model.set('review',r);
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


var PlaceView = Backbone.View.extend({
    el : "#place",
    template :  _.template($("#place_template").html()),
    initialize:function(){
	var that = this;
	this.model.on("change",function(){
	    that.render();
	});
    },
    render: function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	return this;
    }
});

var MultiView = Backbone.View.extend({
    el: "#places",
    initialize : function(){
	var that = this;	
	this.render();
    },
    render: function(){
	this.$el.empty();
	for (var i = 0 ; i < this.model.length; i++ ){
	    var v = new PlaceView({model:this.model[i]});
	    this.$el.append(v.$el);
	}
	return this;
    } 
});


var p1 = new Place({name:"Terry's",rating:5});
var v1 = new PlaceView({model:p1});
var e1 = new EditView({model:p1});

var c = [p1,p2];
var mv = new MultiView({model:c});
