//console.log("HELLO");

var App = new Marionette.Application();

var Teacher = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        name: 'Coby',
        period: 0,
        comments: 't'
    }
});

var TeacherList = Backbone.Collection.extend({
    model: Teacher,
    url: 'update',
    comparator: function(a) {
        // Sort by descending urgency
        return -a.get('period');
    },
    initialize: function() {
        // GET request to server, getting the stored data
        this.fetch();
    }
});

App.addRegions({
    place: "#place",
    page: "#page"
});

App.on("start", function(){
    //console.log("start");

    var teachers = new TeacherList();

    var createView = new App.CreateView({collection: teachers});
    App.place.show(createView);

    var teacherPage = new App.TeacherView({model: Teacher});
    App.page.show(teacherPage);
});

App.StaticView = Marionette.ItemView.extend({
    template: "#static-template",
    tagName : "tr",
    events : {
	
	"blur #comments": function(e) {
	    this.model.set('comments', e.target.innerHTML);
	},
	
    },

    modelEvents: {
        // if model changes
        "change": function() {
	    // re-load page
            this.render();
            // Updates with server-side
            this.model.save();
        }
    }
});

App.CreateView = Marionette.CompositeView.extend({
    template: "#new-template",
    childView: App.StaticView,
    childViewContainer: 'tbody',
    events : {
	"click #add" : function(e){
	    //console.log('adding');
	    e.preventDefault();
	    var n = $("#name_val").val();
	    var com = $("#comments_val").val();
	    var per = $("#period_val").val();
	    var p = parseInt(per);
	    console.log(n);
	    //console.log(com);
	    $('#name_val').val('');
	    $('#comments_val').val('');
	    $('#period_val').val('');
	    if (n.length > 0 && com.length > 0 && per.length > 0 && p){
		console.log('ye');
		console.log(n);
		var newTeacher = this.collection.create({name: n, period: per, comments: com}, { wait: true});
	    }
	    else{
		console.log('nay');
	    }
	}
    }
});

App.TeacherView = Marionette.ItemView.extend({
    template: "#teacher-template",
    tagName : "tr",
    events : {
	"click #delete" : function() { this.destroy();}
    },
});

App.start();
