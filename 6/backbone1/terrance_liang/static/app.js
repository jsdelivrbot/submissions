console.log("HELLO");0

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
	rating:0
    },
    validate : function(attrs,options) {
	if (isNaN(attrs.rating)){
	    return "need number";
	}
    }
});

var PlaceView = Backbone.View.extend({
    el			: "#view",
    template	:  _.template($("#show_template").html()),
    initialize:function(){
	_.bindAll(this,"render");
	this.model.bind("change",this.render);//bind event "change" to render
	this.render();
    },
    render: function() {
	var e = this.template(this.model.toJSON());
	this.$el.empty();
	this.$el.append(e);
	var status = this.model.get("on");
	if (status=="no"){
	    this.remove();
	};
	return this;
    }

});
    
var PlaceEdit = Backbone.View.extend({
    el			: "#edit",
    template	:  _.template($("#edit_template").html()),
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
	    this.model.set("on","no");
	    this.remove();
	},
	"click #reviewsub": function(e) {
	    var rev = $("#review").val();
	    this.model.set("review",rev);
	    this.render();
	},
	"click #namesub": function(e){
	    var n = $("#name").val();
	    this.model.set("name",n);
	    this.render();
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


var p1 = new Place({name:"Terry's",rating:5,review:"hello",on:"yes"});
var e1 = new PlaceEdit({model:p1});
var p1 = new PlaceView({model:p1});
