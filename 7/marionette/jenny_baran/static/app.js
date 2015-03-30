//console.log("TEST")

var App = new Marionette.Application();

App.addRegions({
               AddLineDisplay : "#add-line-display"
               });

App.on( "start", function() {
       //console.log( "STARTING" );
       
       var addline = new App.AddLine({
                                     collection:c,
                                     model:l1
                                     });
       App.AddLineDisplay.show( addline );
       
       Backbone.history.start();
       });

//display all lines
App.StoryView = Marionette.CollectionView.extend({
                                                 childView : App.LineView
                                                 });

//display individual lines
App.LineView = Marionette.ItemView.extend({
                                          template : "#line",
                                          tagName : "li",
                                          modelEvents : {
                                          "change" : function() { this.render(); }
                                          }
                                          });

//displaying & adding lines
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

var l1 = new Line({l:"Once upon a time, there lived a..."});
var c = new StoryView([l1]);

App.start();