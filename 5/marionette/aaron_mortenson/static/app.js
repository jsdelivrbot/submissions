console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    topRegion:"#top",
    mainRegion:"#page",
});


App.on("start",function() {
    console.log("Started"); 
    var c = new items();
    var compositeview = new App.compositeView({collection:c});
    App.mainRegion.show(compositeview);
    
    Backbone.history.start();
});

App.itemView = Marionette.ItemView.extend({
    template : "#item-template",
    tagName  : "tr",
    events   : {
	"click #delete" : function(){
	    var deleteURL = '/sync/' + this.model.get('_id');
            this.model.collection.remove(this.model);
            $.ajax({
                url: deleteURL,
                type: 'DELETE'
            });
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
	"click #add" : function() {
	    console.log("we made it");
	    var n = $("#username").val();
	    var i = $("#itemname").val();
	    if (n.length > 0 && i.length > 0){
		this.collection.create(new item({username:n,itemname:i}));
		$("#itemname").val("");
	    }
	    
	}
    }
});


var item = Backbone.Model.extend({  
  idAttribute: '_id',
    defaults: {
	username:"user",
	itemname:"item"
    }
});
var items = Backbone.Collection.extend({
    model:item,
    url:'sync',
    initailize: function() {
	this.fetch();
	var that = this;
	setInterval(function() {
	    that.fetch();
	}, 1000);
    }
});

//var i1 = new item({username:"bobert",itemname:"feed cows"});
//var i2 = new item({username:"jeff",itemname:"kill cows"});
//var c = new items([i1,i2]);

App.start();
