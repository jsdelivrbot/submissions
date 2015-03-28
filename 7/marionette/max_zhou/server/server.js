if (Meteor.isServer) {
    Meteor.startup(function () {
	// code to run on server at startups
    });

    /* //Not needed right now: autopublish is still on
      Meteor.publish("stories", function(){
      return Stories.find();
      });
    */
    /*
    Stories.allow({ //everyone can insert as of now
	insert: function(){
	    return true;
	},
	update: function(){
	    return true;
	}
    });
    */

    Titles.allow({
	update: function(){
	    return true;
	}
    });
}
