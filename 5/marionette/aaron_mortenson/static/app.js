console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    topRegion:"#top",
    mainRegion:"#page",
});


App.on("start",function() {
    console.log("Started"); 
    stuff = $.getJSON('/places', function(data) {
	things = stuff.responseJSON;
	doohickies = []
	for (i = 0; i < things.length; i++) { 
	    doohickies.push(new item({
		username:things[i].username,
		itemname:things[i].itemname}))
	};
	console.log(doohickies);
	var c = new items(doohickies);
	var compositeview = new App.compositeView({collection:c});
	App.mainRegion.show(compositeview);
    
	Backbone.history.start();
    });  

});

App.itemView = Marionette.ItemView.extend({
    template : $("#item-template").html(),
    tagName  : "tr",
    render:function(x) {	    
	var t = _.template(this.template);
	var rendered = this.$el.html(t(this.model.attributes));
	return this;
    },
    events   : {
	"click #delete" : function(){
	    this.remove();
	    this.render();
	}
    },
    modelEvents : {
	"change" : function() {this.render()}
    } 
});

App.compositeView = Marionette.CompositeView.extend({
    template: "#list-template",
    childView: App.itemView,
    childViewContainer : "tbody",
    events : {
	"click #add" : function(e) {
	    e.preventDefault();
	    console.log("we made it");
	    var n = $("#username").val();
	    var i = $("#itemname").val();
	    if (n.length > 0 && i.length > 0){
		var that=this;
		var m = new item({username:n,itemname:i});
		this.collection.add(m);
		this.render();
		console.log(m);
		$("#itemname").val("");
		m.save(m.toJSON(),{success:function(m,r){
		    console.log("HAIIII");
		    if (r.result.n==1){
			console.log("HAIIII");
			that.collection.add(m);
			that.render();
		    }	
		}});
	    }
	    
	}
    }
});


var item = Backbone.Model.extend({  
    //urlRoot:'/place',
    idAttribute:'_id',
    //id:'_id',
    //initialize:function(){
//	this.on({
//	    "change":function(){
//		console.log("Changed"+this);
//	    }
//	});
  //  },
    defaults: {
	username:"user",
	itemname:"item"
    }
});

var items = Backbone.Collection.extend({
    model:item,
    url:'/place',
    initailize: function() {
	this.fetch(function (d){
	    console.log(d);
	    this.render();
	});
	
        this.on({'add':function() {
	    console.log("added");
	    this.view.render();
	}});
    }
});

//var i1 = new item({username:"bobert",itemname:"feed cows"});
//var i2 = new item({username:"jeff",itemname:"kill cows"});
//var c = new items([i1,i2]);

App.start();
