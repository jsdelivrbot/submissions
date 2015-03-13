console.log("HELLO");

var Album = Backbone.Model.extend({
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
	name :"Album name",
	rating:0,
	tracks:[]
    },
    validate : function(attrs,options) {
	if (isNaN(attrs.rating)){
	    return "need number";
	}
    }
});

var AlbumView = Backbone.View.extend({
    el			: "#place",
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


var TrackList = Backbone.View.extend({
    el			: "#place",
    template	:  _.template($("#tracks_template").html()),
    events:{
	"click #add" : function(e) {
	    var n = $("#newtrack")[0].firstElementChild.value;
	    console.log(n);
	    var t = this.model.get("tracks");
	    t.push(n);
	    this.model.set("tracks",t);
	    this.render();
	},
	
	"click #rem" : function(e) {
	    var t = this.model.get("tracks");
	    t.pop()
	    this.render();
	},
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


var p1 = new Album({name:"Tommy",rating:9,tracks:["Overture","It's a Boy","1921","Amazing Journey","Sparks","The Hawker","Christmas","Cousin Kevin","The Acid Queen","Underture","Do You Think It's Alright?","Fiddle About","Pinball Wizard","There's a Doctor","Go to the Mirror!","Tommy Can You Hear Me?","Smash the Mirror","Sensation","Miracle Cure","Sally Simpson","I'm Free","Welcome"]});
var p2 = new Album({name:"Acid Rap",rating:8,tracks:["Good Ass Intro","Pusha Man","Cocoa Butter Kisses","Juice","Lost","Everybody's Something","Interlude (That's Love)","Favorite Song","NaNa","Smoke Again","Acid Rain","Chain Smoker"]});
var v1 = new AlbumView({model:p1});
//var v2 = new AlbumView({model:p2});
//var t1 = new TrackList({model:p1});
//var t2 = new TrackList({model:p2});
