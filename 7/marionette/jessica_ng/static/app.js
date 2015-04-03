var App = new Marionette.Application();


function ajaxsendstory(text) {
    if(text.length==0) {return;}
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/ajax/story/test",
        data: JSON.stringify({
            content: text, 
            channel: "test"
        }),
        dataType: "json",
        success: function(r){
            cm = $("#storymain");
            cm.scrollTop(cm.prop("scrollHeight"));
        }
    });
}

function ajaxupdatestory() {
    jQuery.getJSON("/ajax/story/test",updatestory);
}

function updatestory(r) {
    var cm = $("#storymain")
    cm.html(r.content);
    window.setTimeout(ajaxupdatestory,1000);
}

App.addRegions({
	storyReg: "#story-reg"
});

App.on("start",function(){
	var storyView = new App.StoryView({collection:storys});
	App.storyReg.show(storyView);

	Backbone.history.start();
    ajaxupdatestory();
});

App.StoryView = Marionette.CompositeView.extend({
    template: "#story-template",
    childView: App.MessageView,
    childViewContainer: "span",
    events: {
        "click #storysendbutton": function() {
            var newstory = $("#storytext").val();
            if (newstory != "") {
                ajaxsendstory(newstory);
                ajaxupdatestory();
                this.$("#storytext").focus();
            }
            $("#storytext").val("");
        },
		"keydown #storytext": function(e){
            if (e.keyCode==13) {
                var newstory = $("#storytext").val();
                if (newstory != "") {
                    ajaxsendstory(newstory);
                    ajaxupdatestory();
                    this.$("#storytext").focus();
                }
                $("#storytext").val("");
            }
        }
    },
    modelEvents: {
        "change": function() {
            this.render();
        }
    }
});

var Message = Backbone.Model.extend();
var Storys = Backbone.Collection.extend({
    model:Message
});

var storys = new Storys();



App.start();
