console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    topRegion:"#top",
    mainRegion:"#page",
});

var sync = function() {
    console.log('syncing');
    stuff = $.getJSON('/places', function(data) {
	things = stuff.responseJSON;
	doohickies = []
	for (i = 0; i < things.length; i++) { 
	    doohickies.push(new item({
		username:things[i].username,
		itemname:things[i].itemname}))
	};
	var c = new items(doohickies);
	var compositeview = new App.compositeView({collection:c});
	App.mainRegion.show(compositeview);
    });
};

App.on("start",function() {
    var submitview = new App.submitView();
    App.topRegion.show(submitview);
    console.log("Started"); 
    sync();
    setInterval(function() {
	sync();
    }, 100);
    //Backbone.history.start();  

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
	    sync();
	    var info = this.model.attributes
	    console.log(info);
	    var deleteURL = '/delete/' + info.username + '/' + info.itemname;
            this.model.collection.remove(this.model);
	    console.log(deleteURL);
            $.ajax({
                url: deleteURL,
                type: 'DELETE'
            });
	    this.remove();
	    this.render();

	}
    },
    modelEvents : {
	"change" : function() {this.render()}
    } 
});

App.submitView = Marionette.ItemView.extend({
    template: "#submit-template",
    events : {
	"click #add" : function(e) {
	    e.preventDefault();
	    console.log("we made it");
	    var n = $("#username").val();
	    var i = $("#itemname").val();
	    var t = new Date().getTime()
	    if (n.length > 0 && i.length > 0){
		var that=this;
		var m = new item({time:t,username:n,itemname:i});
		//this.collection.add(m);
		this.render();
		console.log(m);
		$("#itemname").val("");
		m.save(m.toJSON(),{success:function(m,r){
		    console.log("HAIIII");
		    if (r.result.n==1){
			console.log("HAIIII");
			//that.collection.add(m);
			sync();
			//that.render();
		    }	
		}});
	    }
	    
	}
    }
});

App.compositeView = Marionette.CompositeView.extend({
    template: "#list-template",
    childView: App.itemView,
    childViewContainer : "tbody"
});


var item = Backbone.Model.extend({  
    urlRoot:'/place',
    idAttribute:'_id',
    //id:'_id',
    initialize:function(){
	this.on({
	    "change":function(){
		console.log("Changed"+this);
		
	    }
	});
    },
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
	    this.sync();
	}});
    }
});

//var i1 = new item({username:"bobert",itemname:"feed cows"});
//var i2 = new item({username:"jeff",itemname:"kill cows"});
//var c = new items([i1,i2]);

App.start();
