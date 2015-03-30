var App = new Marionette.Application();

App.addRegions({
    storyRegion : "#story-region",
    addingRegion : "#adding-region"
});

App.on("start", function(){
    console.log("Initializing");
});
