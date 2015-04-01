var App = new Marionette.Application();

App.addRegions({
    firstRegion : "#first-region"
});

App.on("start", function(){
    console.log("Starting");

    var addview = new App.AddView({collection:c});
    App.firstRegion.show(addview);

});



App.LineView = Marionette.ItemView.extend({
    template : "#line",
    tagName : "li",
    modelEvents : {
	"change" : function(){
	    this.render();}
    }
})

App.ListView = Marionette.CollectionView.extend({
    template : "#list-template",
    childView : App.LineView,
});


App.AddView = Marionette.CompositeView.extend({
    template : "#add-template",
    childView : App.LineView,
    childViewContainer : "ol",    
    events : {
	"click #add" : function(){
	    var n = $("#newline").val();
	    if (n.length != 0){
		this.collection.add(new Line({l:n}));
		$("#newline").val("");
		Backbone.sync("create", c);
	    }
	}
    }
});






var Line = Backbone.Model.extend();
var ListView = Backbone.Collection.extend({
    model:Line
});


var first = new Line({l:"Milk"});
var c = new ListView([first]);




App.start();
