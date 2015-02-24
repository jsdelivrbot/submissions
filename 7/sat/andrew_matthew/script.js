//console.log(rawscores);

console.log(rawscores["data"]);

rawdata=rawscores["data"];

school_scores=[];
for (var q=0; q<rawdata.length;q++){
    var tmp = {
	code:rawdata[q][8],
	name:rawdata[q][9],
	num:rawdata[q][10],
	eng:rawdata[q][11],
	math:rawdata[q][12],
	writing:rawdata[q][13]
    };
    school_scores.push(tmp);
};

console.log(school_scores);

math_scores=[];
for (var i=0;i<school_scores.length;i++){
    var tmp = parseInt(school_scores[i]["math"]);
    if (tmp>=0){
	math_scores.push(tmp);
    }
};

console.log(math_scores);

var sum = 0;
for (var i = 0;i<math_scores.length;i++){
    sum += math_scores[i];
};

var mean = sum/math_scores.length;

console.log(mean);

greater = [];
for (var i = 0;i<school_scores.length;i++){
    var tmp = parseInt(school_scores[i]["math"]);
    if (tmp > mean){
	greater.push(school_scores[i]["name"]);
	console.log(school_scores[i]["name"] + "'s math score: "+school_scores[i]["math"])
    }
};

console.log(greater);
