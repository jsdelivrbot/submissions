var App = new Marionette.Application();

App.addRegions({
    storyRegion:"#story-region",
    submitRegion:"#submit-region",
    descRegion:"#desc-region"
});

App.on("start",function(){
    var storyView 
