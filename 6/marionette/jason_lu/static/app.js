console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    firstRegion: "#first-region",
    secondRegion: "#second-region",
    //thirdRegion: "#third-region",
    //fourthRegion: "#fourth-region"
});


App.on("start",function(){
    console.log("Starting");
    /*
    var staticview = new App.StaticView();
    App.firstRegion.show(staticview);
    */
    var placeview = new App.PlaceView({model:p1});
    App.secondRegion.show(placeview);
    
});

/*
App.StaticView = Marionette.ItemView.extend({
    template : "#static-template"
});
*/
App.PlaceView = Marionette.ItemView.extend({
    template : "#place-template",
    tagName : "tr"
    events:{
            "click .like":function(e){
                    var r = this.model.get('likes');
                    r = parseInt(r);
                    r = r + 1;
                    this.model.set('likes',r);
                    console.log(this.model);
                    this.render();
            },
            
            "click .delete":function(e){
                    this.remove();
                    this.render();
            }
    }
});

var Post = Backbone.Model.extend();
var p1 = new Post({name:"Terry's",comment:"hello",likes:0});


App.start();
