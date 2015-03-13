var PlaceView = Backbone.View.extend({
    el:"#place",
    template: _.template($("#place_template").html()),
    events: {
    },
    initialize:function(){
        this.render();
    },
    render: function(){
        var e = this.template(this.model.toJSON());
        this.$el.empty();
        this.$el.append(e);
        $('#txtreview').hide();
        return this;
    }


});

var RatingView = Backbone.View.extend({
    el:"#rating",
    template: _.template($("#rating_template").html()),
    events: {
        "click #del" : function(e) {
            this.remove();
        },
        "click #up" : function(e) {
            var r = this.model.get("rating");
            r = parseInt(r) + 1;
            this.model.set('rating',r);
            this.render();
        $('#reviews').hide();
        $('#txtreview').hide(); },
        "click #down" : function(e) {
            var r = this.model.get("rating");
            r = parseInt(r) - 1;
            this.model.set('rating',r);
            this.render();
        $('#txtreview').hide();
        $('#reviews').hide();
        },
        "blur #description" : function(e) {
            this.model.set('description', e.target.innerHTML);
            this.render();
        },
        "click #addreview" : function(e) {
            $("#txtreview").show();
            $('#addreview').hide();
            $('#review').focus();
        },
        "click #submitreview" : function(e) {
            var reviews = this.model.get('reviews');
            var review = $('#review').val();
            reviews.push(review);
            $('#review').val('');
            this.model.set('reviews', reviews);
            placeView.render();
            $('#txtreview').hide();
            $('#reviews').show();
            $('#addreview').show();
        },
        "click #viewreviews": function(e) {
            placeView.render();
        }
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
            placeView.render();
            ratingView.render();
        }});
    },
    defaults:{'name':'name goes here',
              'rating':0,
              'description':'No description available',
          'reviews':[]
             },
    validate:function(attrs,options){
        if (isNaN(attrs.rating)){
            return "Rating must be numeric";
        }
    }
});

var Reviews = Backbone.Model.extend({
    initialize: function() {

    },
    defaults: {'reviews': []}
});

var p1 = new Place({name:"Terry's", rating:5, description:'This is an epic description'});
var placeView = new PlaceView({model:p1});
var ratingView = new RatingView({model:p1});
