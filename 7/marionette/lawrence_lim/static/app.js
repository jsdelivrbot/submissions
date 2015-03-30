var App = new Marionette.Application();

var chatupdaterate = 1;

var curchan = "test";

function ajaxsendchat(text) {
    if(text.length==0) {return;}
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/ajax/chat/test",
        data: JSON.stringify({
            content: text, 
            author: user.get("name"),
            channel: curchan
        }),
        dataType: "json",
        success: function(r){
            cm = $("#chatmain");
            cm.scrollTop(cm.prop("scrollHeight"));
        }
    });
}

function ajaxupdatechat() {
    jQuery.getJSON("/ajax/chat/test",updatechat);
}

function updatechat(r) {
    var cm = $("#chatmain")
    //toScroll = cm.scrollTop()+cm.height()==cm.prop("scrollHeight");
    toScroll = true;
    cm.html(r.content);
    if (toScroll) {cm.scrollTop(cm.prop("scrollHeight"));}
    window.setTimeout(ajaxupdatechat,1000/chatupdaterate);
    //fix this at some point
}

App.addRegions({
	headReg: "#head-reg",
	nameReg: "#name-reg",
	chatReg: "#chat-reg"
});

App.on("start",function(){
	var headView = new App.HeadView();
	App.headReg.show(headView);
    
	var nameView = new App.NameView({model:user});
	App.nameReg.show(nameView);
    
	var chatView = new App.ChatView({collection:chats});
	App.chatReg.show(chatView);

	Backbone.history.start();
    ajaxupdatechat();
});

App.HeadView = Marionette.ItemView.extend({
	template: "#head-template"
});

App.NameView = Marionette.ItemView.extend({
	template: "#name-template",
	tagName: "div",
	events: {
		"click #namesetbutton": function(){
            var newname = $("#nametext").val();
            if (newname != "") {
                this.model.set({name:newname});
            }
        },
		"keydown #nametext": function(e){
            if (e.keyCode==13) {
                var newname = $("#nametext").val();
                if (newname != "") {
                    this.model.set({name:newname});
                    this.$("#nametext").focus();
                }
            }
        }
	},
	modelEvents: {
		"change":function(){
			this.render();
		}
    }
});

App.ChatView = Marionette.CompositeView.extend({
    template: "#chat-template",
    childView: App.MessageView,
    childViewContainer: "span",
    events: {
        "click #chatsendbutton": function() {
            var newchat = $("#chattext").val();
            if (newchat != "") {
                ajaxsendchat(newchat);
                ajaxupdatechat();
                this.$("#chattext").focus();
            }
            $("#chattext").val("");
        },
		"keydown #chattext": function(e){
            if (e.keyCode==13) {
                var newchat = $("#chattext").val();
                if (newchat != "") {
                    ajaxsendchat(newchat);
                    ajaxupdatechat();
                    this.$("#chattext").focus();
                }
                $("#chattext").val("");
            }
        }
    },
    modelEvents: {
        "change": function() {
            this.render();
        }
    }
});

var User = Backbone.Model.extend();
var Message = Backbone.Model.extend();
var Chats = Backbone.Collection.extend({
    model:Message
});

var user = new User({name:"Anonymous"});
var chats = new Chats();

var myController = Marionette.Controller.extend({
	default : function() {
		var compView = new App.CompView({collection:c, model : person});
		App.firstRegion.show(compView);
	},
	oneRoute : function() {
		App.firstRegion.show(new App.PlaceView({model:p1}));
		App.secondRegion.show(new App.PlaceView({model:p2}));
	},
	twoRoute : function() {
		App.firstRegion.show(new App.PlaceView({model:p2}));
		App.secondRegion.show(new App.PlaceView({model:p1}));
	}
});

App.controller = new myController();

App.router = new Marionette.AppRouter({
	controller : App.controller,
	appRoutes : {
		"/": "default",
		one: "oneRoute",
		two: "twoRoute"
	}
});

App.start();
