var App = new Marionette.Application();

App.addRegions({
    inputRegion:"#input-region"
});

App.InputView = Marionette.ItemView.extend({
    template: "#input-template",
    tagName: "tr"
    events: {
        "click #add": function() {
            var tableteam = document.getElementById("tableteam");
            var tablepiece = document.getElementById("tablepiece");
            var tablefrom = document.getElementById("tablefrom");
            var tableto = document.getElementById("tableto");
            
            tableteam.innerHTML = $("#team").val();
            tablepiece.innerHTML = $("#piece").val();
            tablefrom.innerHTML = $("#start").val();
            tableto.innerHTML = $("#end").val();
        }
    }
});

App.on("start", function() {
    console.log("App started");
    var inputView = new App.InputView();
});

App.start();
