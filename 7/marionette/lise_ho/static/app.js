console.log("ADSFADSFADSFASDFAD");
var App = new Marionette.Application();

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

App.StartView = Marionette.CompositeView.extend({
    template:"#start-template",
    childView:App.ItemView,
    events:{
	"click #changename": function(){
	    //mongoadd($("newname").val())
	    this.model.attributes.name =$("#newname").val();
	    console.log($("#newname").val());
	    console.log(this.model.attributes.name);
	    console.log("adding NEW NAME");	
	    // ADD TO MONGO DB
	    this.render();
	}	
    }
});
App.CompView = Marionette.CompositeView.extend({
    template:"#composite-template",
    childView:App.TamaStatView,
    childViewContainer:"tbody",
    events:{
        "click #add":function(){
	    console.log("adding something");
	}
    }
});

var Tamagachi = Backbone.Model.extend();
var tama = new Tamagachi({
    happiness:5,
    name:names, //names comes from in line script in html file
    hunger:2,
    img_src:"http://vignette2.wikia.nocookie.net/tamagotchi/images/8/8d/Tamagotchi_blue.png/revision/latest?cb=20110906021758"
});
var tama2 = new Tamagachi({
    happiness:9,
    name:"Samuel", //names comes from in line script in html file
    hunger:20,
    img_src:"http://vignette2.wikia.nocookie.net/tamagotchi/images/8/8d/Tamagotchi_blue.png/revision/latest?cb=20110906021758"
});
var TamaCollection = Backbone.Collection.extend({
    model:Tamagachi,
    comparator:name
});

var c = new TamaCollection([tama, tama2]);

console.log(tama.attributes.name)



App.start();
