/* Backbone.sync - CRUD
 * (method, model, [options])
 *
 * Collection.fetch
 * - needs collection url
 * - sends request to server
 * - exclude mongo id
 *
 * Model.save
 * - requires Model.urlRoot
 * - is a root - id will complete it
 * - needs Model.id and Model.idAttribute
 *
 */

console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    centerRegion:"#center-region"
});

App.on("start",function(){
    console.log("Started");     
    var storiesView = new App.CompositeView({collection:stories});
    App.centerRegion.show(storiesView);
    
    Backbone.history.start();
});

App.StoryView = Marionette.ItemView.extend({
    template: "#story-template",
    tagName: "tr",
    events: {
        "click #delete":function(){
            this.model.destroy({
                success:function(m){
                    this.remove();     
                }
            });
        },
        "click #up":function(){
            var r = this.model.get('rating');
            r = parseInt(r);
            r++;
            this.model.set('rating',r);
            this.model.save();
        },
        "click #down":function(){
            var r = this.model.get('rating');
            r = parseInt(r);
            r--;
            this.model.set('rating',r);
            this.model.save();
        },
    },
    modelEvents: {
        "change":function(){ 
            this.render();
        }
    }
});

App.StoriesView = Marionette.CollectionView.extend({
    childView: App.StoryView
});

App.CompositeView = Marionette.CompositeView.extend({
    template: "#composite-template",
    childView: App.StoryView,
    childViewContainer: "tbody",
    events: {
        "click #add":function(){
            var n = $("#newstory").val();
            if(n.length > 0){
                $("#newstory").val("")
                var s = new Story({name:n,rating:"0",_id:n});
                s.save(s.toJSON(),{
                    success:function(s,r){
                        if(r.result.n==1){
                            this.collection.add(s); 
                        }
                    }
                });
            }
        }
    },
    modelEvents: {
        "change":function(){ 
            //this.render();
        }
    },
});

var myController = Marionette.Controller.extend({
    oneRoute: function(){
        console.log("Oneroute");
        //App.firstRegion.show(new App.FirstView());
        //App.secondRegion.show(new App.PlaceView({model:p1}));
    },
    twoRoute: function(){
        console.log("TwoRoute");
        //App.firstRegion.show(new App.FirstView());
        //App.secondRegion.show(new App.PlaceView({model:p2}));
    },
});

App.controller = new myController();
App.router = new Marionette.AppRouter({
    controller: App.controller,
    appRoutes:{
        "one":"oneRoute",
        "two":"twoRoute"
    }
});
var Story = Backbone.Model.extend({
    urlRoot:"/story",
    idAttribute:"_id",
    id:"_id",
    defaults:{
        name:"Untitled",
        rating:0,
    },
    initialize:function(){
        this.on({
            "change":function(){
                console.log("Story changed!");
            }
        });
    }
});
var Stories = Backbone.Collection.extend({
    model:Story,
    url:"/stories",
    initialize:function(){
        this.fetch(function(s){
            console.log(s);
            this.render();
        });
        this.on({
            "add":function(){
                console.log("Added.");
            }
        });
    }
});

/*var s1 = new Story({name:"Dystopian YA",rating:10});
var s2 = new Story({name:"Very Realistic YA",rating:8});
*/
var stories = new Stories();

App.start();
