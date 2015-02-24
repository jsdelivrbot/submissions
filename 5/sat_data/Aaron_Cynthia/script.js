console.log(rawdata);
rawschools = rawdata.data;
console.log(rawschools);

// convert to a more usable dictionary
var school_scores = []
for (var i = 0; i < rawschools.length;i++){
    var t = {code: rawschools[i][8],
	     name: rawschools[i][9],
	     num: rawschools[i][10],
	     eng: rawschools[i][11],
	     math: rawschools[i][12],
	     writing: rawschools[i][13]
	    };
    school_scores.push(t);
};
console.log(school_scores);

// pull out all of the math scores
var math_scores = []
for (var i = 0; i < school_scores.length; i++){
    var score = parseInt(school_scores[i]['math']);
    if (!isNaN(score)){
	math_scores.push(score);
    };
};
console.log(math_scores);

//average of math scores
var math_average = 0;
for (var i = 0; i < math_scores.length; i++){
    math_average += math_scores[i];
};
math_average /= math_scores.length;
console.log(math_average);

//all schools with math schores > than the average in a dictionary
var above_math_average = {};
var count = 0;
for (var i = 0; i < school_scores.length;i++){
    var math_score = school_scores[i]['math'];
    if (math_score > math_average){
	var school_name = school_scores[i]['name'];
	above_math_average[school_name] = math_score;
	count++;
    };
};
console.log(above_math_average);
console.log(count); //num of schools above average
