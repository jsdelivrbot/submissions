console.log("hurr");



/* Backbone Models and Views */
var Place = Backbone.Model.extend({
	initialize	:	function() {
						this.on("change", this.onChange());
				  	},
	destroy		:	function() {
						this.off("change", this.onChange());
					},
	onChange	: 	function() {
						console.log("Changed!");
					},
	defaults	:	{
						name	: "defaultName",
						rating	: 0,
						review	: ""
					}	
});

var PrettyView = Backbone.View.extend({
	el			:	"#pretty",
	template	:	_.template( $("#pretty_template").html()),
	render		:	function() {
						/* There's an error here but I have no idea how to fix it */
						/* Sorry fawn */
						/* Text me if you can't figure something out and need me to do things*/
						var e = this.template(this.model.toJSON());
						this.$el.empty();
						this.$el.append(e);
						console.log(this.model.review);
						return this;
					},	
	initialize	:	function() {
						this.render();
						this.listenTo(this.model, 'change', this.render);
						console.log("initializing pretty view");
						this.listenTo(this.model, 'destroy', this.render);
					}
});

var UglyView = Backbone.View.extend({
	el			:	"#ugly",
	template	:	_.template( $("#ugly_template").html()),
	events		:	{
						"click .del"	: 	function(e) {
												console.log("deleting");
												this.remove();
										  	},	
						"click .up"		: 	function(e) {
												console.log("upvote");
												var r = this.model.get("rating");
												r = parseInt(r);
												r = r + 1;
												this.model.set("rating",r);;
												this.render();
										  	},	
						"click .down"	: 	function(e) {
												console.log("downvote")
												var r = this.model.get("rating");
												r = parseInt(r);
												r = r - 1;
												this.model.set("rating",r);;
												this.render();
										  	},
						"click .edit"	:	function(e) {
												var text = $("textarea").val();
												console.log(text);
												this.model.set("review", text);
											},
						"click .erase"	: 	function(e) {
												$("textarea").val('');
												var text = $("textarea").val();
												this.model.set("review", text);
											},			
					},
	render		:	function() {
						var e = this.template(this.model.toJSON());
						this.$el.empty();
						this.$el.append(e);
						return this;
					},	
	initialize	:	function() {
						this.render();
					}
});


var p = new Place({name: "Terry's", rating: 5});
var pView = new PrettyView({model:p});
var uView = new UglyView({model:p});

