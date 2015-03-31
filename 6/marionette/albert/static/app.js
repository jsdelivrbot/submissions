var App = new Marionette.Application();
var wordview;
var g2;

App.addRegions({
	story:"#words"
});

App.on("start",function(){
	console.log("STARTING")
	c.add(g1);
	wordview = new App.WordsView({collection:c});
	App.story.show(wordview);
});

App.WordView = Marionette.ItemView.extend({
	template:"#words-template",
	tagName :"tr",
});

App.WordsView = Marionette.CollectionView.extend({
	childView : App.WordView,
	onAddChild: function(childView){
		console.log("adding child");
		console.log(c)
		//wordview = new App.WordsView({coolection:c});
		//App.story.show(wordview);
	}
});

var Group = Backbone.Model.extend();
var Groups = Backbone.Collection.extend({
	model:Group
});
var g1 = new Group({first:"hi", second:"I'm", third:"Bob"});

var c = new Groups([]);
c.add(g1);

$("#submitwords").on("click",function(event){
	event.preventDefault();
	c.add(new Group({
		first:$("#first").val(),
		second:$("#second").val(),
		third:$("#third").val()
	}));
	//wordview = new App.WordsView({collection:c})
	//App.story.show(wordview);
	$("#first").val("");
	$("#second").val("");
	$("#third").val("");
});

App.start();