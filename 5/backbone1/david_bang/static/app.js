console.log("HELLO");

var intial = true;

var PlaceViewEdit = Backbone.View.extend({
    el:"#place",
    //template: _.template("<tr><td><%= name %></td><td><%= rating %></td></tr>"),
    template: _.template($("#edit_template").html()),
    events: {
	"click #dedit" : function(e) {
	    var des = $("#d").val();
	    this.model.set('description',des);
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

var PlaceViewNonEdit = Backbone.View.extend({
    el:"#place",
    template: _.template($("#place_template").html()),
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
	     'description':'none'},
    validate:function(attrs,options){
	if (isNaN(attrs.rating)){
	    return "Rating must be numeric";
	}
    }
});

var p1 = new Place({name:"Terry's", rating:5});
var p2 = new Place({name:"Ferry's", rating:7});
var v1 = new PlaceViewEdit({model:p1});
v1.render();
intial = false;

$("#change").click(function(e){
    if (intial){
	var v = new PlaceViewEdit({model:p1});
	v.render();
	intial = false;
    }
    else{
	var v = new PlaceViewNonEdit({model:p1});
	v.render();
	intial = true;
    }
  
});
