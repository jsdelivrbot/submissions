var App = new Marionette.Application();
App.addRegions({
    firstRegion:"#first-region"
});
App.on("start",function(){
    var compositeview = new App.CompositeView({});
    App.firstRegion.show(compositeview);
    Backbone.history.start();
});
App.CompositeView = Marionette.CompositeView.extend({
    template: "#composite-template",
    events: {
	"click #Submit" : function(e){
	    var r = $(".t").val();
	    this.model.set("comment",r);
	}
	
    }
});
var Cv = Backbone.Model.extend({});
var cv = new Cv({comment:"blahblahblah"});
App.start();
