console.log (rawdata);

rawschools = rawdata.data
console.log(rawschools)

school_scores = []
for (var i = 0; i< rawschools.length; i++){
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

var average = 0;
var j = 0;
var k = 0;
for (j = 0; j < school_scores.length; j++)  {
    if (school_scores[j].math != "s") {
	k += 1;
	average = average + parseInt(school_scores[j].math);
    }
};

average = average/k;

console.log(average);

var highmath = [];

for (j = 0; j < school_scores.length; j++){
    if (school_scores[j].math != "s" && parseInt(school_scores[j].math) > average){
	highmath.push(school_scores[j].name);
    };
};

console.log(highmath);



/*

var map = function  (l, f) {
    var result = [];
    for (var i = 0;  i < l.length; i ++) {
	result.push(f(l[i]));//f ->getMath, square (pass a function as a parameter). square
    };
    return result;
};

var filter = function  (l, f) {
    var result = [];
    for (var i = 0;  i < l.length; i ++) {
	if (f(l[i])) {//checks if function returns true
	    result.push(l[i]);
	};
    };
    return result;
};

var getMath = function (item) {
    return item.math;
};

mathscores = map (school_scores, function (x) {return x.math});
console.log (mathscores);

school_scores = map (rawschools, function (item) {
    return {
	code: item[8],
	name: item[9],
	num: item[10],
	eng: item[11],
	math: item[12],
	writing: item[13]
    };
});
   
mathscores = map (mathscores, function (x) {return parseInt(x);});
mathscores = filter (mathscores, function (X) {return !isNaN(x);};
*/
