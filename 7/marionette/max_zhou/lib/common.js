Stories = new Mongo.Collection("stories"); //where does the init go?
Titles = new Mongo.Collection("titles"); //this stores all the titles so we can insert into a specific story!

Meteor.methods({
    addText: function(title, text){
	Stories.update({"title": title}, {$set: {"text": text, "title": title}}, {upsert: true});
    },
    updateSelected: function(title, index){
	//the other way is to add it as a property of each text itself...which makes this more elegant but messes up the templates a bit again.  -shrug-
	var selected = Stories.findOne({"title": title});
	var selectedAry = []
	//console.log(title);
	//console.log(index);
	//console.log(selected);

	selectedAry = selected['selected'];
	//console.log(selectedAry);

	if (!selectedAry){ //doesn't already have one
	    selectedAry = [];
	    selectedAry.push(index);
	}
	else{ //...maybe I should've used _ here...
	    if (_.indexOf(selectedAry, index) >= 0){ //already in the array
		//console.log("took if");
		selectedAry.splice(_.indexOf(selectedAry, index), 1); //remove it
		//don't need to sort since it's already sorted
	    }
	    else{ //not in the array
		//console.log("took else");
		selectedAry.push(index); //for large stories it may be more efficient to insert into the correct position rather than push and resort, but too lazy right now
		selectedAry.sort();
	    }
	}
	console.log(selectedAry);
	//console.log(title);
	Stories.update({"title": title}, {$set: {"selected": selectedAry}}, {upsert: true});
    }
});

