var app = new Backbone.Marionette.Application();

app.addRegions({
    mainRegion: "#content"
});

fishy = Backbone.Model.extend({});

fishies = Backbone.Collection.extend({
    model: fishy
});

fishyView = Backbone.Marionette.ItemView.extend({
    template: "#fishy-template",
    tagName: 'tr',
    className: 'fishy'
});

fishiesView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    id: "fishies",
    className: "table-striped table-bordered",
    template: "#fishies-template",
    itemView: fishyView,
    appendHTML: function(collectionView, itemView){
	collectionView.$("tbody").append(itemView.el);
    }
});

app.addInitializer(function(options){
    var fishiesView = new fishiesView({
	collection: options.fishs
    });
    app.mainRegion.show(fishiesView);
});

$(document).ready(function(){
    var fishs = new fishies([
	{name: "one fish"},
	{name: "two fish"},
	{name: "red fish"},
	{name: "blue fish"}
    ]);
    app.start({fishs: fishs});
});

