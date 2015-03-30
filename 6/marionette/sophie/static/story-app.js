

var App = new Marionette.Application();


App.addRegions({
    //StoryDisplay : "#story-display",
    AddLineDisplay: "#add-line-display"
});


App.on("start",function(){
       console.log("Starting");       
       
       var addline = new App.AddLine({collection:c, model:l1});
       App.AddLineDisplay.show(addline);
       
       Backbone.history.start();
      
       
});


// displaying individual lines
App.LineView = Marionette.ItemView.extend({
     template : "#line",
     tagName : "li",
     modelEvents : {
         "change" : function() { this.render(); }
     }
                                          
})


// displaying all the lines
App.StoryView = Marionette.CollectionView.extend({
    childView : App.LineView,
    //childViewContainer : "ol",
});


// displaying + adding new lines
App.AddLine = Marionette.CompositeView.extend({
    childView : App.LineView,
    childViewContainer: "ol",
    template : "#add-line-template",
    events : {
        "click #add" : function() {
            var n = $("#newline").val();
            if (n.length > 0){
                this.collection.add(new Line({l:n}));
                $("#newline").val("");
            }
        }
    }
});

var Line = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Line
});


var l1 = new Line({l:"This is the beginning of the story."});
var l2 = new Line({l:"This is a continuation of the story."});
var c = new StoryView([l1,l2]);

App.start();



