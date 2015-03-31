var app = new Marionette.Application();

app.on("start",function() {
    //n1 = new app.Note({content:"First Note"});
    app.c = new app.Collection();
    //app.c.add(n1);
    app.cv = new app.CV({collection:app.c});
    app.main.show(app.cv);
});

/*app.addRegions({
    write:"#write",
    read:"#read"
    });*/

app.addRegions({
    main:"#main",
});

app.Note = Backbone.Model.extend({
    urlRoot:'/note',
    idAttribute:'_id',
    id:'_id',
    initialize:function(){
	this.on({
	    "change":function() {
		console.log("Changed"+this);
	    }
	});
    }
});

app.Collection = Backbone.Collection.extend({
    model:app.Note,
    url:'/notes',
    initialize:function() {
	this.fetch(function(d){
	    console.log(d);
	    this.render();
	});
	this.on({'add':function() {
	    console.log("added");
	}});
    }
});

app.NV = Marionette.ItemView.extend({
    tagName:'tr',
    template:"#note_template",
    events:{
	"click .remove":function(e){
	    var that=this;

	    this.model.destroy({
		success: function(d){
		    console.log(d);
		    that.remove();
		    that.render();
		}});
	}
    }
});

app.CV = Marionette.CompositeView.extend({
    events:{
	"click #add":function(e) {
	    that = this;
	    e.preventDefault();
	    var note = $("#note").val();
	    var m = new app.Note({content:note});
	    m.save(m.toJSON(),{success:function(m,r){
		if (r.result.n==1){
		    that.collection.add(m);
		    that.render();
		}
	    }});
	    console.log(m);
	}
    },
    template:"#cv_template",
    childViewContainer:"table",
    childView:app.NV
});

app.start();
