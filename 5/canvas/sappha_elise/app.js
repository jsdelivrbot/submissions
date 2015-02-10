var app = { running: true }

app.set = function(c) {
    for (var constant in c){
	if (c.hasOwnProperty(constant) && !(constant in app)) {
	    app[constant] = c[constant];
	}
    }
}