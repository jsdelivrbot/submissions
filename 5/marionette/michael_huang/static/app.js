var App = new Marionette.Application();
var Story = Backbone.Model.extend({});

var story = new Story({content:"Once upon a time"});
var Person= Backbone.Model.extend({});
var person = new Person({name:"Admin",contents:"Once upon a time"});
var Persons= Backbone.Collection.extend({
  model:Person
  });
var p = new Persons([person]);


App.addRegions({
    storyRegion:"#story-region",
    submitRegion:"#submit-region",
    inputRegion:"#input-region",
    totalRegion:"#total-region"
});

App.on("start",function(){
    var storyView = new App.StoryView({model:story});
    App.storyRegion.show(storyView);
    
    var submitView = new App.SubmitView();
    App.submitRegion.show(submitView);
    
   var inputView = new App.inputView({model:person});
    App.inputRegion.show(inputView); 
   var TotalView = new App.totalView({model:p});
   App.totalRegion.show(TotalView);
});


    
App.StoryView = Marionette.ItemView.extend({
    template:"#story-template",
    modelEvents:{
	"change":function(){this.render()}
    }
});
App.inputView= Marionette.ItemView.extend({
    template:"#input-template",
    
    modelEvents:{
	"change":function(){this.render()}
	}
    });
App.totalView = Marionette.CompositeView.extend({
    template:"#total-template",
    childView: App.inputView,
   // childViewContainer:"tbody"
    });

App.SubmitView= Marionette.ItemView.extend({
    template:"#submit-template",
    events: {
	"click #addstory":function(){
	    var n= $("#addContent").val();
	   
	    if(n.length>0){
		story.set({content:story.get("content")+" "+n});
		
		person.set({name:$("#userName").val(),contents:n});
		p.add(new Person({name:$("#userName").val(),contents:n}));
		
		
	    }
	}
    }
});



App.start(); 