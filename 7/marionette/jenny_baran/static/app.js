//console.log("TEST")

var App = new Marionette.Application();

App.addRegions({
               add : "#add-line-display"
               });

App.on( "start", function() {
       //console.log( "STARTING" );
       
       var addline = new App.AddLine({
                                     collection:c,
                                     model:l1
                                     });
       App.add.show( addline );
       
       Backbone.history.start();
       });

//display individual lines
App.LineView = Marionette.ItemView.extend({
                                          template : "#story",
                                          tagName : "li",
                                          modelEvents : {
                                          "change" : function() { this.render(); },
                                          },
                                          events: {
                                          }
                                          });

//displaying & adding lines
App.AddLine = Marionette.CompositeView.extend({
                                              childView : App.LineView,
                                              template : "#add-line-template",
                                              events : {
                                              "click #add" : function() {
                                              var n = $("#new-line").val();
                                              if( n.split(".").length === 1 ){
                                              m = new Line( {l:n} );
                                              $("#new-line").val("");
                                              var that = this;
                                              m.save( m.toJSON(), { success:function(m,r){
                                                     if( r.result.n == 1 ){
                                                     that.collection.add(m);
                                                     that.render();
                                                     }}})
                                              }
                                              
                                              }
                                              }
                                              });

var Line = Backbone.Model.extend({
                                 url : "/line",
                                 idAttribute : '_id'
                                 });

var StoryView = Backbone.Collection.extend({
                                           model : Line,
                                           url : "/lines",
                                           initialize : function(){
                                           this.fetch(function(d){
                                                      console.log(d);
                                                      this.render();
                                                      });
                                           }
                                           });

var l1 = new Line({l:"Once upon a time, there lived a..."});
var l2 = new Line({l:"CAT."});
var c = new StoryView([l1,l2]);

App.start();