var App = new Marionette.Application();

App.addRegions({
    timelineRegion: "#timeline-region"
});


App.on("start", function() {
    var timelineView = new App.TimelineView({model:test, collection:c});
    App.timelineRegion.show(timelineView);

    Backbone.history.start();
});

App.NodeView = Marionette.ItemView.extend({
    template: "#node-template",
    className: "cd-timeline-block"
});

var Test = Backbone.Model.extend();
var test = new Test({testing: "test"});

var Node = Backbone.Model.extend();
var Nodes = Backbone.Collection.extend({model:Node});

var n1 = new Node({noteNumber: 1, notes: "hello this is a test"});
var n2 = new Node({noteNumber: 2, notes: "you can add stuff to this timeline by using the textfield above"});
var c = new Nodes([n1, n2]);

App.TimelineView = Marionette.CompositeView.extend({
    template: "#timeline-template",
    childView: App.NodeView,
    childViewContainer: "#cd-timeline",
    events: {
        "click #add": function() {
            var content = $("#newentry").val();
            console.log(content);
            this.collection.add(new Node({noteNumber: this.collection.length+1, notes:content}));
            console.log(this.collection);
        }
    }
});


App.start();
