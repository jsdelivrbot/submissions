
var App = new Marionette.Application();

App.addRegions({
    add : "#first-region"
});

App.on( "start", function() {
    console.log( "STARTING" );
    
    var addline = new App.AddLine({
        collection:c,
        model:p1
    });
    App.add.show( addline );
    
    Backbone.history.start();
});



App.LineView = Marionette.ItemView.extend({
    template : "#story",
    tagName:"tr",
    
    modelEvents : {
        
        "change" : function() { this.render(); },
        
    }
    
});


App.AddLine = Marionette.CompositeView.extend({
    childView : App.LineView,
    template : "#addLine",
    events : {
        "click #add" : function() {
            var n = $("#newLine").val();
            if (n.split(".").length === 1){
                m=new Line({content:n});
                $("#newLine").val("");
                var that = this;
                m.save(m.toJSON(),{success:function(m,r){
                    if (r.result.n==1){
                        that.collection.add(m);
                        that.render();
                    }}})
                
                
            }}
    }
});


var Line = Backbone.Model.extend({
    url:"/line",
    idAttribute:'_id',
    
});

var StoryView = Backbone.Collection.extend({
    model:Line,
    url:"/lines",
    initialize:function(){
        this.fetch(function(d){
            console.log(d);
            this.render();
        });
    }
});



var p1 = new Line({content:"Some words"});
var p2 = new Line({content:"sdfguhewrdfghj"});
var c = new StoryView([p1,p2]);

App.start();
