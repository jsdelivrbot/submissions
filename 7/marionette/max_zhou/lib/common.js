Stories = new Mongo.Collection("stories"); //where does the init go?
Titles = new Mongo.Collection("titles"); //this stores all the titles so we can insert into a specific story!

Meteor.methods({
    addText: function(title, text){
	Stories.update({"title": title}, {"text": text, "title": title}, {upsert: true});
    }
});

