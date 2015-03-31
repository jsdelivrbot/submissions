// counter starts at 0
Session.setDefault('counter', 0);
//Session.setDefault('story', []); //temporary for now

var getStories = function(){
    return Stories.find();
}

var getTitles = function(){
    console.log(Stories.find({"_id":0, "titles": 1}));
    return Stories.find({}, {"_id":0, "title":1});
}

var getLastLines = function(){
    var stories = getStories();
    console.log("stories after getStories():");
    console.log(stories);
    stories = stories.map(function(story){
	console.log(story);
	var len = story.text.length
	//console.log(story.text);
	//console.log(story.text.slice(Math.max(len - 5, 0)));
	//console.log(Math.max(len-5));
	return {'title': story.title, 
		'text': _.map(story.text.slice(Math.max(len - 5, 0)), function(text,index){return [text,index + Math.max(len-5, 0), story.title]}) //returns the original index of the text
		
	       };
    });
	
	//return [story.text]
    //stories = [{'a': 'b'}, {'b': 'c'}];
    console.log("stories after processing:");
    console.log(stories);
    return stories;
}

//var isClicked = function(){
 //   'click' : function(){
//	console.log(this.index);
 //   }
//}

Template.submitButton.helpers({
    counter: function () {
	return Session.get('counter');
    },
    
});

Template.submitButton.events({
    'click button': function () {
	Session.set('counter', Session.get('counter') + 1);
	console.log("context:");
	console.log(this);	
	if(_.isEmpty(this)){ //empty object if no data param (like on home)
	    var storyTitle = $('#title').val().trim();
	}
	else{
	    var storyTitle = this[0][2]; //...we changed the data context.
	}
	console.log(this);
	console.log(storyTitle);
	console.log("a");
	var cur = Stories.findOne({"title": storyTitle});
	//var cur = Stories.findOne({"title": "Latency"});
	console.log("b");
	var words = $('#words').val();
	var newText = "";
	console.log("cur:" + cur);
	console.log("words:" + words);
	if (!!words && !!storyTitle){ //validation inside the event. oh dear.
	    if(!cur){ //doesn't exist
		newText = [words];
	    }
	    else{
		newText = cur.text;
		newText.push(words);
	    }
	    console.log(newText);
	    console.log(storyTitle);
	    Meteor.call('addText', storyTitle, newText);
	}
	$('#words').val("");
	console.log("SUBMITBUTTON");
    }
});

Template.lines.helpers({
    lines : getLastLines,
    titles : getTitles,
    log : function(){console.log(this)}
    //isClicked : isClicked

});

Template.storylines.events({
    'click .text' : function(parent){
	//console.log(parent.target);
	//console.log(Template.currentData());
	console.log("2:");
	console.log(Template.parentData(2));
	console.log("3:");
	console.log(Template.parentData(3));
	console.log(this); //["text", index, "title"]
	Meteor.call('updateSelected', this[2], this[1]); //title, index
    }
});

Template.storylines.helpers({
    isChecked : function(){
	console.log(this);
	return _.indexOf(Stories.findOne({"title": this[2]}).selected, this[1])>=0;
    }
});

		      
Template.titles.helpers({
    titles : getTitles,
    log : function(){console.log(this)}
    /*
      titles: function(){
      return Stories.find({}, {"_id":0, "title":1});
      }
    */
});



