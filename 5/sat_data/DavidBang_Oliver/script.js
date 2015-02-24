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
