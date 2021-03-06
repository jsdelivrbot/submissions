/* Express and Dependencies */
var express 			= require('express'),
	ejs					= require('ejs'),
	bodyParser 			= require('body-parser');

/* Native MongoDB NodeJS Driver */
var mongo 				= require('mongodb'),
	MongoClient 		= mongo.MongoClient,
	ObjectID			= mongo.ObjectID,
	format 				= require('util').format;

/* Local MongoDB Connection Setup */
var host 				= process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : "127.0.0.1",
	port 				= process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : 27017,
	dbName 				= "genji-home",
	collectionProjects  = "projects",
	collectionPosts 	= "posts",
	mongoConnectionURI 	= format("mongodb://%s:%s/%s", host, port, dbName); 


var app = express();
app.use(express.static('public'));
app.use(bodyParser({strict: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
	res.sendFile("index.html", { root: __dirname + "/public/" });
});

app.get('/projects', function(req, res){	
	MongoClient.connect(mongoConnectionURI, function(err, db){
		if(err) {
			throw err;
		}
	
		var collection = db.collection(collectionProjects);
	
		var response = { projects: [] }
		collection.find().each( function(err, item) {
			if (err) {
				throw err;
			}

			if (item === null) {
				db.close();
				res.json(response);
			} else {
				response.projects.push(item);
			}
		});
	})
});


app.listen(5000,function(){
	console.log("App Started on PORT 5000");
});



