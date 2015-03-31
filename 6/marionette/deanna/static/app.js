// So I started doing the blog project, and realized it was a little
// confustion (I explained that in those files). This sort of feels like
// a cop out because everyone is doing this sort of thing.
// But it's what I could throw together tonight.


// Hmm now that I think of it a blog is the same as this isnt it.

// So I changed my mind again, making a blog. But using these old
// variables and tags so yeah.

// Apparently I comment a lot when I code when I am far too tired, but
// I just realized all the convenient uses of this! I can make a
// to do list or packing list or blog or... wow!

var App = new Marionette.Application();

App.addRegions({
    Game: "#game"
});

App.on("start",function(){
       console.log("Starty doo bop");       
       
       var addword = new App.AddWord({collection:c, model:w1});
       App.Game.show(addword);
       Backbone.history.start();
});

App.WordView = Marionette.ItemView.extend({
     template : "#word",
     tagName : "li",
     modelEvents : {
         "change" : function() { this.render(); }
     }                                      
})

App.StoryView = Marionette.CollectionView.extend({
    childView : App.WordView,
});

App.AddWord = Marionette.CompositeView.extend({
    childView : App.WordView,
    childViewContainer: "ol",
    template : "#stuff",
    events : {
        "click #add" : function() {
            var n = $("#newWord").val();
            if (n.length != 0){
                this.collection.add(new Word({w:n}));
                $("#newWord").val("");
            }
        }
    }
});

var Word = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Word
});

var w1 = new Word({w:"Hello World! This is the first blog post, and I am veyr happy that you have come to this site! This is a communal blog, and you can add posts and we can all revel in your amazingness. As the first blogger, I will share some information with you. First of all AND MOST IMPORTANTLY: this blog is also a game. At the end of each post you must add a 6+ letter word that starts with the last letter of the word from the previous post. Fun. Other than that, you may talk about anything. I am Deanna, and this is my amazing Soft Dev project. Wordl - you are welcome. WORD: Tomato."});
var w2 = new Word({w:"Establish"});
var c = new StoryView([w1]);

App.start();



