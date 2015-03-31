console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
               firstRegion: "#first-region",
               secondRegion: "#second-region",
               thirdRegion: "#third-region"
               });


App.on("start",function(){
       console.log("Starting");
       
       var staticview = new App.StaticView();
       App.firstRegion.show(staticview);
       
       var proview = new App.ProView({model:p1});
       App.secondRegion.show(proview);
       
       var conview = new App.ConView({model:p2});
       App.thirdRegion.show(conview)
       
       });

App.StaticView = Marionette.ItemView.extend({
                                            template : "#static-template"
                                            });

App.ProView = Marionette.ItemView.extend({
                                         template : "#pro-template",
                                            events:{
                                                "click #add" : function(){
                                                    console.log("adding pro")
                                                }
                                            }
                                           });

App.ConView = Marionette.ItemView.extend({
                                         template: "#con-template",
                                         });

var Item = Backbone.Model.extend();
var p1 = new Item({pro:"a pro"});
var p2 = new Item({con:"a con"});


App.start();