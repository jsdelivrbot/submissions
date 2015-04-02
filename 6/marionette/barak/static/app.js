
var board1 = new ChessBoard('board1', {
    position: 'start',
    showNotation: true,
    draggable: true,
    /*
      onChange: function() {
	console.log(board1.fen());
    }
    */
});


var App = new Marionette.Application();

App.addRegions({
    add: "#board1"
    
});

App.on ("start", function() {
    console.log("ok i start");
    console.log("my fen notation is: " + board1.fen());
    //App.add.show(board1);
    Backbone.history.start();
});

App.View = Marionette.ItemView.extend( {
    //everything broke here. Changing the chessboard does not actually trigger the change.
    modelEvents: {
	"change": function() {
	    var fen = board1.fen();
	    console.log("changed: " + fen);
	    m = new Model({content: fen});
	    m.save(m.toJSON());
	}
    }
});

var Model = Backbone.Model.extend({
    url: "/",
    idAttribute: '_id'
});

App.start();
