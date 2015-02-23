console.log(scores);
var school_scores = [];

for (var i = 0; i < scores.data.length;i++) {
    //console.log("");
    var school = {
	code:scores.data[i][8],
	name:scores.data[i][9],
	num:scores.data[i][10],
	eng:scores.data[i][11],
	math:scores.data[i][12],
	writing:scores.data[i][13]
    };
    
    school_scores.push(school);
}

console.log(school_scores);
