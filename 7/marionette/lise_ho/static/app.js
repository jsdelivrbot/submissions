console.log("ADSFADSFADSFASDFAD");
var App = new Marionette.Application();
var names = "Samuel"
var image ="http://vignette2.wikia.nocookie.net/tamagotchi/images/8/8d/Tamagotchi_blue.png/revision/latest?cb=20110906021758";
var Tamagachi = Backbone.Model.extend({
    idAttributes:"_id",
    url:"/ca"
});
// names = prompt("Welcome to the family of Tamagchi! \nPlease enter the name of the first member of your Tamagachi's family (presumably your name).\n");
var tama = new Tamagachi({
    happiness:5,
    name:names, //names comes from in line script in html file
    hunger:2,
    priority:10,
    img_src:image
});
tama.save();
var TamaCollection = Backbone.Collection.extend({
    model:Tamagachi,
    comparator:name,
    
    initialize:function(){
	this.fetch();

    }
});


var n = 2;
var c = new TamaCollection([tama]);

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
	    this.remove();
	}
    },
    modelEvents:{
	"change":function(){
	    this.render();
	}
    }
});

App.StartView = Marionette.ItemView.extend({
    template:"#start-template",
    childView:App.ItemView,
    events:{
	"click #changename": function(){
	    //mongoadd($("newname").val())
	    this.model.set("name", $("#newname").val());
	    //console.log($("#newname").val());
	    console.log(this.model.attributes.name);
	    console.log("adding NEW NAME");	
	    // ADD TO MONGO DB
	    this.render();
	}	
    }
});
App.AddView = Marionette.ItemView.extend({
    template:"#add-template",
    events:{
	"click #addnew": function(){
	    var x = new Tamagachi({
		name: $("#name2").val(),
		happiness:  Math.floor((Math.random() * 5)+3),
		hunger: Math.floor((Math.random() * 5)+1),
		_id:n,
		img_src: image,
	    });
	    n += 1;
	    c.add(x);
	    console.log(c,x.get("name"));
	    
	    // ADD TO MONGO DB
	    this.render();
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
});


App.start();
