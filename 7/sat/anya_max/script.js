raw_data = raw_data["data"]; //8-13
var school_scores = []

for (i = 0; i < raw_data.length; i++){
    var score =
	{ "code" : raw_data[i][8],
	  "name" : raw_data[i][9],
	  "num"  : raw_data[i][10],
	  "reading" : raw_data[i][11],
	  "math" : raw_data[i][12],
	  "writing": raw_data[i][13]

	};
    school_scores.push(score)
}


//console.log(raw_data);
console.log(school_scores);
score_text = school_scores;
JSON.stringify(score_text);


var body = document.getElementsByTagName("body");
var newitem = document.createElement("p")
var t = document.createTextNode(score_text);

newitem.appendChild(t)
