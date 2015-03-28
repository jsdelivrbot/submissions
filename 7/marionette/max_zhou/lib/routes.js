Router.configure({
    layoutTemplate : "layout",
    notFoundTemplate: "notfound"
});

Router.onAfterAction(function(){
    if(!this.params.post){ //optional parameter, false if on main page?
	document.title = "Line by line story!";
    }
    else{
	document.title = this.params.post;
    }
    //this.render("footer", {to: "footer"});//render the template to: yield region
    //that doesn't work :(
});

Router.onBeforeAction("dataNotFound"); //onBeforeAction or onRun?

Router.route('/', {
    waitOn: function(){
    	return Meteor.subscribe("stories");
    },
    
    action: function(){
	this.render("homepage");
	console.log(this.params);
    }
});

Router.route(':post',{
    //path: '/story/:post',
    data: function() { 
	if(this.ready()){
	    var story = Stories.findOne({title: this.params.post});
	    console.log(this.params.post);
	    console.log(story);
	    return story;
	}
    },
    
    waitOn: function(){
    	return Meteor.subscribe("stories");
    },
    
    action: function(){
	this.render("story");
    }
});

