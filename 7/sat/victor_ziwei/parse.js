//var school-scores=[{code:---,name:---,number:---,english:---,math:---,writing:---}];
rawschooldata = rawscores.data;
console.log(rawschooldata);
school_scores= [];

for (var i=0; i< rawschooldata.length; i++){
    var tmp = {
	code:rawschooldata[i][8],
	name:rawschooldata[i][9],
	number:rawschooldata[i][10],
	english:rawschooldata[i][11],
	math:rawschooldata[i][12],
	writing:rawschooldata[i][13],
    };
    school_scores.push(tmp);
};

console.log(school_scores);

math_scores = new Array();

for (var i=0; i < school_scores.length; i++) {
    math_scores.push(parseInt(school_scores[i]['math']));
}

math_scores=math_scores.filter(function(x) {return !isNaN(x);});

console.log(math_scores);

var mean = math_scores.reduce(function(x, y) {return x + y;}) / math_scores.length;

var filtered_schools = school_scores.filter(function(x) { return x.math > mean });

console.log(mean);
console.log(filtered_schools);
