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
