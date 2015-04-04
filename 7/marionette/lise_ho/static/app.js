var App = new Marionette.Application();
//Backbone.emulateHTTP = true;
App.addRegions({
    firstRegion:"#first-region",
    secondRegion:"#second-region",
    thirdRegion:"#third-region",
    fourthRegion:"#fourth-region"
}); 
// equate regions to html code with id's above

App.on("start", function(){
    console.log("started");
    // create the views and show the views in the html code
    
    var startView = new App.StartView({model:tama});
    App.firstRegion.show(startView);

    var staticView = new App.StaticView();
    App.fourthRegion.show(staticView);
    
    var addView = new App.AddView({collection:c});
    App.thirdRegion.show(addView);

    var compositeView = new App.CompView({collection:c, model:tama});
    App.secondRegion.show(compositeView);
 //   var tamaView = new App.TamaView({collection:c,model:tama});
   // App.secondRegion.show(tamaView);

});


App.StaticView = Marionette.ItemView.extend({
    template:"#static-template" //yea no need to hard code every static view with html
});

App.TamaStatView = Marionette.ItemView.extend({
    template:"#attributes-template",
    tagName:"tr",
    events:{
	"click #disown":function(){
	    if (this.model.get("id")>1){
		this.model.destroy();
	    }
	    else{
		alert("You cannot disown yourself.");
	    }
	}
    },
    modelEvents:{
	"change":function(){
	    this.render();
	    //this.model.save();
	}
    }
});

App.StartView = Marionette.ItemView.extend({
    template:"#start-template",
    childView:App.ItemView,
    events:{
	"click #changename": function(){
	    //mongoadd($("newname").val())
	    if ($("#newname").val().length >0){
		this.model.set("name", $("#newname").val());
		//console.log($("#newname").val());
		//console.log(this.model.attributes.name);
		//console.log("adding NEW NAME");	
		this.render();
	    }
	}	
    },
    modelEvents:{
	"change":function(){
	    this.render();
	    this.model.save(); // sends Post/Put Request 
	}
    }
});
App.AddView = Marionette.ItemView.extend({
    template:"#add-template",
    events:{
	"click #addnew": function(){
	    if ($("#name2").val().length >0) {
		n += 1;
		var x = new Tamagachi({
		    name: $("#name2").val(),
		    happiness:  Math.floor((Math.random() * 5)+3),
		    hunger: Math.floor((Math.random() * 5)+1),
		    id:n,
		    img_src: image,
		});
		n += 1;
		c.add(x.toJSON());
		// ADD TO MONGO DB
		this.render();
		x.save();
	    }
	}

    }
})

App.CompView = Marionette.CompositeView.extend({
    template:"#composite-template",
    childView:App.TamaStatView,
    childViewContainer:"tbody",
    events:{
        "click #add":function(){
	    console.log("adding something");
	},
	"change": function(){
	    console.log(JSON.stringify(c));
	    this.render();
	}
    }
})
var names = prompt("Welcome to the family of Tamagchi! \nPlease enter the name of the first member of your Tamagachi's family (presumably your name).\n");

var image ="http://vignette2.wikia.nocookie.net/tamagotchi/images/8/8d/Tamagotchi_blue.png/revision/latest?cb=20110906021758";
var Tamagachi = Backbone.Model.extend({
    idAttributes:"id",
    urlRoot:"/ca",
});
var n = 1;
var tama = new Tamagachi({
    happiness:5,
    name:names, //names comes from in line script in html file
    hunger:2,
    id:n, //I turn id into ids later (in app.py)
    img_src:image
});
n += 1 // probably very inefficient way of making sure the keys are never the same....

var TamaCollection = Backbone.Collection.extend({
    model:Tamagachi,
    url:"/ca",
    comparator:name,
    
    initialize:function(){
	this.fetch();
    }
});
tama.save()
var c = new TamaCollection([tama]);

App.start();
