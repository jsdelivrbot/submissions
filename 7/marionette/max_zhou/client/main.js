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
    //console.log(stories);
    stories = stories.map( function(story){
	console.log(story.text);
	console.log(story.text.slice(Math.max(story.text.length - 5, 0)));
	console.log(Math.max(story.text.length-5));
	return { title : story.title, 
		 text : story.text.slice(Math.max(story.text.length - 5, 0))
	       };
    });
    console.log(stories);
    return stories;
}

Template.submitButton.helpers({
    counter: function () {
	return Session.get('counter');
    },
    
});

Template.submitButton.events({
    'click button': function () {
	Session.set('counter', Session.get('counter') + 1);
	console.log("context:" + this);	
	if(_.isEmpty(this)){ //empty object if no data param (like on home)
	    var storyTitle = $('#title').val().trim();
	}
	else{
	    var storyTitle = this.title;
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
	    Meteor.call('addText', storyTitle, newText);
	}
	$('#words').val("");
	console.log("SUBMITBUTTON");
    }
});

Template.lines.helpers({
    lines : getLastLines,
    titles : getTitles
});


Template.titles.helpers({
    titles : getTitles
    /*
      titles: function(){
      return Stories.find({}, {"_id":0, "title":1});
      }
    */
});



