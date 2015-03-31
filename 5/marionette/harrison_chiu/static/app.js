"use strict";

var App = new Marionette.Application();

App.addRegions({
    statRegion:"#stat-region"
});

App.StatView = Marionette.ItemView.extend({
    template: "#stat-template",
    tagName: "tr",
    events: {
        "click #delete": function() {
            this.remove();
        },
        "click #checked": function() {
            this.model.attributes.using = !this.model.attributes.using;
        },
        "click #update": function() {
            this.model.attributes.value =
                parseInt($("#value")[0].innerHTML);
        }
    }
});

App.StatsView = Marionette.CompositeView.extend({
    template: "#stats-template",
    childView: App.StatView,
    childViewContainer: "tbody",
    events: {
        "click #roll": function() {
            var m = parseInt($("#dice-quantity").val());
            var n = parseInt($("#dice-value").val());
            var raw_val = parseInt($("#bonus").val());
            for (; m > 0; m--) {
                raw_val += 1 + Math.floor(Math.random() * n);
            }

            var modifier_val = 0;
            _.map(this.collection.models, function(item) {
                if (item.attributes.using) {
                    modifier_val += item.attributes.value;
                }
            });
            //HOW TO USE CHILD VALUES (SEE ABOVE)
            var raw = document.getElementById("raw");
            var modifier = document.getElementById("modifier");
            var total = document.getElementById("total");
            raw.innerHTML = raw_val;
            modifier.innerHTML = modifier_val;
            total.innerHTML = raw_val + modifier_val;
        },
        "click #add": function() {
            this.collection.models.push(new Stat({
                name: "Rename",
                value: 0,
                using: false
            }));
            this.render();
            //BACKBONE COLLECTIONS AND HOW TO USE THEM
        }
    }
});

var Stat = Backbone.Model.extend({});
var Stats = Backbone.Collection.extend({
    model:Stat
});
var str = new Stat({
    name:"Strength",
    value:4,
    using:false
});
var wis = new Stat({
    name:"Wisdom",
    value:-1,
    using:false
});
var stats = new Stats([str, wis]);

App.on("start", function() {
    console.log("App started");
    
    var statsView = new App.StatsView({collection:stats});
    App.statRegion.show(statsView);

    Backbone.history.start();
});

App.start();
