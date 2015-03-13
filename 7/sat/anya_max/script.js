raw_data = raw_data["data"]; //8-13
var school_scores = [];

for (i = 0; i < raw_data.length; i++){
    var score =
	{ "code" : raw_data[i][8],
	  "name" : raw_data[i][9],
	  "num"  : raw_data[i][10],
	  "reading" : raw_data[i][11],
	  "math" : raw_data[i][12],
	  "writing": raw_data[i][13]

	};
    school_scores.push(score);
};


//console.log(raw_data);
//console.log(school_scores);

var math_scores = [];
for (i = 0; i < school_scores.length; i++){
	math_scores.push(school_scores[i]["math"]);
};

//console.log(math_scores);

var good_math_scores = [];

for (i = 0; i < math_scores.length; i++){
	if (!isNaN(math_scores[i])){
		good_math_scores.push(math_scores[i]);
	};
};

//console.log(good_math_scores);

var math_mean = 0;

for (i = 0; i < good_math_scores.length; i++){
	math_mean += parseInt(good_math_scores[i]);
};
math_mean /= good_math_scores.length;

//console.log(math_mean);

var above_average_math_schools = [];
for (i = 0; i < school_scores.length; i++){
	if (parseInt(school_scores[i]["math"]) > math_mean){
		above_average_math_schools.push(school_scores[i]["name"]);
	};
};

console.log(above_average_math_schools);