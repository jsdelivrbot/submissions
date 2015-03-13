//console.log(rawscores);

var data = rawscores["data"];
/*
//console.log(data);

var school_scores = [];

for ( var i = 0; i < data.length; i++ ) {
    var temp = {
        code: data[i][8],
        name: data[i][9],
        num: data[i][10],
        eng: data[i][11],
        math: data[i][12],
        writing: data[i][13]
    };
    school_scores.push(temp);
}

//console.log(school_scores);

var math_scores = [];

for ( var i = 0; i < school_scores.length; i++ ) {
    var temp = school_scores[i]["math"];
    if (temp != "s") {
	math_scores.push(parseInt(temp));
    }
}

var total_math = 0;

for ( var i = 0; i < math_scores.length; i++ ) {
    total_math += math_scores[i];
}

var mean_math = total_math / math_scores.length;

var success_schools = {};

for ( var i = 0; i < school_scores.length; i++ ) {
    var temp = school_scores[i];
    if ( temp["math"] > mean_math ) {
        success_schools[temp["name"]] = temp["math"];
    }
}
*/
var math_scores = _.map(data, function(x) {return x[12];});
math_scores = _.filter(math_scores, function(x) {return !isNaN(x);});
var l = math_scores.length
var mean = _.reduce(math_scores, function(sum, x) {return parseInt(sum) + parseInt(x);}) / l;
var success_schools = _.filter(data, function(x) {return parseInt(x[12]) >= mean;});
