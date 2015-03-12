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
            r = parseInt(r);
            r = r + 1;
            this.model.set('rating',r);
            this.render();
	    $('#reviews').hide();
	    $('#txtreview').hide(); },
        "click #down" : function(e) {
            var r = this.model.get("rating");
            r = parseInt(r);
            r = r - 1;
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
	    $('#reviews').hide();
	    console.log('add review');
	},
	"click #subreview" : function(e) {
	    var reviews = this.model.get('reviews');
	    var review = $('#review').val();
	    $('#txtreview').hide();
	    reviews.push(review);
	    console.log(reviews);
	    this.model.set('reviews', reviews);
	    placeView.render();
	    $('#txtreview').hide();
	    $('#reviews').hide();
	},
	"click #viewreviews": function(e) {
	    var reviews = this.model.get('reviews');
	    console.log("reviews: " + reviews);
	    //$('#reviews').html(reviews);
	    //$('#reviews').show();
	    //this.render();
	    placeView.render();
	    $('#txtreview').hide();
	    //$('#reviews').toggle();
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
            console.log("Changed"+this.toJSON())}});
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
