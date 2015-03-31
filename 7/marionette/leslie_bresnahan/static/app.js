console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region"
});

App.on("start", function(){
    console.log("STARTING");
   

    var compView = new App.CompView({collection:c});
    App.firstRegion.show(compView);

    Backbone.history.start();
});

App.PostView = Marionette.ItemView.extend({
    template: "#post-template",
    tagName : "div",
    events : {
	"click #post" : function() { 
	    this.model.attributes.comments.push({'name': $("#com-name").val(), 'content' : $("#com-entry").val()});
	    console.log(this.model.attributes.comments);
	    this.render()
	}
    },
    modelEvents: {
	"change": function(){
	    this.render();
	}
    }
});




App.PostsView = Marionette.CollectionView.extend({
    childView: App.PostView
});

App.CompView = Marionette.CompositeView.extend({
    template: "#comp-template",
    childView: App.PostView,
    modelEvents: {
	"change":function(){
	    this.render();
	}},
    events: {
	"click #new-post": function() {
	    var n = $("#new-name").val();
	    var t = $("#new-title").val();
	    var con = $("#new-content").val();
	    p = new Post({title:t,name:n,post:con,comments:[]});
	    var that = this;
	    p.save(p.toJSON(),{success:function(p,r){
                if (r.result.n==1){
                    that.collection.add(p);
                    that.render();
                }}})
            
            
        }}
});


var Post = Backbone.Model.extend({
    url: "/post",
    idAttribute: '_id'
});
var Posts = Backbone.Collection.extend({
    model:Post,
    url: "/posts",
    initialize:function(){
        this.fetch(function(d){
            console.log(d);
            this.render();
        });
    }
})



var p1 = new Post({title:"Yo",name:"Leslie",post:"Today I did some stuff.", comments:[{name:"me",content:"cool!"},{name:"you",content:"lame!"}]});
var p2 = new Post({title:"Hello World",name:"Newbie", post:"Today I coded some stuff", comments:[{name:"me",content:"wow"}]});

var c = new Posts([p1,p2]);



App.start();
