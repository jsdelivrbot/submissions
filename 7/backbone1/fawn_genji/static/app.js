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
						rating	: 0
					}	
});

var PrettyView = Backbone.View.extend({
	el			:	"#pretty",
	template	:	_.template( $("#pretty_template").html()),
	events		:	{
						/* Still haven't decided on how to do real-time updating with multiple views */
						/* Sorry fawn */
						/* Also sorry because I'm ocd about tabbing */
						/* much sorry fawn */
	
					}
	render		:	function() {
						/* There's an error here but I have no idea how to fix it */
						/* Sorry fawn */
						/* Text me if you can't figure something out and need me to do things*/
						var e = this.template(this.model.toJSON());
						this.$el.empty();
						this.$el.append(e);
						return this;
					},	
	initialize	:	function() {
						this.render();
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
					},
	render		:	function() {
						/* There's an error here but I have no idea how to fix it */
						/* Sorry fawn */
						/* Text me if you can't figure something out and need me to do things*/
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
var pView = new PrettyView(p);
var uView = new UglyView(p);

