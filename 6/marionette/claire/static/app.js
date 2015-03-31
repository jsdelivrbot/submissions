console.log("HELLO");

var App = new Marionette.Application();

App.addRegions({
    profileRegion : "#profile-region",
    feedRegion : "#feed-region",
})

App.on("start",function(){
    console.log("Starting");
    var placeview = new App.ProfileView({model:profile1});
    App.profileRegion.show(placeview);
    var feedview = new App.FeedView({collection:profiles});
    App.profileRegion.show(feedview);
    Backbone.history.start();
});

App.ProfileView = Marionette.ItemView.extend({
    template : "#profile-template"
    modelEvents : {
	"change" : function() { this.render(); }
    }
});

App.FeedView = Marionette.CollectionView.extend({
    childView : App.ProfileView
});

var Profile = Backbone.Model.extend();
var Profiles = Backbone.Collecton.extend({
    model:Profile
});


var profile1 = new Profile({name:"Claire",password:"cats",email:"claireburghard@gmail.com");
var profile2 = new Profile({name:"Will",password:"dogs",email:"willochill@gmail.com");
var profiles = new Profiles({profile1,profile2});


App.start();
