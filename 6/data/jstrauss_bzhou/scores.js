var school_scores = [];

for (var i=0; i<rawscores['data'].length; i++) {
    var school = rawscores['data'][i];
    school_scores.push( {
	'name': school[9],
	'code': school[8],
	'num_testers': school[10],
	'eng': school[11],
	'math': school[12],
	'writing': school[13]
    });
};

//document.getElementById("a").innerHTML = school_scores.toString();

var math_scores = []

for (var i=0; i<rawscores['data'].length; i++) {
    var school = rawscores['data'][i];
    math_scores.push(school[12]);
}

document.getElementById("a").innerHTML = "List of math scores: " + math_scores.toString();

var mean = function(list) {
	var mean_score = 0;
	var list_length = list.length;
	for (var i=0; i<list.length; i++) {
		if (isNaN(list[i])) {
			list_length--;
		}
		else {
			mean_score += parseInt(list[i]);
		}
	}
	return mean_score / list_length;
}

var mean_math = mean(math_scores);

document.getElementById("b").innerHTML = "Mean math score: " + mean_math.toString();