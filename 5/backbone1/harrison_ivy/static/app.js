console.log("HELLO");

var InfoView = Backbone.View.extend({
    el:"#info",
    template: _.template($("#info_template").html()),
    initialize:function(){
        this.listenTo(this.model,"change",this.render);
        this.render();
    },
    render:function(){
        var e = this.template(this.model.toJSON());
        this.$el.empty();
        this.$el.append(e);
        return this;
    },
    events: {
        "click #del" : function(e) {
            this.remove();
        }
    }
});

var EditView = Backbone.View.extend({
    el:"#edit",
    template: _.template($("#edit_template").html()),
    events: {
        "click #del" : function(e) {
            this.remove();
        },
        "click #up" : function(e) {
            var r = this.model.get("rating");
            r = parseInt(r);
            r = r + 1;
            this.model.set('rating',r);
            this.render();
        },
        "click #ed" : function(e) {
            this.model.set('description',
                          $("#newdesc").text());
            this.render();
        },
        "click #down" : function(e) {
            var r = this.model.get("rating");
            r = parseInt(r);
            r = r - 1;
            this.model.set('rating',r);
            this.render();
        },
    },
    initialize:function(){
        this.render();
    },
    render: function(){
        var e = this.template(this.model.toJSON());
        this.$el.empty();
        this.$el.append(e);
        return this;
    }
});


var Place = Backbone.Model.extend({
    initialize: function() {
        this.on({"change":function() {
            console.log("Changed"+this.toJSON())}});
    },
    defaults:{'name':'name goes here',
              'rating':0,
              'description':'some description here'},
    validate:function(attrs,options){
        if (isNaN(attrs.rating)){
            return "Rating must be numeric";
        }
    }
});

var p1 = new Place({name:"Terry's", rating:5});
var v1 = new InfoView({model:p1});
var v2 = new EditView({model:p1});
