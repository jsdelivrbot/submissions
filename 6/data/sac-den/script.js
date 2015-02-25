// Get data from data.js
var usefulData = rawData.data;

var school_scores = [];
var math_scores = [];

// Make dictionary of a few fields in school_scores
for (var i=0; i<usefulData.length; i++) {
    var tmp_data = {
		name : usefulData[i][9],
		code : usefulData[i][8],
		num : usefulData[i][10],
		eng : usefulData[i][11],
		math : usefulData[i][12],
		writing : usefulData[i][13],
    };
    school_scores.push(tmp_data);
    if (usefulData[i][12] != "s") {
    	math_scores.push(usefulData[i][12]);
    };
};


// Compute the mean math score
var sum = 0;

for (var i = 0; i < math_scores.length; i++) {
	sum = sum + parseInt(math_scores[i]);
};

var mean = sum / math_scores.length;

console.log(mean);


// Put the schools above average into a dictionary
var schools_above_avg = [];

for (var i=0; i<school_scores.length; i++) {
    if (school_scores[i]['math'] > mean) {
    	// console.log('test');
    	schools_above_avg.push(school_scores[i]);
    };
};

console.log(schools_above_avg);