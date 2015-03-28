if (Meteor.isClient) {


    // counter starts at 0
    Session.setDefault('counter', 0);
    //Session.setDefault('story', []); //temporary for now

    Template.hello.helpers({
	counter: function () {
	    return Session.get('counter');
	},

    });

    Template.hello.events({
	'click button': function () {
	    Session.set('counter', Session.get('counter') + 1);
	    var storyTitle = $('#title').val();
	    var cur = Stories.findOne({"title": storyTitle});
	    var words = $('#words').val();
	    var newText = "";
	    //console.log("cur:" + cur);
	    //console.log("words:" + words);
	    if (!!words){ //validation inside the event. oh dear.
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
	    console.log("HELLO");
	}
    });

    Template.lines.helpers({
	lines: function(){
	    return Stories.find();
	},
	titles: function(){
	    return Titles.find();
	} 
    });

    Template.titles.helpers({
	titles: function(){
	    return Stories.find({}, {"_id":0, "title":1});
	}
    });

}
