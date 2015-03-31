console.log("HLLO");

var App = new Marionette.Application();

App.addRegions({
		firstRegion:"#first-region",
		secondRegion:"#second-region",
	
});


App.on("start",function() {
		console.log("Started");


		var compositeview = new App.CompositeView({ collection:c});
		App.firstRegion.show(compositeview);

});

App.PlaceView = Marionette.ItemView.extend({
		template : "#note-template",
		tagName  : "tr",
		events   : {
				"click #delete" : function(){
						this.remove();
				},
				"click #edit" : function(){
				    $("#newnote").val(this.model.attributes.content);
				    this.remove();
				}
		},
		modelEvents : {
				"change" : function() {this.render()}
		}
		
});

App.PlacesView = Marionette.CollectionView.extend({
		childView : App.PlaceView

});

App.CompositeView = Marionette.CompositeView.extend({
		template: "#composite-template",
		childView: App.PlaceView,
		childViewContainer : "tbody",
		events : {
				"click #add" : function() {
						var n = $("#newnote").val();
						if (n.length > 0){
						    var m = new Note({content:n});
						    this.collection.add(m);
						    this.render();
						    console.log(m);
						    m.save(m.toJSON());
						    $("#newnote").val("");
						}

				}
		}
});

var Note = Backbone.Model.extend({
	urlroot:"/note",
	idAttribute:'_id',
	id:'_id',
	initialize:function(){
	    this.on({
		    "change":function(){
			console.log("Changed"+this);
		    }
		});
	}
    });
var NotePad = Backbone.Collection.extend({
	model:Note,
	url:"/notes",

	initialize: function() {
	this.fetch(function (d){
	    console.log(d);
	    this.render();
	});
	
        this.on({'add':function() {
	    console.log("added");

	}});
    }
});


var c = new NotePad();
App.start();
